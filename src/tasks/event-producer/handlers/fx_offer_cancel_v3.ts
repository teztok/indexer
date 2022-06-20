import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE_V3, GENTK_VERSION_TO_FA2_CONTRACT_MAPPING } from '../../../consts';

export const EVENT_TYPE_FX_OFFER_CANCEL_V3 = 'FX_OFFER_CANCEL_V3';

export interface FxOfferCancelV3Event extends TokenEvent {
  type: typeof EVENT_TYPE_FX_OFFER_CANCEL_V3;
  offer_id: string;
  buyer_address: string;
}

const FxOfferCancelV3EventSchema: Describe<Omit<FxOfferCancelV3Event, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  buyer_address: TezosAddress,
  offer_id: PgBigInt,
});

const FxOfferCancelV3EventHandler: Handler<Transaction, FxOfferCancelV3Event> = {
  type: EVENT_TYPE_FX_OFFER_CANCEL_V3,

  accept: {
    entrypoint: 'offer_cancel',
    target_address: FX_CONTRACT_MARKETPLACE_V3,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 149789, 'offers', 'remove_key', offerId);

    const buyerAddress = get(diff, 'content.value.buyer');
    const tokenId = get(diff, 'content.value.gentk.id');
    const gentkVersion = get(diff, 'content.value.gentk.version');

    if (!(gentkVersion in GENTK_VERSION_TO_FA2_CONTRACT_MAPPING)) {
      throw new Error(`unsupported gentk version: ${gentkVersion}`);
    }

    const fa2Address = GENTK_VERSION_TO_FA2_CONTRACT_MAPPING[gentkVersion];
    const id = createEventId(EVENT_TYPE_FX_OFFER_CANCEL_V3, transaction);

    const event: FxOfferCancelV3Event = {
      id,
      type: EVENT_TYPE_FX_OFFER_CANCEL_V3,
      opid: transaction.id,
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      buyer_address: buyerAddress,
      token_id: tokenId,
      offer_id: offerId,
    };

    assert(omit(event, ['type']), FxOfferCancelV3EventSchema);

    return event;
  },
};

export default FxOfferCancelV3EventHandler;
