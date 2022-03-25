import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_8BID_8X8_COLOR_SWAP = '8BID_8X8_COLOR_SWAP';

export interface EightbidSwap8x8ColorEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8BID_8X8_COLOR_SWAP;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
  amount: string;
  royalties: string;
}

const EightbidSwapSchema: Describe<Omit<EightbidSwap8x8ColorEvent, 'type'>> = object({
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

const EightbidSwap8x8ColorHandler: Handler<Transaction, EightbidSwap8x8ColorEvent> = {
  type: EVENT_TYPE_8BID_8X8_COLOR_SWAP,

  accept: {
    entrypoint: 'swap',
    target_address: EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE,
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
    const id = createEventId(EVENT_TYPE_8BID_8X8_COLOR_SWAP, transaction.id);

    const event: EightbidSwap8x8ColorEvent = {
      id,
      type: EVENT_TYPE_8BID_8X8_COLOR_SWAP,
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

    assert(omit(event, ['type']), EightbidSwapSchema);

    return event;
  },
};

export default EightbidSwap8x8ColorHandler;
