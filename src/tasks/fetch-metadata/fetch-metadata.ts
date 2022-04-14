import { assert } from 'superstruct';
import got from 'got';
import { run, JobHelpers } from 'graphile-worker';
import { pipeline } from 'stream/promises';
import dbConfig from '../../knexfile';
import { Task, MetadataBase } from '../../types';
import { MetadataBaseSchema } from '../../lib/schemas';
import { getWorkerUtils, getTaskName } from '../../lib/utils';
import logger from '../../lib/logger';
import ipfsClient from '../../lib/ipfs-client';
import * as metadataDao from '../../lib/daos/metadata';
import * as tokensDao from '../../lib/daos/tokens';
import config from '../../lib/config';

interface FetchMetadataTaskPayload {
  metadata_uri: string;
}

export async function downloadFromIpfs(ipfsCid: string) {
  const ac = new AbortController();
  let timeoutReached = false;
  let data = '';

  const timer = setTimeout(() => {
    timeoutReached = true;
    ac.abort();
  }, 40000);

  try {
    await pipeline(ipfsClient.cat(ipfsCid, { signal: ac.signal }), async function* (source) {
      let size = 0;

      for await (const chunk of source) {
        size += chunk.length;
        data += chunk.toString();

        if (size > config.metadataMaxFilesize) {
          ac.abort();
        }

        yield chunk;
      }
    });

    if (!data) {
      throw new Error('invalid metadata');
    }
    clearTimeout(timer);

    return data;
  } catch (err) {
    clearTimeout(timer);

    if (timeoutReached) {
      throw new Error('timeout reached');
    }

    throw err;
  }
}

export function validateMetadata(metadata: MetadataBase) {
  assert(metadata, MetadataBaseSchema); // make sure the metadata has the minimum in required fields

  const metadataStr = JSON.stringify(metadata);
  const size = metadataStr.length;

  if (size > config.metadataMaxFilesize) {
    throw new Error(`metadata size of ${size} bytes exceeds maximum allowed size of ${config.metadataMaxFilesize} bytes.`);
  }
}

async function processMetadata(metadataUri: string, helpers: JobHelpers) {
  const workerUtils = await getWorkerUtils();

  try {
    const metadataUriLowerCased = metadataUri.toLowerCase();
    let metadata;

    if (metadataUriLowerCased.startsWith('ipfs://')) {
      const ipfsHash = metadataUri.substr(7);
      const metadataRaw = await downloadFromIpfs(ipfsHash);

      metadata = JSON.parse(metadataRaw as string);
    } else if (metadataUriLowerCased.startsWith('http://') || metadataUriLowerCased.startsWith('https://')) {
      metadata = await got(metadataUri, { timeout: { request: 3000 } }).json();
    } else {
      // unsupported format
      await metadataDao.update(metadataUri, 'error');
      logger.error(`unsupported metadata uri: ${metadataUri}`);
      return;
    }

    try {
      validateMetadata(metadata);
    } catch (err) {
      await metadataDao.update(metadataUri, 'error'); // TODO: change to 'invalid_metadata'?
      logger.error(`invalid metadata, error: ${(err as Error).message}`, { metadata_uri: metadataUri });
      return;
    }

    await metadataDao.update(metadataUri, 'processed', metadata);

    if (metadata.artifactUri) {
      await workerUtils.addJob(
        getTaskName('process-artifact'),
        { artifact_uri: metadata.artifactUri },
        { jobKey: `process-artifact-${metadata.artifactUri}`, maxAttempts: 3 }
      );
    }

    const tokens = await tokensDao.getByField('metadata_uri', metadataUri);

    if (tokens && tokens.length) {
      for (const token of tokens) {
        await workerUtils.addJob(
          getTaskName('rebuild-token'),
          { fa2_address: token.fa2_address, token_id: token.token_id },
          { jobKey: `rebuild-token-${token.fa2_address}-${token.token_id}`, maxAttempts: 2 }
        );
      }
    }
  } catch (err) {
    const errMessage = (err as Error).message;

    logger.error(`failed to fetch metadata: ${errMessage}`, { metadata_uri: metadataUri });

    if (errMessage === 'The user aborted a request.' || errMessage === 'invalid metadata') {
      await metadataDao.update(metadataUri, 'error');
      return;
    }

    if (helpers.job.max_attempts === helpers.job.attempts) {
      await metadataDao.update(metadataUri, 'error');
    }

    throw err;
  }
}

const task: Task = {
  name: 'fetch-metadata',

  spawnWorkers: async () => {
    await run({
      connectionString: dbConfig.connection,
      concurrency: config.fetchMetadataConcurrency,
      noHandleSignals: false,
      pollInterval: config.workerPollInterval,
      taskList: {
        [getTaskName('fetch-metadata')]: async (payload, helpers) => {
          const p = payload as FetchMetadataTaskPayload;
          await processMetadata(p.metadata_uri, helpers);
        },
      },
    });
  },
};

export default task;
