import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE } from '../../../consts';
import {
  tokenEventFields,
  artistAddressField,
  sellerAddressField,
  swapIdField,
  priceField,
  royaltiesField,
  amountField,
} from '../event-fields-meta';

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

const EightbidSwap8x8ColorHandler: TransactionHandler<EightbidSwap8x8ColorEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_8BID_8X8_COLOR_SWAP,

  meta: {
    eventDescription: `An 8x8 color token was swapped on 8bidou.`,
    eventFields: [...tokenEventFields, artistAddressField, sellerAddressField, swapIdField, priceField, royaltiesField, amountField],
  },

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
    const royalties = String(Math.floor((1 / parseInt(get(transaction, 'parameter.value.royalties'), 10)) * 1000));
    const amount = get(transaction, 'parameter.value.nft_total_amount');
    const artistAddress = get(transaction, 'parameter.value.creator');
    const id = createEventId(EVENT_TYPE_8BID_8X8_COLOR_SWAP, transaction);

    const event: EightbidSwap8x8ColorEvent = {
      id,
      type: EVENT_TYPE_8BID_8X8_COLOR_SWAP,
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

    assert(omit(event, ['type']), EightbidSwapSchema);

    return event;
  },
};

export default EightbidSwap8x8ColorHandler;
