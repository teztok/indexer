import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, type, string, Describe, is } from 'superstruct';
import { ContractAddress, IsoDateString, MetadataUri, PositiveInteger } from '../../../lib/validators';
import { TokenStorageSchema } from '../../../lib/schemas';
import logger from '../../../lib/logger';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId, filterDiffs } from '../../../lib/utils';

export const EVENT_TYPE_SET_METADATA = 'SET_METADATA';

export interface SetMetadataEvent extends TokenEvent {
  type: typeof EVENT_TYPE_SET_METADATA;
  metadata_uri: string;
}

const SetMetadataEventSchema: Describe<Omit<SetMetadataEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),

  metadata_uri: MetadataUri,
});

interface TokenInfo {
  '': string;
}

interface TokenMetadataDiff {
  token_id: string;
  token_info: TokenInfo;
}

const TokenMetadataDiffSchema: Describe<TokenMetadataDiff> = type({
  token_id: string(),
  token_info: type({
    '': string(),
  }),
});

const SetMetadataHandler: Handler<Transaction, SetMetadataEvent> = {
  type: EVENT_TYPE_SET_METADATA,

  accept: (transaction) => {
    if (!is(get(transaction, 'storage'), TokenStorageSchema)) {
      return false;
    }

    if (!transaction.diffs || !transaction.diffs.length) {
      return false;
    }

    const metadataDiffs = filterDiffs(transaction.diffs, null, 'token_metadata', ['add_key', 'update_key']);

    if (!metadataDiffs.length) {
      return false;
    }

    const isValid = metadataDiffs.every((diff) => is(diff.content.value, TokenMetadataDiffSchema));

    if (!isValid) {
      //logger.info(`invalid token metadata found in transaction "${transaction.id}" target address: ${transaction.target.address}`);
    }

    return isValid;
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'target.address');
    const metadataDiffs = filterDiffs(transaction.diffs!, null, 'token_metadata', ['add_key', 'update_key']);

    const events: Array<SetMetadataEvent> = metadataDiffs
      .map((diff, idx) => {
        try {
          const tokenId = get(diff, 'content.value.token_id');
          const metadataUri = Buffer.from(get(diff, 'content.value.token_info.'), 'hex').toString();
          const id = createEventId(EVENT_TYPE_SET_METADATA, transaction.id, idx);

          const event: SetMetadataEvent = {
            id,
            type: EVENT_TYPE_SET_METADATA,
            opid: transaction.id,
            timestamp: transaction.timestamp,
            level: transaction.level,
            fa2_address: fa2Address,
            token_id: tokenId,
            metadata_uri: metadataUri,
          };

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
