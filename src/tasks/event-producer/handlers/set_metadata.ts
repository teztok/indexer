import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, type, string, Describe, is, optional } from 'superstruct';
import { ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TokenStorageSchema } from '../../../lib/schemas';
import logger from '../../../lib/logger';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { createEventId, filterDiffs } from '../../../lib/utils';
import { normalizeMetadataIpfsUri } from '../../../lib/utils';

export const EVENT_TYPE_SET_METADATA = 'SET_METADATA';

export interface SetMetadataEvent extends TokenEvent {
  type: typeof EVENT_TYPE_SET_METADATA;
  metadata_uri?: string;
  metadata?: any;
}

const SetMetadataEventSchema: Describe<Omit<SetMetadataEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  metadata_uri: optional(MetadataUri),
  metadata: optional(object()),
});

interface TokenInfoOffchain {
  '': string;
}

interface TokenInfoOnchain {
  name: string;
}

interface TokenMetadataDiffOffchain {
  token_id: string;
  token_info: TokenInfoOffchain;
}
interface TokenMetadataDiffOnchain {
  token_id: string;
  token_info: TokenInfoOnchain;
}

const TokenMetadataDiffOffchainSchema: Describe<TokenMetadataDiffOffchain> = type({
  token_id: string(),
  token_info: type({
    '': string(),
  }),
});

const TokenMetadataDiffOnchainSchema: Describe<TokenMetadataDiffOnchain> = type({
  token_id: string(),
  token_info: type({
    name: string(),
  }),
});

const SetMetadataHandler: TransactionHandler<SetMetadataEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_SET_METADATA,

  accept: (transaction) => {
    const isUnderStorage = is(get(transaction, 'storage'), TokenStorageSchema);
    const isUnderAssets = is(get(transaction, 'storage.assets'), TokenStorageSchema);

    if (!isUnderStorage && !isUnderAssets) {
      return false;
    }

    if (!transaction.diffs || !transaction.diffs.length) {
      return false;
    }

    const metadataDiffs = filterDiffs(transaction.diffs, null, isUnderAssets ? 'assets.token_metadata' : 'token_metadata', [
      'add_key',
      'update_key',
    ]);

    if (!metadataDiffs.length) {
      return false;
    }

    return metadataDiffs.every(
      (diff) => is(diff.content.value, TokenMetadataDiffOffchainSchema) || is(diff.content.value, TokenMetadataDiffOnchainSchema)
    );
  },

  exec: (transaction) => {
    const isUnderAssets = is(get(transaction, 'storage.assets'), TokenStorageSchema);
    const fa2Address = get(transaction, 'target.address');
    const metadataDiffs = filterDiffs(transaction.diffs!, null, isUnderAssets ? 'assets.token_metadata' : 'token_metadata', [
      'add_key',
      'update_key',
    ]);

    const events: Array<SetMetadataEvent> = metadataDiffs
      .map((diff, idx) => {
        try {
          const tokenId = get(diff, 'content.value.token_id');
          const id = createEventId(EVENT_TYPE_SET_METADATA, transaction, idx);
          let metadata: Record<string, string> = {};
          let metadataUri;

          if (is(diff.content.value, TokenMetadataDiffOffchainSchema)) {
            metadataUri = normalizeMetadataIpfsUri(Buffer.from(get(diff, 'content.value.token_info.'), 'hex').toString());

            if (metadataUri.startsWith('tezos-storage')) {
              // TODO: add support for tokens that use tezos-storage (e.g. manchester united token tokens)
              return false;
            }
          } else {
            for (const [key, val] of Object.entries(get(diff, 'content.value.token_info'))) {
              const str = Buffer.from(val as string, 'hex')
                .toString()
                .replace(/\0/g, '');

              try {
                metadata[key] = JSON.parse(str);
              } catch (err) {
                metadata[key] = str;
              }
            }
          }

          const event: SetMetadataEvent = {
            id,
            type: EVENT_TYPE_SET_METADATA,
            opid: String(transaction.id),
            ophash: transaction.hash,
            timestamp: transaction.timestamp,
            level: transaction.level,
            fa2_address: fa2Address,
            token_id: tokenId,
          };

          if (metadataUri) {
            event.metadata_uri = metadataUri;
          } else if (Object.keys(metadata).length) {
            event.metadata = metadata;
          } else {
            throw new Error('event needs either metadata_uri or metadata property');
          }

          assert(omit(event, ['type']), SetMetadataEventSchema);

          return event;
        } catch (err) {
          logger.error(`handler "${EVENT_TYPE_SET_METADATA}" failed to process metadata: ${(err as Error).message}`);
          return false;
        }
      })
      .filter((event) => event) as Array<SetMetadataEvent>;

    return events;
  },
};

export default SetMetadataHandler;
