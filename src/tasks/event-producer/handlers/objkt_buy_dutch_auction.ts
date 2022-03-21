import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_DUTCH_AUCTION_PRE, OBJKT_CONTRACT_DUTCH_AUCTION_V1, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION = 'OBJKT_BUY_DUTCH_AUCTION';

const CONTRACT_TO_BIGMAP: Record<string, number> = {
  [OBJKT_CONTRACT_DUTCH_AUCTION_PRE]: 5907,
  [OBJKT_CONTRACT_DUTCH_AUCTION_V1]: 6212,
};

export interface ObjktBuyDutchAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION;
  implements: SaleEventInterface;
  seller_address: string;
  buyer_address: string;
  artist_address: string;
  start_time: string;
  end_time: string;
  start_price: string;
  end_price: string;
  price: string;
  royalties: string;
  auction_id: string;
}

const ObjktBuyDutchAuctionEventSchema: Describe<Omit<ObjktBuyDutchAuctionEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  artist_address: TezosAddress,
  start_time: IsoDateString,
  end_time: IsoDateString,
  start_price: PgBigInt,
  end_price: PgBigInt,
  price: PgBigInt,
  royalties: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktBuyDutchAuctionHandler: Handler<Transaction, ObjktBuyDutchAuctionEvent> = {
  type: EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION,

  accept: (transaction) => {
    return (
      transactionMatchesPattern(transaction, {
        entrypoint: 'buy',
        target_address: OBJKT_CONTRACT_DUTCH_AUCTION_PRE,
      }) ||
      transactionMatchesPattern(transaction, {
        entrypoint: 'buy',
        target_address: OBJKT_CONTRACT_DUTCH_AUCTION_V1,
      })
    );
  },

  exec: (transaction) => {
    const auctionId = get(transaction, 'parameter.value');
    const contractAddress = get(transaction, 'target.address');
    const price = String(get(transaction, 'amount'));
    const buyerAddress = get(transaction, 'sender.address');
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
    const id = createEventId(EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION, transaction.id);

    const event: ObjktBuyDutchAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_BUY_DUTCH_AUCTION,
      implements: SALE_INTERFACE,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      buyer_address: buyerAddress,
      artist_address: artistAddress,
      start_time: startTime,
      end_time: endTime,
      start_price: startPrice,
      end_price: endPrice,
      royalties,
      price,
      auction_id: auctionId,
    };

    assert(omit(event, ['type', 'implements']), ObjktBuyDutchAuctionEventSchema);

    return event;
  },
};

export default ObjktBuyDutchAuctionHandler;
