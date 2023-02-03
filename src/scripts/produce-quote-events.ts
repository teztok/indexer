import '../bootstrap';
import indexer from '../indexer';
import { getTaskName } from '../lib/utils';
import db from '../lib/db';

async function run() {
  const results = await db.select('level').from('events').whereNull('quotes').orderBy('level').distinctOn('level');

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(`added level ${result.level} to queue`);
    await indexer.addJob(getTaskName('event-producer'), {
      filters: { level: result.level },
      overwriteEvents: true,
      overwriteLevel: true,
    });
  }
}

run();
