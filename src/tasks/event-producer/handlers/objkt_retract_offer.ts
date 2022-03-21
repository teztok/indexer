import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE_V2 } from '../../../consts';

export const EVENT_TYPE_OBJKT_RETRACT_OFFER = 'OBJKT_RETRACT_OFFER';

export interface ObjktRetractOfferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_RETRACT_OFFER;
  offer_id: string;
  artist_address?: string;
  buyer_address: string;
}

const ObjktRetractOfferEventSchema: Describe<Omit<ObjktRetractOfferEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),

  artist_address: optional(TezosAddress),
  buyer_address: TezosAddress,
  offer_id: PgBigInt,
});

const ObjktRetractOfferHandler: Handler<Transaction, ObjktRetractOfferEvent> = {
  type: EVENT_TYPE_OBJKT_RETRACT_OFFER,

  accept: {
    entrypoint: 'retract_offer',
    target_address: OBJKT_CONTRACT_MARKETPLACE_V2,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 103260, 'offers', 'remove_key', offerId);
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.token_id');
    //const artistAddress = get(diff, 'content.value.artist');
    const buyerAddress = get(diff, 'content.value.creator');
    const id = createEventId(EVENT_TYPE_OBJKT_RETRACT_OFFER, transaction.id);

    const event: ObjktRetractOfferEvent = {
      id,
      type: EVENT_TYPE_OBJKT_RETRACT_OFFER,
      opid: transaction.id,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      //artist_address: artistAddress, // TODO: add
      buyer_address: buyerAddress,
      token_id: tokenId,
      offer_id: offerId,
    };

    assert(omit(event, ['type']), ObjktRetractOfferEventSchema);

    return event;
  },
};

export default ObjktRetractOfferHandler;
