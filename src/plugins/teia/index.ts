import get from 'lodash/get';
import isString from 'lodash/isString';
import isObject from 'lodash/isObject';
import uniqBy from 'lodash/uniqBy';
import difference from 'lodash/difference';
import got from 'got';
import dbConfig from '../../knexfile';
import { run } from 'graphile-worker';
import config from '../../lib/config';
import {
  registerTransactionEventHandler,
  registerOriginationEventHandler,
  onEventsProduced,
  onRebuild,
  onTokenRebuild,
  onMetadataFetched,
  registerTask,
} from '../plugins';
import TeiaSubjktRegistryHandler, { EVENT_TYPE_TEIA_SUBJKT_REGISTRY, TeiaSubjktRegistryEvent } from './handlers/teia_subjkt_registry';
import TeiaSplitContractSignHandler, {
  TeiaSplitContractSignEvent,
  EVENT_TYPE_TEIA_SPLIT_CONTRACT_SIGN,
} from './handlers/teia_split_contract_sign';
import TeiaSplitContractOriginationHandler, {
  TEIA_SPLIT_CONTRACT_ORIGINATION,
  TeiaSplitContractOriginationEvent,
} from './handlers/teia_split_contract_origination';
import { getWorkerUtils, getTaskName } from '../../lib/utils';
import logger from '../../lib/logger';
import { cleanUri } from '../../lib/schemas';
import { createPreviewImageUri, extractCIDsFromMetadata } from './utils';
import db from '../../lib/db';
import { Task } from '../../types';

require('dotenv').config();

const DEFAULT_THUMBNAIL_PARAMS = '/rs:fit:640:0:false/format:webp/plain/';

interface User {
  user_address: string;
  name?: string;
  metadata_uri?: string;
  is_split: boolean;
}

type ShareholderType = 'unspecified' | 'core_participant' | 'benefactor';

interface Shareholder {
  contract_address: string;
  shareholder_address: string;
  shares: string;
  holder_type: ShareholderType;
}

interface SplitContract {
  contract_address: string;
  administrator_address: string;
  total_shares: string;
}

interface Signature {
  fa2_address: string;
  token_id: string;
  shareholder_address: string;
}

interface WarmupThumbnailTask {
  preview_uri: string;
}

async function getLatestSplitContractOriginationEvent(contractAddress: string) {
  return db
    .select('*')
    .from('events')
    .where('type', '=', TEIA_SPLIT_CONTRACT_ORIGINATION)
    .andWhere('contract_address', '=', contractAddress)
    .orderBy([
      { column: 'timestamp', order: 'desc' },
      { column: 'opid', order: 'desc' },
    ])
    .first<TeiaSplitContractOriginationEvent>();
}

onEventsProduced(async (events) => {
  const workerUtils = await getWorkerUtils();
  const subjkEvents = events.filter(({ type }) =>
    [TEIA_SPLIT_CONTRACT_ORIGINATION, EVENT_TYPE_TEIA_SUBJKT_REGISTRY].includes(type)
  ) as Array<TeiaSubjktRegistryEvent | TeiaSplitContractOriginationEvent>;
  const splitContractOriginationEvents = events.filter(
    ({ type }) => type === TEIA_SPLIT_CONTRACT_ORIGINATION
  ) as Array<TeiaSplitContractOriginationEvent>;

  for (const event of subjkEvents) {
    const userAddress = 'owner_address' in event ? event.owner_address : event.contract_address;

    await workerUtils.addJob(
      getTaskName('rebuild'),
      { type: 'teia-subjkt', user_address: userAddress },
      { jobKey: `rebuild-teia-subjkt-${userAddress}`, maxAttempts: 2 }
    );
  }

  for (const event of splitContractOriginationEvents) {
    await workerUtils.addJob(
      getTaskName('rebuild'),
      { type: 'teia-split-contract', contract_address: event.contract_address },
      { jobKey: `rebuild-teia-split-contract-${event.contract_address}`, maxAttempts: 2 }
    );
  }
});

