import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { findDiff, createEventId, extractObjktCurrency, isTezLikeCurrencyStrict } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE_V3, SALE_INTERFACE } from '../../../consts';
import { tokenSaleEventFields, offerIdField, artistAddressField } from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_FULFILL_OFFER_V3 = 'OBJKT_FULFILL_OFFER_V3';

export interface ObjktFulfillOfferV3Event extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_FULFILL_OFFER_V3;
  implements: SaleEventInterface;
  offer_id: string;
  seller_address: string;
  buyer_address: string;
  artist_address?: string;
  price: string;
}

const ObjktFulfillOfferEventSchema: Describe<Omit<ObjktFulfillOfferV3Event, 'type' | 'implements'>> = object({
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
});

const ObjktFulfillOfferHandler: TransactionHandler<ObjktFulfillOfferV3Event> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_FULFILL_OFFER_V3,

  meta: {
    eventDescription: `An offer was fulfilled on objkt.com (marketplace contract: KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4).`,
    eventFields: [...tokenSaleEventFields, offerIdField, artistAddressField],
  },

  accept: {
    entrypoint: 'fulfill_offer',
    target_address: OBJKT_CONTRACT_MARKETPLACE_V3,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value.offer_id');
    const sellerAddress = get(transaction, 'sender.address');
    const diff = findDiff(get(transaction, 'diffs')!, 574015, 'offers', ['remove_key', 'update_key'], offerId);
    const fa2Address = get(diff, 'content.value.token.address');
    const price = get(diff, 'content.value.amount');
    const tokenId = get(diff, 'content.value.token.token_id') || get(transaction, 'parameter.value.token_id');
    const buyerAddress = get(diff, 'content.value.creator');
    //const artistAddress = get(diff, 'content.value.artist');
    const id = createEventId(EVENT_TYPE_OBJKT_FULFILL_OFFER_V3, transaction);

    const currency = extractObjktCurrency(get(diff, 'content.value.currency'));

    if (!isTezLikeCurrencyStrict(currency)) {
      throw new Error(`unsupported currency`);
    }

    const event: ObjktFulfillOfferV3Event = {
      id,
      type: EVENT_TYPE_OBJKT_FULFILL_OFFER_V3,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      price,
      fa2_address: fa2Address,
      token_id: tokenId,
      //artist_address: artistAddress,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      offer_id: offerId,
    };

    assert(omit(event, ['type', 'implements']), ObjktFulfillOfferEventSchema);

    return event;
  },
};

export default ObjktFulfillOfferHandler;
