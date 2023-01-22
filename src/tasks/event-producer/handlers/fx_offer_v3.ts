import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE_V3, GENTK_VERSION_TO_FA2_CONTRACT_MAPPING } from '../../../consts';
import { tokenEventFields, buyerAddressField, offerIdField, priceField } from '../event-fields-meta';

export const EVENT_TYPE_FX_OFFER_V3 = 'FX_OFFER_V3';

export interface FxOfferV3Event extends TokenEvent {
  type: typeof EVENT_TYPE_FX_OFFER_V3;
  offer_id: string;
  buyer_address: string;
  price: string;
}

const FxOfferEventSchema: Describe<Omit<FxOfferV3Event, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  buyer_address: TezosAddress,
  offer_id: PgBigInt,
  price: PgBigInt,
});

const FxOfferHandler: TransactionHandler<FxOfferV3Event> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_OFFER_V3,

  accept: {
    entrypoint: 'offer',
    target_address: FX_CONTRACT_MARKETPLACE_V3,
  },

  meta: {
    eventDescription: `An offer was created on fxhash (marketplace contract: KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u).`,
    eventFields: [...tokenEventFields, buyerAddressField, offerIdField, priceField],
  },

  exec: (transaction) => {
    const price = String(get(transaction, 'amount'));
    const tokenId = get(transaction, 'parameter.value.gentk.id');
    const gentkVersion = get(transaction, 'parameter.value.gentk.version');

    if (!(gentkVersion in GENTK_VERSION_TO_FA2_CONTRACT_MAPPING)) {
      throw new Error(`unsupported gentk version: ${gentkVersion}`);
    }

    const fa2Address = GENTK_VERSION_TO_FA2_CONTRACT_MAPPING[gentkVersion];
    const buyerAddress = get(transaction, 'sender.address');
    const offerId = String(parseInt(get(transaction, 'storage.offers_count'), 10) - 1);
    const id = createEventId(EVENT_TYPE_FX_OFFER_V3, transaction);

    const event: FxOfferV3Event = {
      id,
      type: EVENT_TYPE_FX_OFFER_V3,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      offer_id: offerId,
      buyer_address: buyerAddress,
      price,
    };

    assert(omit(event, ['type']), FxOfferEventSchema);

    return event;
  },
};

export default FxOfferHandler;
