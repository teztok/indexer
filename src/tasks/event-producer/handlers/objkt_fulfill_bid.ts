import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_FULFILL_BID = 'OBJKT_FULFILL_BID';

export interface ObjktFulfillBidEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_FULFILL_BID;
  implements: SaleEventInterface;
  bid_id: string;
  price: string;
  seller_address: string;
  buyer_address: string;
  artist_address: string;
}

const ObjktFulfillBidEventSchema: Describe<Omit<ObjktFulfillBidEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  bid_id: PgBigInt,
  price: PgBigInt,
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  artist_address: TezosAddress,
});

const ObjktFulfillBidHandler: Handler<Transaction, ObjktFulfillBidEvent> = {
  type: EVENT_TYPE_OBJKT_FULFILL_BID,

  accept: {
    entrypoint: 'fulfill_bid',
    target_address: OBJKT_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const bidId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 5910, 'bids', ['remove_key', 'update_key'], bidId);
    const fa2Address = get(diff, 'content.value.fa2');
    const tokenId = get(diff, 'content.value.objkt_id');
    const sellerAddress = get(transaction, 'sender.address');
    const artistAddress = get(diff, 'content.value.artist');
    const buyerAddress = get(diff, 'content.value.issuer');
    const price = get(diff, 'content.value.xtz_per_objkt');
    const id = createEventId(EVENT_TYPE_OBJKT_FULFILL_BID, transaction);

    const event: ObjktFulfillBidEvent = {
      id,
      type: EVENT_TYPE_OBJKT_FULFILL_BID,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      price,
      artist_address: artistAddress,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      bid_id: bidId,
    };

    assert(omit(event, ['type', 'implements']), ObjktFulfillBidEventSchema);

    return event;
  },
};

export default ObjktFulfillBidHandler;