// rebuild subjkt
onRebuild(async (type, payload) => {
  if (type !== 'teia-subjkt') {
    return;
  }

  const user: User = {
    user_address: payload.user_address,
    is_split: false,
  };

  const latestSubjktRegistryEvent = await db
    .select('*')
    .from('events')
    .where('type', '=', EVENT_TYPE_TEIA_SUBJKT_REGISTRY)
    .andWhere('owner_address', '=', payload.user_address)
    .orderBy([
      { column: 'timestamp', order: 'desc' },
      { column: 'opid', order: 'desc' },
    ])
    .first<TeiaSubjktRegistryEvent>();

  if (latestSubjktRegistryEvent) {
    user.name = get(latestSubjktRegistryEvent, 'custom_data.subjkt');
    user.metadata_uri = get(latestSubjktRegistryEvent, 'metadata_uri');
  }

  if (payload.user_address.startsWith('KT')) {
    const latestSplitContractOriginationEvent = await getLatestSplitContractOriginationEvent(payload.user_address);

    if (latestSplitContractOriginationEvent) {
      user.is_split = true;
    }
  }

  await db.transaction(async (trx) => {
    await trx.raw('SET CONSTRAINTS ALL DEFERRED;');
    await trx('teia_users').where('user_address', '=', payload.user_address).del().transacting(trx);
    await trx('teia_users').insert(user).transacting(trx);
  });
});

// split contract
onRebuild(async (type, payload) => {
  if (type !== 'teia-split-contract') {
    return;
  }

  const latestSplitContractOriginationEvent = await getLatestSplitContractOriginationEvent(payload.contract_address);

  const shareholders: Array<Shareholder> = [];

  for (const [userAddress, userShares] of Object.entries(latestSplitContractOriginationEvent.custom_data.shares)) {
    const isCoreParticipant = latestSplitContractOriginationEvent.custom_data.core_participants.includes(userAddress);

    const shareholder: Shareholder = {
      contract_address: payload.contract_address,
      shareholder_address: userAddress,
      shares: userShares,
      holder_type: isCoreParticipant ? 'core_participant' : 'benefactor',
    };

    shareholders.push(shareholder);
  }

  const splitContract: SplitContract = {
    contract_address: payload.contract_address,
    administrator_address: latestSplitContractOriginationEvent.custom_data.administrator,
    total_shares: latestSplitContractOriginationEvent.custom_data.total_shares,
  };

  await db.transaction(async (trx) => {
    await trx.raw('SET CONSTRAINTS ALL DEFERRED;');
    await trx('teia_split_contracts').where('contract_address', '=', payload.contract_address).del().transacting(trx);
    await trx('teia_shareholders').where('contract_address', '=', payload.contract_address).del().transacting(trx);

    await trx('teia_split_contracts').insert(splitContract).transacting(trx);
    await trx('teia_shareholders').insert(shareholders).transacting(trx);
  });

  const workerUtils = await getWorkerUtils();
  const tokens = await db('tokens').select('*').where('artist_address', '=', payload.contract_address);

  // rebuild any token that was created by the split contract
  if (tokens && tokens.length) {
    for (const token of tokens) {
      await workerUtils.addJob(
        getTaskName('rebuild'),
        { type: 'token', fa2_address: token.fa2_address, token_id: token.token_id },
        { jobKey: `rebuild-token-${token.fa2_address}-${token.token_id}`, maxAttempts: 2 }
      );
    }
  }
});

onTokenRebuild(async ({ token, events, metadata }) => {
  const splitContractSignEvents = events.filter(
    ({ type }) => type === EVENT_TYPE_TEIA_SPLIT_CONTRACT_SIGN
  ) as Array<TeiaSplitContractSignEvent>;
  let isSigned = false;

  const signatures: Array<Signature> = uniqBy(
    splitContractSignEvents.map((event) => ({
      fa2_address: event.fa2_address,
      token_id: event.token_id,
      shareholder_address: event.owner_address,
    })),
    'shareholder_address'
  );

  if (token.artist_address && token.artist_address.startsWith('KT')) {
    const latestSplitContractOriginationEvent = await getLatestSplitContractOriginationEvent(token.artist_address);

    if (latestSplitContractOriginationEvent) {
      const signaturesRequired = latestSplitContractOriginationEvent.custom_data.core_participants;
      const signaturesCreated = signatures.map(({ shareholder_address }) => shareholder_address);

      isSigned = !!(signaturesRequired.length && difference(signaturesRequired, signaturesCreated).length === 0);
    }
  }

  let previewUri: string | null = null;

  if (process.env.IMGPROXY_SALT && process.env.IMGPROXY_SECRET && process.env.THUMBNAIL_IPFS_GATEWAY) {
    previewUri = createPreviewImageUri(
      token.display_uri,
      token.artifact_uri,
      token.thumbnail_uri,
      token.mime_type,
      process.env.THUMBNAIL_IPFS_GATEWAY,
      process.env.IMGPROXY_SALT,
      process.env.IMGPROXY_SECRET,
      process.env.IMGPROXY_THUMBNAIL_PARAMS ? process.env.IMGPROXY_THUMBNAIL_PARAMS : DEFAULT_THUMBNAIL_PARAMS
    );
  }

  await db.transaction(async (trx) => {
    await trx.raw('SET CONSTRAINTS ALL DEFERRED;');
    await trx('teia_signatures')
      .where('fa2_address', '=', token.fa2_address)
      .andWhere('token_id', '=', token.token_id)
      .del()
      .transacting(trx);
    await trx('teia_tokens_meta')
      .where('fa2_address', '=', token.fa2_address)
      .andWhere('token_id', '=', token.token_id)
      .del()
      .transacting(trx);

    if (signatures.length) {
      await trx('teia_signatures').insert(signatures).transacting(trx);
    }

    await trx('teia_tokens_meta')
      .insert({
        fa2_address: token.fa2_address,
        token_id: token.token_id,
        is_signed: isSigned,
        preview_uri: previewUri,
        accessibility: isObject(get(metadata, 'accessibility')) ? get(metadata, 'accessibility') : null,
        content_rating: isString(get(metadata, 'contentRating')) ? get(metadata, 'contentRating') : null,
      })
      .transacting(trx);
  });
});

