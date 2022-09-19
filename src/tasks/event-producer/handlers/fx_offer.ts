import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_FX_OFFER = 'FX_OFFER';

export interface FxOfferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FX_OFFER;
  offer_id: string;
  seller_address: string;
  artist_address: string;
  royalties: string;
  price: string;
}

const FxOfferEventSchema: Describe<Omit<FxOfferEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  offer_id: PgBigInt,
  royalties: PgBigInt,
  price: PgBigInt,
});

const FxOfferHandler: Handler<Transaction, FxOfferEvent> = {
  type: EVENT_TYPE_FX_OFFER,

  accept: {
    entrypoint: 'offer',
    target_address: FX_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const royalties = get(transaction, 'parameter.value.royalties');
    const price = get(transaction, 'parameter.value.price');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const artistAddress = get(transaction, 'parameter.value.creator');
    const sellerAddress = get(transaction, 'sender.address');

    const offerId = String(parseInt(get(transaction, 'storage.counter'), 10) - 1);
    const fa2Address = get(transaction, 'storage.objkts');
    const id = createEventId(EVENT_TYPE_FX_OFFER, transaction);

    const event: FxOfferEvent = {
      id,
      type: EVENT_TYPE_FX_OFFER,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      offer_id: offerId,
      artist_address: artistAddress,
      seller_address: sellerAddress,
      royalties: royalties,
      price,
    };

    assert(omit(event, ['type']), FxOfferEventSchema);

    return event;
  },
};

export default FxOfferHandler;
