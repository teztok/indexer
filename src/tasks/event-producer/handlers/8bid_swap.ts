import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { EIGHTBIDOU_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_8BID_SWAP = '8BID_SWAP';

export interface EightbidSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8BID_SWAP;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
  amount: string;
  royalties: string;
}

const EightbidSwapEventSchema: Describe<Omit<EightbidSwapEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  artist_address: TezosAddress,
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
  royalties: PgBigInt,
  amount: PgBigInt,
});

const EightbidSwapHandler: Handler<Transaction, EightbidSwapEvent> = {
  type: EVENT_TYPE_8BID_SWAP,

  accept: {
    entrypoint: 'swap',
    target_address: EIGHTBIDOU_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'storage.swap_id_count');
    const fa2Address = get(transaction, 'parameter.value.nft_contract_address');
    const sellerAddress = get(transaction, 'sender.address');
    const tokenId = get(transaction, 'parameter.value.nft_id');
    const price = get(transaction, 'parameter.value.payment');
    const royalties = String(parseInt(get(transaction, 'parameter.value.royalties'), 10) * 10);
    const amount = get(transaction, 'parameter.value.nft_total_amount');
    const artistAddress = get(transaction, 'parameter.value.creator');
    const id = createEventId(EVENT_TYPE_8BID_SWAP, transaction.id);

    const event: EightbidSwapEvent = {
      id,
      type: EVENT_TYPE_8BID_SWAP,
      opid: transaction.id,
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

    assert(omit(event, ['type']), EightbidSwapEventSchema);

    return event;
  },
};

export default EightbidSwapHandler;
