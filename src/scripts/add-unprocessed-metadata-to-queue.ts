#!/usr/bin/env node
import '../bootstrap';
import { getTaskName, getWorkerUtils } from '../lib/utils';
import db from '../lib/db';

async function run() {
  const metadataRows = await db('token_metadata').select('uri').where('status', '=', 'unprocessed');
  const workerUtils = await getWorkerUtils();

  for (let i = 0; i < metadataRows.length; i++) {
    const row = metadataRows[i];

    try {
      await workerUtils.addJob(
        getTaskName('fetch-metadata'),
        { metadata_uri: row.uri },
        { jobKey: `resolve-metadata-${row.uri.substring(0, 400)}`, maxAttempts: 6 }
      );
    } catch (err) {
      console.log(err);
    }
  }
}

run();
