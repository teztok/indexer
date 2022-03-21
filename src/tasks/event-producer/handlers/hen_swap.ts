import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { HEN_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_HEN_SWAP = 'HEN_SWAP';

export interface HenSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_HEN_SWAP;
  seller_address: string;
  swap_id: string;
  price: string;
  amount: string;
}

const HenSwapEventSchema: Describe<Omit<HenSwapEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
  amount: PgBigInt,
});

const HenSwapHandler: Handler<Transaction, HenSwapEvent> = {
  type: EVENT_TYPE_HEN_SWAP,

  accept: {
    entrypoint: 'swap',
    target_address: HEN_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = String(parseInt(get(transaction, 'storage.swap_id'), 10) - 1);
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'storage.objkt');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const price = get(transaction, 'parameter.value.xtz_per_objkt');
    const amount = get(transaction, 'parameter.value.objkt_amount');
    const id = createEventId(EVENT_TYPE_HEN_SWAP, transaction.id);

    const event: HenSwapEvent = {
      id,
      type: EVENT_TYPE_HEN_SWAP,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      swap_id: swapId,
      price: price,
      amount: amount,
    };

    assert(omit(event, ['type']), HenSwapEventSchema);

    return event;
  },
};

export default HenSwapHandler;
