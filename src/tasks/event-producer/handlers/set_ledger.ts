import get from 'lodash/get';
import isString from 'lodash/isString';
import omit from 'lodash/omit';
import { assert, object, Describe, string, is, boolean } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TokenStorageSchema } from '../../../lib/schemas';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId, filterDiffs } from '../../../lib/utils';
import logger from '../../../lib/logger';

export const EVENT_TYPE_SET_LEDGER = 'SET_LEDGER';

export interface SetLedgerEvent extends TokenEvent {
  type: typeof EVENT_TYPE_SET_LEDGER;
  holder_address: string;
  amount: string;
  is_mint: boolean;
  price: string;
}

const SetLedgerEventSchema: Describe<Omit<SetLedgerEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  holder_address: TezosAddress,
  amount: PgBigInt,
  is_mint: boolean(),
  price: PgBigInt,
});

const SetLedgerHandler: Handler<Transaction, SetLedgerEvent> = {
  type: EVENT_TYPE_SET_LEDGER,

  accept: (transaction) => {
    if (!is(get(transaction, 'storage'), TokenStorageSchema)) {
      return false;
    }

    if (!transaction.diffs || !transaction.diffs.length) {
      return false;
    }

    const ledgerDiffs = filterDiffs(transaction.diffs, null, 'ledger', ['add_key', 'update_key']);

    if (!ledgerDiffs.length) {
      return false;
    }

    const isValid = ledgerDiffs.every(
      (diff) => isString(get(diff, 'content.value')) && isString(get(diff, 'content.key.nat')) && isString(get(diff, 'content.key.address'))
    );

    if (!isValid) {
      //logger.info(`invalid ledger diff found in transaction "${transaction.id}" target address: ${transaction.target.address}`);
      //console.log('ledgerDiffs', ledgerDiffs);
    }

    return isValid;
  },

  exec: (transaction, operation) => {
    const firstTransaction = operation.transactions[0];
    const fa2Address = get(transaction, 'target.address');
    const ledgerDiffs = filterDiffs(transaction.diffs!, null, 'ledger', ['add_key', 'update_key']);

    const events: Array<SetLedgerEvent> = ledgerDiffs
      .map((diff, idx) => {
        try {
          const tokenId = get(diff, 'content.key.nat');
          const holderAddress = get(diff, 'content.key.address');
          const amount = get(diff, 'content.value');
          const isMint = !ledgerDiffs.some((diff) => diff.action === 'update_key');
          const id = createEventId(EVENT_TYPE_SET_LEDGER, transaction.id, idx);

          const event: SetLedgerEvent = {
            id,
            type: EVENT_TYPE_SET_LEDGER,
            opid: transaction.id,
            timestamp: transaction.timestamp,
            level: transaction.level,
            fa2_address: fa2Address,
            token_id: tokenId,
            holder_address: holderAddress,
            amount: amount,
            is_mint: isMint,
            price: String(firstTransaction.amount),
          };

          assert(omit(event, ['type']), SetLedgerEventSchema);

          return event;
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
