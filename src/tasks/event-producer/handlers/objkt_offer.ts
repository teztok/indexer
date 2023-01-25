import get from 'lodash/get';
import omit from 'lodash/omit';
import { optional, assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, RoyaltyShares } from '../../../types';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { createEventId, transactionMatchesPattern } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE_V2 } from '../../../consts';
import {
  tokenEventFields,
  offerIdField,
  buyerAddressField,
  artistAddressField,
  currencyField,
  priceField,
  endPriceField,
  royaltySharesField,
} from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_OFFER = 'OBJKT_OFFER';

export interface ObjktOfferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_OFFER;
  offer_id: string;
  buyer_address: string;
  artist_address?: string;
  price: string;
  currency: string;
  royalty_shares: RoyaltyShares;
  end_time?: string;
}

const ObjktOfferEventSchema: Describe<Omit<ObjktOfferEvent, 'type'>> = object({
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
  currency: string(),
  price: PgBigInt,
  royalty_shares: RoyaltySharesSchema,
  end_time: optional(IsoDateString),
});

const ObjktAskHandler: TransactionHandler<ObjktOfferEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_OFFER,

  meta: {
    eventDescription: `An offer was created on objkt.com (marketplace contract: KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC).`,
    eventFields: [
      ...tokenEventFields,
      offerIdField,
      buyerAddressField,
      artistAddressField,
      currencyField,
      priceField,
      endPriceField,
      royaltySharesField,
    ],
  },

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'offer',
        target_address: OBJKT_CONTRACT_MARKETPLACE_V2,
      })
    ) {
      return false;
    }

    return !!get(transaction, 'parameter.value.token.token_id');
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'parameter.value.token.address');
    const tokenId = get(transaction, 'parameter.value.token.token_id');
    const offerId = String(parseInt(get(transaction, 'storage.next_offer_id'), 10) - 1);
    const buyerAddress = get(transaction, 'sender.address');
    const expiryTime = get(transaction, 'parameter.value.expiry_time');
    const currency = Object.keys(get(transaction, 'parameter.value.currency'))[0];
    const price = get(transaction, 'parameter.value.amount');
    const id = createEventId(EVENT_TYPE_OBJKT_OFFER, transaction);
    const shares: Array<{ amount: string; recipient: string }> = get(transaction, 'parameter.value.shares');

    const event: ObjktOfferEvent = {
      id,
      type: EVENT_TYPE_OBJKT_OFFER,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      offer_id: offerId,
      buyer_address: buyerAddress,
      currency,
      price: price,
      royalty_shares: {
        decimals: 4,
        shares: (shares || []).reduce<Record<string, string>>((memo, entry) => {
          memo[entry.recipient] = entry.amount;
          return memo;
        }, {}),
      },
    };

    if (expiryTime) {
      event.end_time = expiryTime;
    }

    assert(omit(event, ['type']), ObjktOfferEventSchema);

    return event;
  },
};

export default ObjktAskHandler;
