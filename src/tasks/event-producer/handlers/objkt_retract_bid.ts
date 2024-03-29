import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE } from '../../../consts';
import { tokenEventFields, artistAddressField, buyerAddressField, bidIdField } from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_RETRACT_BID = 'OBJKT_RETRACT_BID';

export interface ObjktRetractBidEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_RETRACT_BID;
  bid_id: string;
  artist_address: string;
  buyer_address: string;
}

const ObjktRetractBidEventSchema: Describe<Omit<ObjktRetractBidEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  artist_address: TezosAddress,
  buyer_address: TezosAddress,
  bid_id: PgBigInt,
});

const ObjktRetractBidHandler: TransactionHandler<ObjktRetractBidEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_RETRACT_BID,

  meta: {
    eventDescription: `A bid (also known as an offer) was canceled on objkt.com (marketplace contract: KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq).`,
    eventFields: [...tokenEventFields, artistAddressField, buyerAddressField, bidIdField],
  },

  accept: {
    entrypoint: 'retract_bid',
    target_address: OBJKT_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const bidId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 5910, 'bids', 'remove_key', bidId);
    const fa2Address = get(diff, 'content.value.fa2');
    const tokenId = get(diff, 'content.value.objkt_id');
    const artistAddress = get(diff, 'content.value.artist');
    const buyerAddress = get(diff, 'content.value.issuer');
    const id = createEventId(EVENT_TYPE_OBJKT_RETRACT_BID, transaction);

    const event: ObjktRetractBidEvent = {
      id,
      type: EVENT_TYPE_OBJKT_RETRACT_BID,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      artist_address: artistAddress,
      buyer_address: buyerAddress,
      token_id: tokenId,
      bid_id: bidId,
    };

    assert(omit(event, ['type']), ObjktRetractBidEventSchema);

    return event;
  },
};

export default ObjktRetractBidHandler;
