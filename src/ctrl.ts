import { HubConnectionBuilder } from '@microsoft/signalr';
import uniqBy from 'lodash/uniqBy';
import config from './lib/config';
import * as eventsDao from './lib/daos/events';
import { getWorkerUtils } from './lib/utils';
import { rebuildToken } from './tasks/rebuild-token/rebuild-token';
import logger from './lib/logger';
import db from './lib/db';
import { getTaskName } from './lib/utils';
import { TokenEvent } from './types';

let isRebuildingTokens = false;
const tokensWithErrors: Record<string, boolean> = {};

// TODO: solve this properly
async function rebuildOutstandingTokens(max = 200) {
  isRebuildingTokens = true;

  try {
    const results = await db
      .select('*')
      .from('graphile_worker.jobs')
      .where('task_identifier', getTaskName('rebuild-token'))
      .orderBy('id', 'desc')
      .limit(max);

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      try {
        if (tokensWithErrors[`${result.payload.fa2_address}_${result.payload.token_id}`]) {
          // skip tokens that threw an error while rebuilding before
          continue;
        }

        console.log(`rebuilding token ${i}`);

        await rebuildToken!(result.payload);
        await db('graphile_worker.jobs').where('id', result.id).del();
      } catch (err) {
        tokensWithErrors[`${result.payload.fa2_address}_${result.payload.token_id}`] = true;
        console.log('err', err);
      }
    }
  } catch (err) {
    console.log('failed to rebuild tokens', err);
  }

  isRebuildingTokens = false;
}

export async function run() {
  const connection = new HubConnectionBuilder().withUrl(`${config.tzktApiUrl}/events`).build();
  const workerUtils = await getWorkerUtils();

  async function init() {
    await connection.start();
    await connection.invoke('SubscribeToHead');
  }

  connection.onclose(init);

  connection.on('head', async (msg) => {
    if (msg.type === 1) {
      const lastBlock = (await eventsDao.getLatestLevel()) || config.startBlock - 1;
      const startBlock = lastBlock + 1;
      const max = Math.min(startBlock + config.maxBlocksPerIteration, msg.state);

      for (let i = startBlock; i <= max; i++) {
        await workerUtils.addJob(getTaskName('event-producer'), { filters: { level: i } }, { jobKey: `index-level-${i}` });
      }

      // TODO: sometimes some transactions get missed in the first run. this is a temporariy workaround.
      await workerUtils.addJob(getTaskName('event-producer'), { filters: { level: max - 5 } }, { jobKey: `index-level-${max - 5}` });
    } else if (msg.type === 2) {
      const lastValidBlock = msg.state;
      logger.info(`reorg: revert to level ${lastValidBlock}`);
      const invalidEvents = await db.select('*').from('events').where('level', '>', lastValidBlock);
      const uniqInvalidTokenEvents: Array<TokenEvent> = uniqBy(invalidEvents, (event) => `${event.fa2_address}-${event.token_id}`);
      await db('events').where('level', '>', lastValidBlock).del();

      for (const event of uniqInvalidTokenEvents) {
        await workerUtils.addJob(
          getTaskName('rebuild-token'),
          { fa2_address: event.fa2_address, token_id: event.token_id },
          { jobKey: `rebuild-token-${event.fa2_address}-${event.token_id}`, maxAttempts: 2 }
        );
      }
    }

    if (!isRebuildingTokens) {
      // temp workaround to the problem that indexer is sometimes lagging...
      rebuildOutstandingTokens(200);
    }
  });

  init();
}

run();
