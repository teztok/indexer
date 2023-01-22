import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_ENGLISH_AUCTION_PRE, OBJKT_CONTRACT_ENGLISH_AUCTION_V1 } from '../../../consts';
import {
  tokenEventFields,
  sellerAddressField,
  artistAddressField,
  reserveField,
  startTimeField,
  endTimeField,
  currentPriceField,
  extensionTimeField,
  highestBidderAddressField,
  royaltiesField,
  priceIncrementField,
  auctionIdField,
} from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_CANCEL_ENGLISH_AUCTION = 'OBJKT_CANCEL_ENGLISH_AUCTION';

const CONTRACT_TO_BIGMAP: Record<string, number> = {
  [OBJKT_CONTRACT_ENGLISH_AUCTION_PRE]: 5904,
  [OBJKT_CONTRACT_ENGLISH_AUCTION_V1]: 6210,
};

export interface ObjktCancelEnglishAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_CANCEL_ENGLISH_AUCTION;
  seller_address: string;
  artist_address: string;
  reserve: string;
  start_time: string;
  end_time: string;
  current_price: string;
  extension_time: string;
  royalties: string;
  price_increment: string;
  highest_bidder_address: string;
  auction_id: string;
}

const ObjktCancelEnglishAuctionEventSchema: Describe<Omit<ObjktCancelEnglishAuctionEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  reserve: PgBigInt,
  start_time: IsoDateString,
  end_time: IsoDateString,
  current_price: PgBigInt,
  extension_time: PgBigInt,
  highest_bidder_address: TezosAddress,
  royalties: PgBigInt,
  price_increment: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktCancelEnglishAuctionHandler: TransactionHandler<ObjktCancelEnglishAuctionEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_CANCEL_ENGLISH_AUCTION,

  meta: {
    eventDescription: `An english auction was canceled on objkt.com (marketplace contract: KT1ET45vnyEFMLS9wX1dYHEs9aCN3twDEiQw or KT1QJ71jypKGgyTNtXjkCAYJZNhCKWiHuT2r).`,
    eventFields: [
      ...tokenEventFields,
      sellerAddressField,
      artistAddressField,
      reserveField,
      startTimeField,
      endTimeField,
      currentPriceField,
      extensionTimeField,
      highestBidderAddressField,
      royaltiesField,
      priceIncrementField,
      auctionIdField,
    ],
  },

  accept: (transaction) => {
    return (
      transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_auction',
        target_address: OBJKT_CONTRACT_ENGLISH_AUCTION_PRE,
      }) ||
      transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_auction',
        target_address: OBJKT_CONTRACT_ENGLISH_AUCTION_V1,
      })
    );
  },

  exec: (transaction) => {
    const auctionId = get(transaction, 'parameter.value');
    const contractAddress = get(transaction, 'target.address');
    const diff = findDiff(transaction.diffs!, CONTRACT_TO_BIGMAP[contractAddress], 'auctions', ['update_key'], auctionId);
    const sellerAddress = get(diff, 'content.value.creator');
    const artistAddress = get(diff, 'content.value.artist');
    const fa2Address = get(diff, 'content.value.fa2');
    const tokenId = get(diff, 'content.value.objkt_id');
    const reserve = get(diff, 'content.value.reserve');
    const startTime = get(diff, 'content.value.start_time');
    const endTime = get(diff, 'content.value.end_time');
    const extensionTime = get(diff, 'content.value.extension_time');
    const royalties = get(diff, 'content.value.royalties');
    const priceIncrement = get(diff, 'content.value.price_increment');
    const highestBidderAddress = get(diff, 'content.value.highest_bidder');
    const currentPrice = get(diff, 'content.value.current_price');
    const id = createEventId(EVENT_TYPE_OBJKT_CANCEL_ENGLISH_AUCTION, transaction);

    const event: ObjktCancelEnglishAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_CANCEL_ENGLISH_AUCTION,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      reserve,
      start_time: startTime,
      end_time: endTime,
      extension_time: extensionTime,
      royalties,
      price_increment: priceIncrement,
      auction_id: auctionId,
      highest_bidder_address: highestBidderAddress,
      current_price: currentPrice,
    };

    assert(omit(event, ['type']), ObjktCancelEnglishAuctionEventSchema);

    return event;
  },
};

export default ObjktCancelEnglishAuctionHandler;
