import { HubConnectionBuilder } from '@microsoft/signalr';
import uniqBy from 'lodash/uniqBy';
import config from './lib/config';
import * as eventsDao from './lib/daos/events';
import { getWorkerUtils } from './lib/utils';
import logger from './lib/logger';
import db from './lib/db';
import { TokenEvent } from './types';

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
        await workerUtils.addJob('event-producer', { filters: { level: i } }, { jobKey: `index-level-${i}` });
      }
    } else if (msg.type === 2) {
      const lastValidBlock = msg.state;
      logger.info(`reorg: revert to level ${lastValidBlock}`);
      const invalidEvents = await db.select('*').from('events').where('level', '>', lastValidBlock);
      const uniqInvalidTokenEvents: Array<TokenEvent> = uniqBy(invalidEvents, (event) => `${event.fa2_address}-${event.token_id}`);
      await db('events').where('level', '>', lastValidBlock).del();

      for (const event of uniqInvalidTokenEvents) {
        await workerUtils.addJob(
          'rebuild-token',
          { fa2_address: event.fa2_address, token_id: event.token_id },
          { jobKey: `rebuild-token-${event.fa2_address}-${event.token_id}`, maxAttempts: 2 }
        );
      }
    }
  });

  init();
}

run();
