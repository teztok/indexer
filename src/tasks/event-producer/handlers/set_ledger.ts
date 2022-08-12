import get from 'lodash/get';
import omit from 'lodash/omit';
import isPlainObject from 'lodash/isPlainObject';
import isString from 'lodash/isString';
import { assert, object, Describe, string, is, boolean } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TokenStorageSchema } from '../../../lib/schemas';
import {
  Handler,
  TokenEvent,
  Transaction,
  BigmapDiffContent,
  BigmapDiffKey,
  LedgerTypeMultiAsset,
  LedgerTypeNftAsset,
} from '../../../types';
import { createEventId, filterDiffs } from '../../../lib/utils';
import logger from '../../../lib/logger';

export const EVENT_TYPE_SET_LEDGER = 'SET_LEDGER';

export interface SetLedgerEvent extends TokenEvent {
  type: typeof EVENT_TYPE_SET_LEDGER;
  holder_address: string;
  amount: string;
  is_mint: boolean;
  ledger_type: LedgerTypeMultiAsset | LedgerTypeNftAsset;
}

const SetLedgerEventSchema: Describe<Omit<SetLedgerEvent, 'type' | 'ledger_type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  holder_address: TezosAddress,
  amount: PgBigInt,
  is_mint: boolean(),
});

export function extractAddressAndTokenIdFromBigmapDiffKey(key: BigmapDiffKey) {
  if (!isPlainObject(key)) {
    throw new Error('key of bigmap diff is not an object');
  }

  const keyPair = Object.values(key as Object);

  if (keyPair.length !== 2) {
    throw new Error('key of bigmap diff is not a pair');
  }

  if (is(keyPair[0], TezosAddress) && is(keyPair[1], PgBigInt)) {
    return {
      holderAddress: keyPair[0],
      tokenId: keyPair[1],
    };
  }

  if (is(keyPair[1], TezosAddress) && is(keyPair[0], PgBigInt)) {
    return {
      holderAddress: keyPair[1],
      tokenId: keyPair[0],
    };
  }

  throw new Error('key of bigmap diff has an invalid scheme');
}

export function isValidMultiAssetLedgerEntry(entry: BigmapDiffContent) {
  if (!is(entry.value, PgBigInt)) {
    return false;
  }

  try {
    extractAddressAndTokenIdFromBigmapDiffKey(entry.key);
  } catch (err) {
    return false;
  }

  return true;
}

export function isValidNFTAssetLedgerEntry(entry: BigmapDiffContent) {
  return is(entry.value, TezosAddress) && isString(entry.key);
}

const SetLedgerHandler: Handler<Transaction, SetLedgerEvent> = {
  type: EVENT_TYPE_SET_LEDGER,

  accept: (transaction) => {
    const isUnderStorage = is(get(transaction, 'storage'), TokenStorageSchema);
    const isUnderAssets = is(get(transaction, 'storage.assets'), TokenStorageSchema);

    if (!isUnderStorage && !isUnderAssets) {
      return false;
    }

    if (!transaction.diffs || !transaction.diffs.length) {
      return false;
    }

    const ledgerDiffs = filterDiffs(transaction.diffs, null, isUnderAssets ? 'assets.ledger' : 'ledger', [
      'add_key',
      'update_key',
      'remove_key',
    ]);

    if (!ledgerDiffs.length) {
      return false;
    }

    return ledgerDiffs.every((diff) => isValidMultiAssetLedgerEntry(diff.content) || isValidNFTAssetLedgerEntry(diff.content));
  },

  exec: (transaction) => {
    const isUnderAssets = is(get(transaction, 'storage.assets'), TokenStorageSchema);
    const fa2Address = get(transaction, 'target.address');
    const ledgerDiffs = filterDiffs(transaction.diffs!, null, isUnderAssets ? 'assets.ledger' : 'ledger', [
      'add_key',
      'update_key',
      'remove_key',
    ]);

    const events: Array<SetLedgerEvent> = ledgerDiffs
      .map((diff, idx) => {
        try {
          if (isValidMultiAssetLedgerEntry(diff.content)) {
            const { tokenId, holderAddress } = extractAddressAndTokenIdFromBigmapDiffKey(get(diff, 'content.key'));
            const amount = diff.action === 'remove_key' ? '0' : get(diff, 'content.value');
            const isMint = !ledgerDiffs.some((diff) => diff.action === 'update_key' || diff.action === 'remove_key');
            const id = createEventId(EVENT_TYPE_SET_LEDGER, transaction, idx);

            const event: SetLedgerEvent = {
              id,
              type: EVENT_TYPE_SET_LEDGER,
              opid: transaction.id,
              ophash: transaction.hash,
              timestamp: transaction.timestamp,
              level: transaction.level,
              fa2_address: fa2Address,
              token_id: tokenId,
              holder_address: holderAddress,
              amount: amount,
              is_mint: isMint,
              ledger_type: 'MULTI_ASSET',
            };

            assert(omit(event, ['type', 'ledger_type']), SetLedgerEventSchema);

            return event;
          } else if (isValidNFTAssetLedgerEntry(diff.content)) {
            const tokenId = get(diff, 'content.key');
            const holderAddress = get(diff, 'content.value');
            const isMint = diff.action === 'add_key';
            const amount = diff.action === 'remove_key' ? '0' : '1';
            const id = createEventId(EVENT_TYPE_SET_LEDGER, transaction, idx);

            const event: SetLedgerEvent = {
              id,
              type: EVENT_TYPE_SET_LEDGER,
              opid: transaction.id,
              ophash: transaction.hash,
              timestamp: transaction.timestamp,
              level: transaction.level,
              fa2_address: fa2Address,
              token_id: tokenId,
              holder_address: holderAddress,
              amount,
              is_mint: isMint,
              ledger_type: 'NFT_ASSET',
            };

            assert(omit(event, ['type', 'ledger_type']), SetLedgerEventSchema);

            return event;
          }

          throw new Error('unsupported ledger entry');
        } catch (err) {
          logger.error(`handler "${EVENT_TYPE_SET_LEDGER}" failed to process event: ${(err as Error).message}`);
          return false;
        }
      })
      .filter((event) => event) as Array<SetLedgerEvent>;

    return events;
  },
};

export default SetLedgerHandler;
