import get from 'lodash/get';
import omit from 'lodash/omit';
import { array, assert, object, Describe, string, is } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import logger from '../../../lib/logger';
import { createEventId } from '../../../lib/utils';

export const EVENT_TYPE_FA2_TRANSFER = 'FA2_TRANSFER';

export interface Fa2TransferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FA2_TRANSFER;
  from_address: string;
  to_address: string;
  amount: string;
}

interface Fa2TransferParameterItemDestination {
  to_: string;
  amount: string;
  token_id: string;
}

interface Fa2TransferParameterItem {
  from_: string;
  txs: Array<Fa2TransferParameterItemDestination>;
}

type Fa2TransferParameter = Array<Fa2TransferParameterItem>;

const Fa2TransferEventSchema: Describe<Omit<Fa2TransferEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  from_address: TezosAddress,
  to_address: TezosAddress,
  amount: PgBigInt,
});

const Fa2TransferParameterSchema: Describe<Fa2TransferParameter> = array(
  object({ from_: TezosAddress, txs: array(object({ to_: TezosAddress, amount: PgBigInt, token_id: string() })) })
);

const Fa2TransferHandler: Handler<Transaction, Fa2TransferEvent> = {
  type: EVENT_TYPE_FA2_TRANSFER,

  accept: (transaction) => {
    if (get(transaction, 'parameter.entrypoint') !== 'transfer') {
      return false;
    }
    // TODO: only checking the value is not really robust. find a better way (maybe by checking the entrypoints?).
    return is(get(transaction, 'parameter.value'), Fa2TransferParameterSchema);
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'target.address');
    const transferItems: Fa2TransferParameter = get(transaction, 'parameter.value');
    const events: Array<Fa2TransferEvent> = [];
    let idx = 0;

    for (const transferItem of transferItems) {
      for (const tx of transferItem.txs) {
        try {
          const id = createEventId(EVENT_TYPE_FA2_TRANSFER, transaction, idx++);

          const event: Fa2TransferEvent = {
            id,
            type: EVENT_TYPE_FA2_TRANSFER,
            opid: String(transaction.id),
            ophash: transaction.hash,
            timestamp: transaction.timestamp,
            level: transaction.level,
            fa2_address: fa2Address,
            from_address: transferItem.from_,
            to_address: tx.to_,
            token_id: tx.token_id,
            amount: tx.amount,
          };

          assert(omit(event, ['type']), Fa2TransferEventSchema);

          events.push(event);
        } catch (err) {
          logger.error(`handler "${EVENT_TYPE_FA2_TRANSFER}" failed to process transfer: ${(err as Error).message}`);
        }
      }
    }

    return events;
  },
};

export default Fa2TransferHandler;
