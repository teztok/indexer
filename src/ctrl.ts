import './bootstrap';
import { HubConnectionBuilder } from '@microsoft/signalr';
import uniqBy from 'lodash/uniqBy';
import config from './lib/config';
import * as eventsDao from './lib/daos/events';
import { getWorkerUtils } from './lib/utils';
import { rebuild } from './tasks/rebuild/rebuild';
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
    const results = (
      await db
        .select('*')
        .from('graphile_worker.jobs')
        .where('task_identifier', getTaskName('rebuild'))
        .andWhere('attempts', '=', 0)
        .orderBy('id', 'desc')
        .limit(max)
    ).filter(({ payload }) => payload.type === 'token');

    for (let i = 0; i < results.length; i++) {
      const result = results[i];
      try {
        if (tokensWithErrors[`${result.payload.fa2_address}_${result.payload.token_id}`]) {
          // skip tokens that threw an error while rebuilding before
          continue;
        }

        console.log(`rebuilding token ${i}`);

        await rebuild!(result.payload);
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

async function handleTimedoutOffersAndListings(max = 50) {
  try {
    const offerResults = await db
      .select('fa2_address', 'token_id')
      .from('offers')
      .whereIn('type', ['OBJKT_OFFER', 'OBJKT_OFFER_V3_PRE', 'OBJKT_OFFER_V3'])
      .whereNotNull('end_time')
      .where('end_time', '<', new Date())
      .where('status', '=', 'active')
      .orderBy('end_time', 'desc')
      .limit(max);

    const listingResults = await db
      .select('fa2_address', 'token_id')
      .from('listings')
      .whereIn('type', ['OBJKT_ASK_V3_PRE', 'OBJKT_ASK_V3'])
      .whereNotNull('end_time')
      .where('end_time', '<', new Date())
      .where('status', '=', 'active')
      .orderBy('end_time', 'desc')
      .limit(max);

    const tokens = uniqBy([...offerResults, ...listingResults], ({ fa2_address, token_id }) => `${fa2_address}-${token_id}`) as Array<{
      fa2_address: string;
      token_id: string;
    }>;

    const workerUtils = await getWorkerUtils();

    for (const token of tokens) {
      await workerUtils.addJob(
        getTaskName('rebuild'),
        { type: 'token', fa2_address: token.fa2_address, token_id: token.token_id },
        { jobKey: `rebuild-token-${token.fa2_address}-${token.token_id}`, maxAttempts: 2 }
      );
    }
  } catch (err) {
    console.log('failed to handle timed out offers and listings', err);
  }
}

export async function run() {
  const connection = new HubConnectionBuilder().withUrl(`${config.tzktApiUrl}/ws`).build();
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

      // every 10 blocks, check for timed out offers and listings
      if (max % 10 === 0) {
        await handleTimedoutOffersAndListings();
      }
    } else if (msg.type === 2) {
      const lastValidBlock = msg.state;
      logger.info(`reorg: revert to level ${lastValidBlock}`);
      const invalidEvents = await db.select('*').from('events').where('level', '>', lastValidBlock);
      const uniqInvalidTokenEvents: Array<TokenEvent> = uniqBy(invalidEvents, (event) => `${event.fa2_address}-${event.token_id}`);
      await db('events').where('level', '>', lastValidBlock).del();

      // TODO: handle case of other data models than tokens
      for (const event of uniqInvalidTokenEvents) {
        await workerUtils.addJob(
          getTaskName('rebuild'),
          { type: 'token', fa2_address: event.fa2_address, token_id: event.token_id },
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
