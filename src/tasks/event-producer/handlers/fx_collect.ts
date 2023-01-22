import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';
import { tokenSaleEventFields, offerIdField, artistAddressField, sellerAddressField } from '../event-fields-meta';

export const EVENT_TYPE_FX_COLLECT = 'FX_COLLECT';
export interface FxCollectEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FX_COLLECT;
  implements: SaleEventInterface;
  offer_id: string;
  price: string;
  buyer_address: string;
  seller_address: string;
  artist_address: string;
}

const FxCollectEventSchema: Describe<Omit<FxCollectEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  offer_id: PgBigInt,
  price: PgBigInt,
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  artist_address: TezosAddress,
});

const FxCollectHandler: TransactionHandler<FxCollectEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_COLLECT,

  meta: {
    eventDescription: `A token was collected on fxhash (marketplace contract: KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9).`,
    eventFields: [...tokenSaleEventFields, offerIdField, artistAddressField, sellerAddressField],
  },

  accept: {
    entrypoint: 'collect',
    target_address: FX_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 22799, 'offers', ['update_key'], offerId);
    const tokenId = get(diff, 'content.value.objkt_id');
    const artistAddress = get(diff, 'content.value.creator');
    const sellerAddress = get(diff, 'content.value.issuer');
    const buyerAddress = get(transaction, 'sender.address');
    const price = get(diff, 'content.value.price');
    const fa2Address = get(transaction, 'storage.objkts');
    const id = createEventId(EVENT_TYPE_FX_COLLECT, transaction);

    const event: FxCollectEvent = {
      id,
      type: EVENT_TYPE_FX_COLLECT,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      offer_id: offerId,
      artist_address: artistAddress,
      seller_address: sellerAddress,
      buyer_address: buyerAddress,
      price,
    };

    assert(omit(event, ['type', 'implements']), FxCollectEventSchema);

    return event;
  },
};

export default FxCollectHandler;
