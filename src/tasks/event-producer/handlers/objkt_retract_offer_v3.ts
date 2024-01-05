import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { findDiff, createEventId, transactionMatchesPattern } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE_V3 } from '../../../consts';
import { tokenEventFields, artistAddressField, buyerAddressField, offerIdField } from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_RETRACT_OFFER_V3 = 'OBJKT_RETRACT_OFFER_V3';

export interface ObjktRetractOfferV3Event extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_RETRACT_OFFER_V3;
  offer_id: string;
  artist_address?: string;
  buyer_address: string;
}

const ObjktRetractOfferEventSchema: Describe<Omit<ObjktRetractOfferV3Event, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: optional(TezosAddress),
  buyer_address: TezosAddress,
  offer_id: PgBigInt,
});

const ObjktRetractOfferHandler: TransactionHandler<ObjktRetractOfferV3Event> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_RETRACT_OFFER_V3,

  meta: {
    eventDescription: `An offer was canceled on objkt.com (marketplace contract: KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4).`,
    eventFields: [...tokenEventFields, artistAddressField, buyerAddressField, offerIdField],
  },

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'retract_offer',
        target_address: OBJKT_CONTRACT_MARKETPLACE_V3,
      })
    ) {
      return false;
    }

    const offerId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 574015, 'offers', 'remove_key', offerId);
    return !!get(diff, 'content.value.token.token_id');
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 574015, 'offers', 'remove_key', offerId);
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.token_id');
    //const artistAddress = get(diff, 'content.value.artist');
    const buyerAddress = get(diff, 'content.value.creator');
    const id = createEventId(EVENT_TYPE_OBJKT_RETRACT_OFFER_V3, transaction);

    const event: ObjktRetractOfferV3Event = {
      id,
      type: EVENT_TYPE_OBJKT_RETRACT_OFFER_V3,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      buyer_address: buyerAddress,
      token_id: tokenId,
      offer_id: offerId,
    };

    assert(omit(event, ['type']), ObjktRetractOfferEventSchema);

    return event;
  },
};

export default ObjktRetractOfferHandler;
