import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { SALE_INTERFACE, FX_CONTRACT_MARKETPLACE_V3, GENTK_VERSION_TO_FA2_CONTRACT_MAPPING } from '../../../consts';
import { tokenSaleEventFields, offerIdField } from '../event-fields-meta';

export const EVENT_TYPE_FX_OFFER_ACCEPT_V3 = 'FX_OFFER_ACCEPT_V3';

export interface FxOfferAcceptV3Event extends TokenEvent {
  type: typeof EVENT_TYPE_FX_OFFER_ACCEPT_V3;
  implements: SaleEventInterface;
  offer_id: string;
  seller_address: string;
  buyer_address: string;
  price: string;
}

const FxOfferAcceptV3EventSchema: Describe<Omit<FxOfferAcceptV3Event, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  offer_id: PgBigInt,
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  price: PgBigInt,
});

const FxOfferAcceptV3Handler: TransactionHandler<FxOfferAcceptV3Event> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_OFFER_ACCEPT_V3,

  meta: {
    eventDescription: `An offer was accepted on fxhash (marketplace contract: KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u).`,
    eventFields: [...tokenSaleEventFields, offerIdField],
  },

  accept: {
    entrypoint: 'offer_accept',
    target_address: FX_CONTRACT_MARKETPLACE_V3,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const sellerAddress = get(transaction, 'sender.address');
    const diff = findDiff(get(transaction, 'diffs')!, 149789, 'offers', ['remove_key'], offerId);
    const buyerAddress = get(diff, 'content.value.buyer');
    const price = get(diff, 'content.value.price');
    const tokenId = get(diff, 'content.value.gentk.id');
    const gentkVersion = get(diff, 'content.value.gentk.version');

    if (!(gentkVersion in GENTK_VERSION_TO_FA2_CONTRACT_MAPPING)) {
      throw new Error(`unsupported gentk version: ${gentkVersion}`);
    }

    const fa2Address = GENTK_VERSION_TO_FA2_CONTRACT_MAPPING[gentkVersion];
    const id = createEventId(EVENT_TYPE_FX_OFFER_ACCEPT_V3, transaction);

    const event: FxOfferAcceptV3Event = {
      id,
      type: EVENT_TYPE_FX_OFFER_ACCEPT_V3,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      price,
      fa2_address: fa2Address,
      token_id: tokenId,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      offer_id: offerId,
    };

    assert(omit(event, ['type', 'implements']), FxOfferAcceptV3EventSchema);

    return event;
  },
};

export default FxOfferAcceptV3Handler;
