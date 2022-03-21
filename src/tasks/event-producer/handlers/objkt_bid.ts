import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_BID = 'OBJKT_BID';

export interface ObjktBidEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_BID;
  bid_id: string;
  buyer_address: string;
  artist_address: string;
  royalties: string;
  price: string;
}

const ObjktBidEventSchema: Describe<Omit<ObjktBidEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  bid_id: PgBigInt,
  buyer_address: TezosAddress,
  artist_address: TezosAddress,
  royalties: PgBigInt,
  price: PgBigInt,
});

const ObjktBidHandler: Handler<Transaction, ObjktBidEvent> = {
  type: EVENT_TYPE_OBJKT_BID,

  accept: {
    entrypoint: 'bid',
    target_address: OBJKT_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'parameter.value.fa2');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const bidId = String(parseInt(get(transaction, 'storage.bid_id'), 10) - 1);
    const buyerAddress = get(transaction, 'sender.address');
    const artistAddress = get(transaction, 'parameter.value.artist');
    const royalties = get(transaction, 'parameter.value.royalties');
    const price = String(get(transaction, 'amount'));
    const id = createEventId(EVENT_TYPE_OBJKT_BID, transaction.id);

    const event: ObjktBidEvent = {
      id,
      type: EVENT_TYPE_OBJKT_BID,
      opid: transaction.id,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      bid_id: bidId,
      buyer_address: buyerAddress,
      artist_address: artistAddress,
      royalties: royalties,
      price: price,
    };

    assert(omit(event, ['type']), ObjktBidEventSchema);

    return event;
  },
};

export default ObjktBidHandler;
