import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { CURRENCY_MAPPINGS, OBJKT_CONTRACT_ENGLISH_AUCTION_V2, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION = 'OBJKT_SETTLE_ENGLISH_AUCTION';

export interface ObjktSettleEnglishAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION;
  implements?: SaleEventInterface;
  seller_address: string;
  buyer_address: string;
  currency: string;
  reserve: string;
  start_time: string;
  end_time: string;
  price: string;
  extension_time: string;
  //royalties: string;
  price_increment: string;
  auction_id: string;
}

const ObjktSettleEnglishAuctionEventSchema: Describe<Omit<ObjktSettleEnglishAuctionEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  currency: string(),
  reserve: PgBigInt,
  start_time: IsoDateString,
  end_time: IsoDateString,
  price: PgBigInt,
  extension_time: PgBigInt,
  //royalties: PgBigInt,
  price_increment: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktSettleEnglishAuctionHandler: Handler<Transaction, ObjktSettleEnglishAuctionEvent> = {
  type: EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION,

  accept: {
    entrypoint: 'settle_auction',
    target_address: OBJKT_CONTRACT_ENGLISH_AUCTION_V2,
  },

  exec: (transaction) => {
    const auctionId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 103262, 'auctions', ['remove_key'], auctionId);
    const sellerAddress = get(diff, 'content.value.creator');
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.token_id');
    const reserve = get(diff, 'content.value.reserve');
    const startTime = get(diff, 'content.value.start_time');
    const endTime = get(diff, 'content.value.end_time');
    const extensionTime = get(diff, 'content.value.extension_time');
    const priceIncrement = get(diff, 'content.value.price_increment');
    const highestBidderAddress = get(diff, 'content.value.highest_bidder');
    const currentPrice = get(diff, 'content.value.current_price');
    const currencyAddress = get(diff, 'content.value.currency.fa12');
    const id = createEventId(EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION, transaction.id);

    const event: ObjktSettleEnglishAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      buyer_address: highestBidderAddress,
      currency: currencyAddress in CURRENCY_MAPPINGS ? CURRENCY_MAPPINGS[currencyAddress] : currencyAddress,
      reserve,
      start_time: startTime,
      end_time: endTime,
      extension_time: extensionTime,
      price_increment: priceIncrement,
      auction_id: auctionId,
      price: currentPrice,
    };

    if (event.seller_address !== event.buyer_address) {
      event.implements = SALE_INTERFACE;
    }

    assert(omit(event, ['type', 'implements']), ObjktSettleEnglishAuctionEventSchema);

    return event;
  },
};

export default ObjktSettleEnglishAuctionHandler;
