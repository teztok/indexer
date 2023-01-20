import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { VERSUM_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_VERSUM_MAKE_OFFER = 'VERSUM_MAKE_OFFER';

export interface VersumMakeOfferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_MAKE_OFFER;
  offer_id: string;
  buyer_address: string;
  artist_address?: string;
  price: string;
  amount: string;
}

const VersumMakeOfferEventSchema: Describe<Omit<VersumMakeOfferEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  offer_id: PgBigInt,
  buyer_address: TezosAddress,
  artist_address: optional(TezosAddress),
  price: PgBigInt,
  amount: PgBigInt,
});

const VersumMakeOfferHandler: TransactionHandler<VersumMakeOfferEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_VERSUM_MAKE_OFFER,

  description: `An offer was created on versum (marketplace contract: KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5).`,

  accept: {
    entrypoint: 'make_offer',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'parameter.value.token.address');
    const tokenId = get(transaction, 'parameter.value.token.nat');
    const amount = get(transaction, 'parameter.value.token_amount');
    const offerId = String(parseInt(get(transaction, 'storage.offer_counter'), 10) - 1);
    const buyerAddress = get(transaction, 'sender.address');
    const price = String(get(transaction, 'amount'));
    const id = createEventId(EVENT_TYPE_VERSUM_MAKE_OFFER, transaction);

    const event: VersumMakeOfferEvent = {
      id,
      type: EVENT_TYPE_VERSUM_MAKE_OFFER,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      offer_id: offerId,
      buyer_address: buyerAddress,
      price: price,
      amount,
    };

    assert(omit(event, ['type']), VersumMakeOfferEventSchema);

    return event;
  },
};

export default VersumMakeOfferHandler;
