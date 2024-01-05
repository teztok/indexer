import get from 'lodash/get';
import omit from 'lodash/omit';
import { optional, assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { TransactionHandler, TokenEvent, RoyaltyShares } from '../../../types';
import { createEventId, extractObjktCurrency, isTezLikeCurrency } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE_V3 } from '../../../consts';
import {
  tokenEventFields,
  askIdField,
  sellerAddressField,
  artistAddressField,
  currencyField,
  priceField,
  amountField,
  endTimeField,
  royaltySharesField,
} from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_ASK_V3 = 'OBJKT_ASK_V3';

export interface ObjktAskV3Event extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_ASK_V3;
  ask_id: string;
  seller_address: string;
  artist_address?: string;
  price: string;
  amount: string;
  currency: string;
  royalty_shares: RoyaltyShares;
  end_time?: string;
}

const ObjktAskV3EventSchema: Describe<Omit<ObjktAskV3Event, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  ask_id: PgBigInt,
  seller_address: TezosAddress,
  artist_address: optional(TezosAddress),
  currency: string(),
  price: PgBigInt,
  amount: PgBigInt,
  royalty_shares: RoyaltySharesSchema,
  end_time: optional(IsoDateString),
});

const ObjktAskHandler: TransactionHandler<ObjktAskV3Event> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_ASK_V3,

  meta: {
    eventDescription: `An ask was created on objkt.com (marketplace contract: KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4).`,
    eventFields: [
      ...tokenEventFields,
      askIdField,
      sellerAddressField,
      artistAddressField,
      currencyField,
      priceField,
      amountField,
      endTimeField,
      royaltySharesField,
    ],
  },

  accept: {
    entrypoint: 'ask',
    target_address: OBJKT_CONTRACT_MARKETPLACE_V3,
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'parameter.value.token.address');
    const tokenId = get(transaction, 'parameter.value.token.token_id');
    const askId = String(parseInt(get(transaction, 'storage.next_ask_id'), 10) - 1);
    const sellerAddress = get(transaction, 'sender.address');
    const amount = get(transaction, 'parameter.value.editions');
    const expiryTime = get(transaction, 'parameter.value.expiry_time');
    const currency = extractObjktCurrency(get(transaction, 'parameter.value.currency'));
    const price = get(transaction, 'parameter.value.amount');
    const id = createEventId(EVENT_TYPE_OBJKT_ASK_V3, transaction);
    const shares: Record<string, string> = get(transaction, 'parameter.value.shares');

    if (!currency || !isTezLikeCurrency(currency)) {
      throw new Error(`unsupported currency`);
    }

    const event: ObjktAskV3Event = {
      id,
      type: EVENT_TYPE_OBJKT_ASK_V3,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      ask_id: askId,
      seller_address: sellerAddress,
      currency,
      price: price,
      amount: amount,
      royalty_shares: {
        decimals: 4,
        shares: shares,
      },
    };

    if (expiryTime) {
      event.end_time = expiryTime;
    }

    assert(omit(event, ['type']), ObjktAskV3EventSchema);

    return event;
  },
};

export default ObjktAskHandler;
