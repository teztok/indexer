#!/usr/bin/env node
import isNumber from 'lodash/isNumber';
import minimist from 'minimist';
import indexer from '../indexer';
import { getTaskName } from '../lib/utils';

const argv = minimist(process.argv.slice(2), { boolean: ['overwrite'], default: { overwrite: false } });

if (!isNumber(argv.start) || !isNumber(argv.end) || !(argv.end >= argv.start)) {
  console.log(`usage: ./build/scripts/produce-events.js --start=<startLevel> --end=<endLevel> --overwrite`);
  process.exit();
}

async function run() {
  for (let current = argv.start; current <= argv.end; current++) {
    console.log(`added level ${current} to queue`);
    await indexer.addJob(getTaskName('event-producer'), {
      filters: { level: current },
      overwriteEvents: !!argv.overwrite,
      overwriteLevel: !!argv.overwrite,
    });
  }
}

run();
