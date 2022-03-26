import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_8BID_24X24_MONOCHROME_BUY = '8BID_24X24_MONOCHROME_BUY';

export interface EightbidBuy24x24MonochromeEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8BID_24X24_MONOCHROME_BUY;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
  total_price: string;
  amount: string;
}

const EightbidBuy24x24MonochromeEventSchema: Describe<Omit<EightbidBuy24x24MonochromeEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  artist_address: TezosAddress,
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
  total_price: PgBigInt,
  amount: PgBigInt,
});

const EightbidBuy24x24MonochromeHandler: Handler<Transaction, EightbidBuy24x24MonochromeEvent> = {
  type: EVENT_TYPE_8BID_24X24_MONOCHROME_BUY,

  accept: {
    entrypoint: 'buy',
    target_address: EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value.swap_id');
    const amount = get(transaction, 'parameter.value.nft_amount');
    const buyerAddress = get(transaction, 'sender.address');
    const totalPrice = String(get(transaction, 'amount'));
    const diff = findDiff(get(transaction, 'diffs')!, 128202, 'swap_list', ['update_key'], swapId);
    const fa2Address = get(diff, 'content.value.nft_contract_address');
    const tokenId = get(diff, 'content.value.nft_id');
    const sellerAddress = get(diff, 'content.value.seller');
    const artistAddress = get(diff, 'content.value.creator');
    const price = get(diff, 'content.value.payment');
    const id = createEventId(EVENT_TYPE_8BID_24X24_MONOCHROME_BUY, transaction.id);

    const event: EightbidBuy24x24MonochromeEvent = {
      id,
      type: EVENT_TYPE_8BID_24X24_MONOCHROME_BUY,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,

      implements: SALE_INTERFACE,
      seller_address: sellerAddress,
      buyer_address: buyerAddress,
      artist_address: artistAddress,
      swap_id: swapId,
      price: price,
      total_price: totalPrice,
      amount: amount,
    };

    assert(omit(event, ['type', 'implements']), EightbidBuy24x24MonochromeEventSchema);

    return event;
  },
};

export default EightbidBuy24x24MonochromeHandler;
