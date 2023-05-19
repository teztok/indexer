#!/usr/bin/env node
import '../bootstrap';
import isNumber from 'lodash/isNumber';
import minimist from 'minimist';
import indexer from '../indexer';
import { getTaskName } from '../lib/utils';

const argv = minimist(process.argv.slice(2), {
  boolean: ['overwrite', 'skiptransactions'],
  default: { overwrite: false, skiptransactions: false },
});

if (!isNumber(argv.start) || !isNumber(argv.end) || !(argv.end >= argv.start)) {
  console.log(`usage: ./build/scripts/produce-events.js --start=<startLevel> --end=<endLevel> --overwrite --skiptransactions`);
  process.exit();
}

if (argv.skiptransactions && argv.overwrite) {
  console.log(`skiptransactions and overwrite can not both be set to true`);
  process.exit();
}

async function run() {
  for (let current = argv.start; current <= argv.end; current++) {
    console.log(`added level ${current} to queue`);
    await indexer.addJob(getTaskName('event-producer'), {
      filters: { level: current },
      overwriteEvents: !!argv.overwrite,
      overwriteLevel: !!argv.overwrite,
      skipTransactions: !!argv.skiptransactions,
    });
  }
}

run();
