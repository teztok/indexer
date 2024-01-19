#!/usr/bin/env node
import '../bootstrap';
import minimist from 'minimist';
import indexer from '../indexer';
import { getTaskName } from '../lib/utils';
import db from '../lib/db';

const argv = minimist(process.argv.slice(2));

if (argv.help) {
  console.log(`usage: ./build/scripts/add-tokens-to-rebuild-queue.js [--fa2_address=<fa2Address>] [--since_level] [--help]`);
  process.exit();
}

async function run() {
  const tokens = await db('tokens')
    .select('fa2_address', 'token_id')
    .modify(function (queryBuilder) {
      if (argv.fa2_address) {
        queryBuilder.where('fa2_address', '=', argv.fa2_address);
      }

      if (argv.since_level) {
        queryBuilder.where('last_processed_event_level', '>=', +argv.since_level);
      }
    });

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    await indexer.addJob(getTaskName('rebuild'), {
      type: 'token',
      fa2_address: token.fa2_address,
      token_id: token.token_id,
    });
    console.log(`added ${i} to queue`);
  }
}

run();
