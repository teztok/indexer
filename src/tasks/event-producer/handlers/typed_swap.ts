import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { TYPED_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_TYPED_SWAP = 'TYPED_SWAP';

export interface TypedSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_TYPED_SWAP;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
  amount: string;
}

const TypedSwapEventSchema: Describe<Omit<TypedSwapEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  artist_address: TezosAddress,
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
  amount: PgBigInt,
});

const TypedSwapHandler: Handler<Transaction, TypedSwapEvent> = {
  type: EVENT_TYPE_TYPED_SWAP,

  accept: {
    entrypoint: 'swap',
    target_address: TYPED_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = String(parseInt(get(transaction, 'storage.counter'), 10) - 1);
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'parameter.value.fa2');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const price = get(transaction, 'parameter.value.xtz_per_objkt');
    const amount = get(transaction, 'parameter.value.objkt_amount');
    const artistAddress = get(transaction, 'parameter.value.creator');
    const id = createEventId(EVENT_TYPE_TYPED_SWAP, transaction);

    const event: TypedSwapEvent = {
      id,
      type: EVENT_TYPE_TYPED_SWAP,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      swap_id: swapId,
      price: price,
      amount: amount,
    };

    assert(omit(event, ['type']), TypedSwapEventSchema);

    return event;
  },
};

export default TypedSwapHandler;
