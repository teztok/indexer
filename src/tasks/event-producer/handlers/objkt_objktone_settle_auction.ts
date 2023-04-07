import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { CURRENCY_MAPPINGS, OBJKT_CONTRACT_OBJKTONE_AUCTIONS, SALE_INTERFACE } from '../../../consts';
import {
  tokenSaleEventFields,
  currencyField,
  reserveField,
  priceField,
  editionsField,
  priceIncrementField,
  auctionIdField,
} from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_OBJKTONE_SETTLE_AUCTION = 'OBJKT_OBJKTONE_SETTLE_AUCTION';

export interface ObjktObjktoneSettleAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_OBJKTONE_SETTLE_AUCTION;
  implements?: SaleEventInterface;
  seller_address: string;
  buyer_address: string;
  currency: string;
  reserve: string;
  price: string;
  extension_time: string;
  //royalties: string;
  price_increment: string;
  auction_id: string;
}

const ObjktObjktoneSettleAuctionEventSchema: Describe<Omit<ObjktObjktoneSettleAuctionEvent, 'type' | 'implements'>> = object({
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
  price: PgBigInt,
  extension_time: PgBigInt,
  //royalties: PgBigInt,
  price_increment: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktObjktoneAuctionHandler: TransactionHandler<ObjktObjktoneSettleAuctionEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_OBJKTONE_SETTLE_AUCTION,

  meta: {
    eventDescription: `An auction was settled on objkt.one. Either the token was bought or the auction ended without a sale. (marketplace contract: KT1M6r2gRigUYP3tCSEjEptRnNG8qRLSRqcT).`,
    eventFields: [...tokenSaleEventFields, currencyField, reserveField, priceField, editionsField, priceIncrementField, auctionIdField],
  },

  accept: {
    entrypoint: 'settle_auction',
    target_address: OBJKT_CONTRACT_OBJKTONE_AUCTIONS,
  },

  exec: (transaction) => {
    const auctionId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 384417, 'auctions', ['remove_key'], auctionId);
    const sellerAddress = get(diff, 'content.value.creator');
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.token_id');
    const reserve = get(diff, 'content.value.reserve');
    const extensionTime = get(diff, 'content.value.extension_time');
    const priceIncrement = get(diff, 'content.value.price_increment');
    const highestBidderAddress = get(diff, 'content.value.highest_bidder');
    const currentPrice = get(diff, 'content.value.current_price');
    const currencyAddress = get(diff, 'content.value.currency.fa12');
    const id = createEventId(EVENT_TYPE_OBJKT_OBJKTONE_SETTLE_AUCTION, transaction);

    const event: ObjktObjktoneSettleAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_OBJKTONE_SETTLE_AUCTION,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      buyer_address: highestBidderAddress,
      currency: currencyAddress in CURRENCY_MAPPINGS ? CURRENCY_MAPPINGS[currencyAddress] : currencyAddress,
      reserve,
      extension_time: extensionTime,
      price_increment: priceIncrement,
      auction_id: auctionId,
      price: currentPrice,
    };

    if (event.seller_address !== event.buyer_address) {
      event.implements = SALE_INTERFACE;
    }

    assert(omit(event, ['type', 'implements']), ObjktObjktoneSettleAuctionEventSchema);

    return event;
  },
};

export default ObjktObjktoneAuctionHandler;
