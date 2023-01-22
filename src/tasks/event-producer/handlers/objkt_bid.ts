import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE } from '../../../consts';
import { tokenEventFields, bidIdField, buyerAddressField, artistAddressField, royaltiesField, priceField } from '../event-fields-meta';

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
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  bid_id: PgBigInt,
  buyer_address: TezosAddress,
  artist_address: TezosAddress,
  royalties: PgBigInt,
  price: PgBigInt,
});

const ObjktBidHandler: TransactionHandler<ObjktBidEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_BID,

  meta: {
    eventDescription: `A bid (also known as an offer) was created on objkt.com (marketplace contract: KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq).`,
    eventFields: [...tokenEventFields, bidIdField, buyerAddressField, artistAddressField, royaltiesField, priceField],
  },

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
    const id = createEventId(EVENT_TYPE_OBJKT_BID, transaction);

    const event: ObjktBidEvent = {
      id,
      type: EVENT_TYPE_OBJKT_BID,
      opid: String(transaction.id),
      ophash: transaction.hash,
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
