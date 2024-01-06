import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { findDiff, createEventId, isTezLikeCurrency, extractObjktCurrency } from '../../../lib/utils';
import { CURRENCY_MAPPINGS, OBJKT_CONTRACT_ENGLISH_AUCTION_V3, SALE_INTERFACE } from '../../../consts';
import {
  tokenSaleEventFields,
  currencyField,
  reserveField,
  startTimeField,
  endTimeField,
  priceField,
  editionsField,
  priceIncrementField,
  auctionIdField,
} from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION_V3 = 'OBJKT_CONTRACT_ENGLISH_AUCTION_V3';

export interface ObjktSettleEnglishAuctionV3Event extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION_V3;
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

const ObjktSettleEnglishAuctionEventSchema: Describe<Omit<ObjktSettleEnglishAuctionV3Event, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
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

const ObjktSettleEnglishAuctionHandler: TransactionHandler<ObjktSettleEnglishAuctionV3Event> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION_V3,

  meta: {
    eventDescription: `An English auction was settled on objkt.com. Either the token was bought or the auction ended without a sale. (marketplace contract: KT18iSHoRW1iogamADWwQSDoZa3QkN4izkqj).`,
    eventFields: [
      ...tokenSaleEventFields,
      currencyField,
      reserveField,
      startTimeField,
      endTimeField,
      priceField,
      editionsField,
      priceIncrementField,
      auctionIdField,
    ],
  },

  accept: {
    entrypoint: 'settle_auction',
    target_address: OBJKT_CONTRACT_ENGLISH_AUCTION_V3,
  },

  exec: (transaction) => {
    const auctionId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 574016, 'auctions', ['remove_key'], auctionId);
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
    const currency = extractObjktCurrency(get(diff, 'content.value.currency'));

    if (!currency || !isTezLikeCurrency(currency)) {
      throw new Error(`unsupported currency`);
    }

    const id = createEventId(EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION_V3, transaction);

    const event: ObjktSettleEnglishAuctionV3Event = {
      id,
      type: EVENT_TYPE_OBJKT_SETTLE_ENGLISH_AUCTION_V3,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      buyer_address: highestBidderAddress,
      currency: currency,
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
