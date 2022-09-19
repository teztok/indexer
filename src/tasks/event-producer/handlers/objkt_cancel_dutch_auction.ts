import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_DUTCH_AUCTION_PRE, OBJKT_CONTRACT_DUTCH_AUCTION_V1 } from '../../../consts';

export const EVENT_TYPE_OBJKT_CANCEL_DUTCH_AUCTION = 'OBJKT_CANCEL_DUTCH_AUCTION';

const CONTRACT_TO_BIGMAP: Record<string, number> = {
  [OBJKT_CONTRACT_DUTCH_AUCTION_PRE]: 5907,
  [OBJKT_CONTRACT_DUTCH_AUCTION_V1]: 6212,
};

export interface ObjktCancelDutchAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_CANCEL_DUTCH_AUCTION;
  seller_address: string;
  artist_address: string;
  start_time: string;
  end_time: string;
  start_price: string;
  end_price: string;
  royalties: string;
  auction_id: string;
}

const ObjktCancelDutchAuctionEventSchema: Describe<Omit<ObjktCancelDutchAuctionEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  start_time: IsoDateString,
  end_time: IsoDateString,
  start_price: PgBigInt,
  end_price: PgBigInt,
  royalties: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktCancelDutchAuctionHandler: Handler<Transaction, ObjktCancelDutchAuctionEvent> = {
  type: EVENT_TYPE_OBJKT_CANCEL_DUTCH_AUCTION,

  accept: (transaction) => {
    return (
      transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_auction',
        target_address: OBJKT_CONTRACT_DUTCH_AUCTION_PRE,
      }) ||
      transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_auction',
        target_address: OBJKT_CONTRACT_DUTCH_AUCTION_V1,
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
    const startTime = get(diff, 'content.value.start_time');
    const endTime = get(diff, 'content.value.end_time');
    const startPrice = get(diff, 'content.value.start_price');
    const endPrice = get(diff, 'content.value.end_price');
    const royalties = get(diff, 'content.value.royalties');
    const id = createEventId(EVENT_TYPE_OBJKT_CANCEL_DUTCH_AUCTION, transaction);

    const event: ObjktCancelDutchAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_CANCEL_DUTCH_AUCTION,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      start_time: startTime,
      end_time: endTime,
      start_price: startPrice,
      end_price: endPrice,
      royalties,
      auction_id: auctionId,
    };

    assert(omit(event, ['type']), ObjktCancelDutchAuctionEventSchema);

    return event;
  },
};

export default ObjktCancelDutchAuctionHandler;
