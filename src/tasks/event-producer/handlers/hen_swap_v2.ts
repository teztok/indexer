import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { HEN_CONTRACT_MARKETPLACE_V2 } from '../../../consts';

export const EVENT_TYPE_HEN_SWAP_V2 = 'HEN_SWAP_V2';

export interface HenSwapV2Event extends TokenEvent {
  type: typeof EVENT_TYPE_HEN_SWAP_V2;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
  amount: string;
  royalties: string;
}

const HenSwapEventSchema: Describe<Omit<HenSwapV2Event, 'type'>> = object({
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
  royalties: PgBigInt,
  amount: PgBigInt,
});

const HenSwapHandler: TransactionHandler<HenSwapV2Event> = {
  source: 'transaction',

  type: EVENT_TYPE_HEN_SWAP_V2,

  accept: {
    entrypoint: 'swap',
    target_address: HEN_CONTRACT_MARKETPLACE_V2,
  },

  exec: (transaction) => {
    const swapId = String(parseInt(get(transaction, 'storage.counter'), 10) - 1);
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'storage.objkt');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const price = get(transaction, 'parameter.value.xtz_per_objkt');
    const royalties = get(transaction, 'parameter.value.royalties');
    const amount = get(transaction, 'parameter.value.objkt_amount');
    const id = createEventId(EVENT_TYPE_HEN_SWAP_V2, transaction);
    const diff = findDiff(transaction.diffs!, 6072, 'swaps', 'add_key', swapId);
    const artistAddress = get(diff, 'content.value.creator');

    const event: HenSwapV2Event = {
      id,
      type: EVENT_TYPE_HEN_SWAP_V2,
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
      royalties: royalties,
      amount: amount,
    };

    assert(omit(event, ['type']), HenSwapEventSchema);

    return event;
  },
};

export default HenSwapHandler;