onMetadataFetched(async (metadataUri, metadata) => {
  if (!process.env.PINNING_ENDPOINT) {
    return;
  }

  const CIDs = extractCIDsFromMetadata(metadataUri, metadata);

  if (!CIDs.length) {
    return;
  }

  const headers: Record<string, string> = {};

  if (process.env.PINNING_ENDPOINT_ACCESS_TOKEN) {
    headers['Authorization'] = `Bearer ${process.env.PINNING_ENDPOINT_ACCESS_TOKEN}`;
  }

  for (const cid of CIDs) {
    await got.post(process.env.PINNING_ENDPOINT, {
      json: {
        cid,
      },
      headers,
    });
  }
});

onMetadataFetched(async (metadataUri, metadata) => {
  if (
    !process.env.IMGPROXY_SALT ||
    !process.env.IMGPROXY_SECRET ||
    !process.env.THUMBNAIL_IPFS_GATEWAY ||
    !process.env.IMGPROXY_WARMUP_ENDPOINT
  ) {
    return;
  }

  const displayUri = cleanUri(get(metadata, 'displayUri'));
  const artifactUri = cleanUri(get(metadata, 'artifactUri'));
  const thumbnailUri = cleanUri(get(metadata, 'thumbnailUri'));
  const mimeType = get(metadata, 'formats.0.mimeType', null);

  try {
    const previewUri = createPreviewImageUri(
      displayUri,
      artifactUri,
      thumbnailUri,
      mimeType,
      process.env.THUMBNAIL_IPFS_GATEWAY,
      process.env.IMGPROXY_SALT,
      process.env.IMGPROXY_SECRET,
      process.env.IMGPROXY_THUMBNAIL_PARAMS ? process.env.IMGPROXY_THUMBNAIL_PARAMS : DEFAULT_THUMBNAIL_PARAMS
    );

    if (!previewUri) {
      throw new Error(`could not create preview uri for metadata: ${metadataUri}`);
    }

    const workerUtils = await getWorkerUtils();

    await workerUtils.addJob(
      getTaskName('warmup-thumbnail'),
      { preview_uri: previewUri },
      { jobKey: `warmup-thumbnail-${previewUri}`, maxAttempts: 2 }
    );
  } catch (err) {
    const errMessage = (err as Error).message;
    logger.error(`failed to create warmup-thumbnail job: ${errMessage}`, { metadata_uri: metadataUri });
  }
});

const warmupThumbnailTask: Task = {
  name: 'warmup-thumbnail',

  spawnWorkers: async () => {
    await run({
      connectionString: dbConfig.connection,
      concurrency: 2,
      noHandleSignals: false,
      pollInterval: config.workerPollInterval,
      taskList: {
        [getTaskName('warmup-thumbnail')]: async (payload, helpers) => {
          if (!process.env.IMGPROXY_WARMUP_ENDPOINT) {
            throw new Error('missing warmup endpoint');
          }

          const p = payload as WarmupThumbnailTask;

          await got(`${process.env.IMGPROXY_WARMUP_ENDPOINT}${p.preview_uri}`, {
            timeout: {
              request: 60000,
            },
          });
        },
      },
    });
  },
};

registerTask(warmupThumbnailTask);
registerTransactionEventHandler(TeiaSubjktRegistryHandler);
registerTransactionEventHandler(TeiaSplitContractSignHandler);
registerOriginationEventHandler(TeiaSplitContractOriginationHandler);
