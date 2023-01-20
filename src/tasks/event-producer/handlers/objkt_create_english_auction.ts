import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_ENGLISH_AUCTION_PRE, OBJKT_CONTRACT_ENGLISH_AUCTION_V1 } from '../../../consts';

export const EVENT_TYPE_OBJKT_CREATE_ENGLISH_AUCTION = 'OBJKT_CREATE_ENGLISH_AUCTION';

export interface ObjktCreateEnglishAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_CREATE_ENGLISH_AUCTION;
  seller_address: string;
  artist_address: string;
  reserve: string;
  start_time: string;
  end_time: string;
  extension_time: string;
  royalties: string;
  price_increment: string;
  auction_id: string;
}

const ObjktCreateEnglishAuctionEventSchema: Describe<Omit<ObjktCreateEnglishAuctionEvent, 'type'>> = object({
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
  extension_time: PgBigInt,
  royalties: PgBigInt,
  price_increment: PgBigInt,
  auction_id: PgBigInt,
});

const ObjktCreateEnglishAuctionHandler: TransactionHandler<ObjktCreateEnglishAuctionEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_CREATE_ENGLISH_AUCTION,

  description: `An english auction was created on objkt.com (marketplace contract: KT1Wvk8fon9SgNEPQKewoSL2ziGGuCQebqZc or KT1XjcRq5MLAzMKQ3UHsrue2SeU2NbxUrzmU).`,

  accept: (transaction) => {
    return (
      transactionMatchesPattern(transaction, {
        entrypoint: 'create_auction',
        target_address: OBJKT_CONTRACT_ENGLISH_AUCTION_PRE,
      }) ||
      transactionMatchesPattern(transaction, {
        entrypoint: 'create_auction',
        target_address: OBJKT_CONTRACT_ENGLISH_AUCTION_V1,
      })
    );
  },

  exec: (transaction) => {
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'parameter.value.fa2');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const artistAddress = get(transaction, 'parameter.value.artist');
    const reserve = get(transaction, 'parameter.value.reserve');
    const startTime = get(transaction, 'parameter.value.start_time');
    const endTime = get(transaction, 'parameter.value.end_time');
    const extensionTime = get(transaction, 'parameter.value.extension_time');
    const royalties = get(transaction, 'parameter.value.royalties');
    const priceIncrement = get(transaction, 'parameter.value.price_increment');
    const auctionId = String(parseInt(get(transaction, 'storage.auction_id'), 10) - 1);
    const id = createEventId(EVENT_TYPE_OBJKT_CREATE_ENGLISH_AUCTION, transaction);

    const event: ObjktCreateEnglishAuctionEvent = {
      id,
      type: EVENT_TYPE_OBJKT_CREATE_ENGLISH_AUCTION,
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
    };

    assert(omit(event, ['type']), ObjktCreateEnglishAuctionEventSchema);

    return event;
  },
};

export default ObjktCreateEnglishAuctionHandler;
