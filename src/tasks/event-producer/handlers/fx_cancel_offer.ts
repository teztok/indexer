import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE } from '../../../consts';
import { tokenEventFields, sellerAddressField, artistAddressField, offerIdField } from '../event-fields-meta';

export const EVENT_TYPE_FX_CANCEL_OFFER = 'FX_CANCEL_OFFER';

export interface FxCancelOfferEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FX_CANCEL_OFFER;
  offer_id: string;
  seller_address: string;
  artist_address: string;
}

const FxCancelOfferEventSchema: Describe<Omit<FxCancelOfferEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  token_id: string(),
  ophash: string(),
  offer_id: PgBigInt,
});

const FxCancelOfferHandler: TransactionHandler<FxCancelOfferEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_CANCEL_OFFER,

  meta: {
    eventDescription: `An offer was canceled on fxhash. In this case, the offer is like a swap or an ask. (marketplace contract: KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9).`,
    eventFields: [...tokenEventFields, sellerAddressField, artistAddressField, offerIdField],
  },

  accept: {
    entrypoint: 'cancel_offer',
    target_address: FX_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const offerId = get(transaction, 'parameter.value');
    const fa2Address = get(transaction, 'storage.objkts');
    const diff = findDiff(transaction.diffs!, 22799, 'offers', 'remove_key', offerId);
    const tokenId = get(diff, 'content.value.objkt_id');
    const sellerAddress = get(diff, 'content.value.issuer');
    const artistAddress = get(diff, 'content.value.creator');
    const id = createEventId(EVENT_TYPE_FX_CANCEL_OFFER, transaction);

    const event: FxCancelOfferEvent = {
      id,
      type: EVENT_TYPE_FX_CANCEL_OFFER,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      token_id: tokenId,
      offer_id: offerId,
    };

    assert(omit(event, ['type']), FxCancelOfferEventSchema);

    return event;
  },
};

export default FxCancelOfferHandler;
