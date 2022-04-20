import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_ENGLISH_AUCTION_PRE, OBJKT_CONTRACT_ENGLISH_AUCTION_V1, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_CONCLUDE_ENGLISH_AUCTION = 'OBJKT_CONCLUDE_ENGLISH_AUCTION';

const CONTRACT_TO_BIGMAP: Record<string, number> = {
  [OBJKT_CONTRACT_ENGLISH_AUCTION_PRE]: 5904,
  [OBJKT_CONTRACT_ENGLISH_AUCTION_V1]: 6210,
};

export interface ObjktConcludeEnglishAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_CONCLUDE_ENGLISH_AUCTION;
  implements: SaleEventInterface;
  seller_address: string;
  buyer_address: string;
  artist_address: string;
  reserve: string;
  start_time: string;
  end_time: string;
  price: string;
  extension_time: string;
  royalties: string;
  price_increment: string;
  auction_id: string;
}

const ObjktConcludeEnglishAuctionEventSchema: Describe<Omit<ObjktConcludeEnglishAuctionEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  artist_address: TezosAddress,
  reserve: PgBigInt,
  start_time: IsoDateString,
  end_time: IsoDateString,
  price: PgBigInt,
  extension_time: PgBigInt,
  royalties: PgBigInt,
  price_increment: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktConcludeEnglishAuctionHandler: Handler<Transaction, ObjktConcludeEnglishAuctionEvent> = {
  type: EVENT_TYPE_OBJKT_CONCLUDE_ENGLISH_AUCTION,

  accept: (transaction) => {
    return (
      transactionMatchesPattern(transaction, {
        entrypoint: 'conclude_auction',
        target_address: OBJKT_CONTRACT_ENGLISH_AUCTION_PRE,
      }) ||
      transactionMatchesPattern(transaction, {
        entrypoint: 'conclude_auction',
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
    const id = createEventId(EVENT_TYPE_OBJKT_CONCLUDE_ENGLISH_AUCTION, transaction.id);

    const event: ObjktConcludeEnglishAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_CONCLUDE_ENGLISH_AUCTION,
      implements: SALE_INTERFACE,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      buyer_address: highestBidderAddress,
      artist_address: artistAddress,
      reserve,
      start_time: startTime,
      end_time: endTime,
      extension_time: extensionTime,
      royalties,
      price_increment: priceIncrement,
      auction_id: auctionId,
      price: currentPrice,
    };

    assert(omit(event, ['type', 'implements']), ObjktConcludeEnglishAuctionEventSchema);

    return event;
  },
};

export default ObjktConcludeEnglishAuctionHandler;
