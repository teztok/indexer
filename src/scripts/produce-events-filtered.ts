#!/usr/bin/env node
import '../bootstrap';
import uniq from 'lodash/uniq';
import orderBy from 'lodash/orderBy';
import minimist from 'minimist';
import indexer from '../indexer';
import { getTaskName, getTransactions } from '../lib/utils';

const PER_PAGE = 2000;
const MAX_PAGES = 20;
const MAX_LEVELS = 5000;

async function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const argv = minimist(process.argv.slice(2), {
  boolean: ['overwrite', 'skiptransactions'],
  default: { overwrite: false, skiptransactions: false },
});

if (!argv.filters) {
  console.log(`usage: ./build/scripts/produce-events-filtered.js --filters=<filters> --overwrite --skiptransactions`);
  process.exit();
}

if (argv.skiptransactions && argv.overwrite) {
  console.log(`skiptransactions and overwrite can not both be set to true`);
  process.exit();
}

async function run() {
  const filters = JSON.parse(argv.filters);
  const transactions = await getTransactions(filters, PER_PAGE, MAX_PAGES, 'id,level');
  const levels = uniq(orderBy(transactions, (t) => t.level).map((t) => t.level));

  if (levels.length > MAX_LEVELS) {
    console.log(`too many levels: ${levels.length} > ${MAX_LEVELS}`);
    process.exit();
  }

  console.log(`found ${transactions.length} transactions across ${levels.length} levels. starting in 5 seconds.`);
  await sleep(5000);

  for (let level of levels) {
    console.log(`added level ${level} to queue`);
    await indexer.addJob(getTaskName('event-producer'), {
      filters: { level: level },
      overwriteEvents: !!argv.overwrite,
      overwriteLevel: !!argv.overwrite,
      skipTransactions: !!argv.skiptransactions,
    });
  }
}

run();
