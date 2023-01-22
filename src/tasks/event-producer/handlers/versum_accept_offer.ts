import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { VERSUM_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';
import { tokenSaleEventFields, artistAddressField, offerIdField, amountField } from '../event-fields-meta';

export const EVENT_TYPE_VERSUM_ACCEPT_OFFER = 'VERSUM_ACCEPT_OFFER';

export interface VersumAcceptOfferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_ACCEPT_OFFER;
  implements: SaleEventInterface;
  offer_id: string;
  seller_address: string;
  buyer_address: string;
  artist_address?: string;
  price: string;
  amount: string;
}

const VersumAcceptOfferEventSchema: Describe<Omit<VersumAcceptOfferEvent, 'type' | 'implements'>> = object({
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
  artist_address: optional(TezosAddress),
  price: PgBigInt,
  amount: PgBigInt,
});

const VersumAcceptOfferHandler: TransactionHandler<VersumAcceptOfferEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_VERSUM_ACCEPT_OFFER,

  meta: {
    eventDescription: `An offer was accepted on versum (marketplace contract: KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5).`,
    eventFields: [...tokenSaleEventFields, artistAddressField, offerIdField, amountField],
  },

  accept: {
    entrypoint: 'accept_offer',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 75633, 'offers', ['remove_key'], offerId);
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.nat');
    const amount = get(diff, 'content.value.token_amount');
    const price = get(diff, 'content.value.price_in_nat');
    const buyerAddress = get(diff, 'content.value.buyer');
    const sellerAddress = get(transaction, 'sender.address');
    const id = createEventId(EVENT_TYPE_VERSUM_ACCEPT_OFFER, transaction);

    const event: VersumAcceptOfferEvent = {
      id,
      type: EVENT_TYPE_VERSUM_ACCEPT_OFFER,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      offer_id: offerId,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      price: price,
      amount,
    };

    assert(omit(event, ['type', 'implements']), VersumAcceptOfferEventSchema);

    return event;
  },
};

export default VersumAcceptOfferHandler;
