import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { VERSUM_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_VERSUM_CANCEL_OFFER = 'VERSUM_CANCEL_OFFER';

export interface VersumCancelOfferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_CANCEL_OFFER;
  offer_id: string;
  buyer_address: string;
  artist_address?: string;
  amount: string;
  price: string;
}

const VersumCancelOfferEventSchema: Describe<Omit<VersumCancelOfferEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  ophash: string(),
  buyer_address: TezosAddress,
  artist_address: optional(TezosAddress),
  token_id: string(),
  offer_id: PgBigInt,
  amount: PgBigInt,
  price: PgBigInt,
});

const VersumCancelOfferHandler: TransactionHandler<VersumCancelOfferEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_VERSUM_CANCEL_OFFER,

  description: `An offer was canceled on versum (marketplace contract: KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5).`,

  accept: {
    entrypoint: 'cancel_offer',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 75633, 'offers', 'remove_key', offerId);
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.nat');
    const buyerAddress = get(diff, 'content.value.buyer');
    const amount = get(diff, 'content.value.token_amount');
    const price = get(diff, 'content.value.price_in_nat');
    const id = createEventId(EVENT_TYPE_VERSUM_CANCEL_OFFER, transaction);

    const event: VersumCancelOfferEvent = {
      id,
      type: EVENT_TYPE_VERSUM_CANCEL_OFFER,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      buyer_address: buyerAddress,
      token_id: tokenId,
      offer_id: offerId,
      amount,
      price,
    };

    assert(omit(event, ['type']), VersumCancelOfferEventSchema);

    return event;
  },
};

export default VersumCancelOfferHandler;
