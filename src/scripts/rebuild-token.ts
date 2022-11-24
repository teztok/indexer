#!/usr/bin/env node
import minimist from 'minimist';
import { rebuildToken } from '../tasks/rebuild/rebuild-token';

const argv = minimist(process.argv.slice(2));

if (!argv.fa2_address || !('token_id' in argv)) {
  console.log(`usage: ./build/scripts/rebuild-token.js --fa2_address=<fa2Address> --token_id=<tokenId>`);
  process.exit();
}

async function run() {
  try {
    await rebuildToken({ type: 'token', fa2_address: argv.fa2_address, token_id: argv.token_id });
    console.log('done');
  } catch (err) {
    console.log('err', err);
  }
}

run();
