import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_DUTCH_AUCTION_PRE, OBJKT_CONTRACT_DUTCH_AUCTION_V1 } from '../../../consts';

export const EVENT_TYPE_OBJKT_CREATE_DUTCH_AUCTION = 'OBJKT_CREATE_DUTCH_AUCTION';

export interface ObjktCreateDutchAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_CREATE_DUTCH_AUCTION;
  seller_address: string;
  artist_address: string;
  start_time: string;
  end_time: string;
  start_price: string;
  end_price: string;
  royalties: string;
  auction_id: string;
}

const ObjktCreateDutchAuctionEventSchema: Describe<Omit<ObjktCreateDutchAuctionEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  start_time: IsoDateString,
  end_time: IsoDateString,
  start_price: PgBigInt,
  end_price: PgBigInt,
  royalties: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktCreateDutchAuctionHandler: Handler<Transaction, ObjktCreateDutchAuctionEvent> = {
  type: EVENT_TYPE_OBJKT_CREATE_DUTCH_AUCTION,

  accept: (transaction) => {
    return (
      transactionMatchesPattern(transaction, {
        entrypoint: 'create_auction',
        target_address: OBJKT_CONTRACT_DUTCH_AUCTION_PRE,
      }) ||
      transactionMatchesPattern(transaction, {
        entrypoint: 'create_auction',
        target_address: OBJKT_CONTRACT_DUTCH_AUCTION_V1,
      })
    );
  },

  exec: (transaction) => {
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'parameter.value.fa2');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const artistAddress = get(transaction, 'parameter.value.artist');
    const startTime = get(transaction, 'parameter.value.start_time');
    const startPrice = get(transaction, 'parameter.value.start_price');
    const endPrice = get(transaction, 'parameter.value.end_price');
    const endTime = get(transaction, 'parameter.value.end_time');
    const royalties = get(transaction, 'parameter.value.royalties');
    const auctionId = String(parseInt(get(transaction, 'storage.auction_id'), 10) - 1);
    const id = createEventId(EVENT_TYPE_OBJKT_CREATE_DUTCH_AUCTION, transaction.id);

    const event: ObjktCreateDutchAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_CREATE_DUTCH_AUCTION,
      opid: transaction.id,
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

    assert(omit(event, ['type']), ObjktCreateDutchAuctionEventSchema);

    return event;
  },
};

export default ObjktCreateDutchAuctionHandler;
