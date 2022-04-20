import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, createEventId, extractObjktCurrency } from '../../../lib/utils';
import { OBJKT_CONTRACT_DUTCH_AUCTION_V2, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION_V2 = 'OBJKT_BUY_DUTCH_AUCTION_V2';

export interface ObjktBuyDutchAuctionV2Event extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION_V2;
  implements: SaleEventInterface;
  seller_address: string;
  buyer_address: string;
  currency: string;
  amount: string;
  start_time: string;
  end_time: string;
  start_price: string;
  end_price: string;
  price: string;
  auction_id: string;
}

const ObjktBuyDutchAuctionEventV2Schema: Describe<Omit<ObjktBuyDutchAuctionV2Event, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  currency: string(),
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  start_time: IsoDateString,
  end_time: IsoDateString,
  start_price: PgBigInt,
  end_price: PgBigInt,
  price: PgBigInt,
  amount: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktBuyDutchAuctionHandlerV2: Handler<Transaction, ObjktBuyDutchAuctionV2Event> = {
  type: EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION_V2,

  accept: {
    entrypoint: 'buy',
    target_address: OBJKT_CONTRACT_DUTCH_AUCTION_V2,
  },

  exec: (transaction) => {
    const auctionId = get(transaction, 'parameter.value.auction_id');
    const price = get(transaction, 'parameter.value.amount');
    const buyerAddress = get(transaction, 'sender.address');
    const diff = findDiff(transaction.diffs!, 103265, 'auctions', ['remove_key'], auctionId);
    const sellerAddress = get(diff, 'content.value.creator');
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.token_id');
    const startTime = get(diff, 'content.value.start_time');
    const endTime = get(diff, 'content.value.end_time');
    const startPrice = get(diff, 'content.value.start_price');
    const endPrice = get(diff, 'content.value.end_price');
    const amount = get(diff, 'content.value.editions');
    const currency = extractObjktCurrency(get(diff, 'content.value.currency'));
    const id = createEventId(EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION_V2, transaction.id);

    if (!currency) {
      throw new Error(`currency not set`);
    }

    const event: ObjktBuyDutchAuctionV2Event = {
      id,
      type: EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION_V2,
      implements: SALE_INTERFACE,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      currency: currency,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      buyer_address: buyerAddress,
      start_time: startTime,
      end_time: endTime,
      start_price: startPrice,
      end_price: endPrice,
      price,
      auction_id: auctionId,
      amount,
    };

    assert(omit(event, ['type', 'implements']), ObjktBuyDutchAuctionEventV2Schema);

    return event;
  },
};

export default ObjktBuyDutchAuctionHandlerV2;
