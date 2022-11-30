#!/usr/bin/env node
import '../bootstrap';
import minimist from 'minimist';
import indexer from '../indexer';
import { getTaskName } from '../lib/utils';
import db from '../lib/db';

const argv = minimist(process.argv.slice(2), { boolean: ['all'], default: { all: false } });

if (!argv.fa2_address && !argv.all) {
  console.log(`usage: ./build/scripts/add-tokens-to-rebuild-queue.js [--fa2_address=<fa2Address>] [--all]`);
  process.exit();
}

async function run() {
  let tokens;

  if (argv.fa2_address) {
    tokens = await db('tokens').select('fa2_address', 'token_id').where('fa2_address', '=', argv.fa2_address);
  } else {
    tokens = await db('tokens').select('fa2_address', 'token_id');
  }

  for (let i = 0; i < tokens.length; i++) {
    const token = tokens[i];
    await indexer.addJob(getTaskName('rebuild'), {
      fa2_address: token.fa2_address,
      token_id: token.token_id,
    });
    console.log(`added ${i} to queue`);
  }
}

run();
