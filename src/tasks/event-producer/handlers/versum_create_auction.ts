import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { VERSUM_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_VERSUM_CREATE_AUCTION = 'VERSUM_CREATE_AUCTION';

export interface VersumCreateAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_CREATE_AUCTION;
  seller_address: string;
  artist_address?: string;
  end_time: string;
  auction_id: string;
  amount: string;
  start_price: string;
}

const VersumCreateAuctionEventSchema: Describe<Omit<VersumCreateAuctionEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  artist_address: optional(TezosAddress),
  end_time: IsoDateString,
  amount: PgBigInt,
  auction_id: PgBigInt,
  start_price: PgBigInt,
});

const VersumCreateAuctionHandler: Handler<Transaction, VersumCreateAuctionEvent> = {
  type: EVENT_TYPE_VERSUM_CREATE_AUCTION,

  accept: {
    entrypoint: 'create_auction',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'parameter.value.token.address');
    const tokenId = get(transaction, 'parameter.value.token.nat');
    const startPrice = get(transaction, 'parameter.value.bid_amount');
    const endTime = get(transaction, 'parameter.value.end_timestamp');
    const auctionId = String(parseInt(get(transaction, 'storage.auction_counter'), 10) - 1);
    const amount = get(transaction, 'parameter.value.token_amount');
    const id = createEventId(EVENT_TYPE_VERSUM_CREATE_AUCTION, transaction);

    const event: VersumCreateAuctionEvent = {
      id,
      type: EVENT_TYPE_VERSUM_CREATE_AUCTION,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      start_price: startPrice,
      end_time: endTime,
      auction_id: auctionId,
      amount,
    };

    assert(omit(event, ['type']), VersumCreateAuctionEventSchema);

    return event;
  },
};

export default VersumCreateAuctionHandler;
