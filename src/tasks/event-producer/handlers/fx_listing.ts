import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE_V3, GENTK_VERSION_TO_FA2_CONTRACT_MAPPING } from '../../../consts';

export const EVENT_TYPE_FX_LISTING = 'FX_LISTING';

export interface FxListingEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FX_LISTING;
  swap_id: string;
  seller_address: string;
  price: string;
}

const FxListingEventSchema: Describe<Omit<FxListingEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
});

const FxOfferHandler: TransactionHandler<FxListingEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_LISTING,

  accept: {
    entrypoint: 'listing',
    target_address: FX_CONTRACT_MARKETPLACE_V3,
  },

  exec: (transaction) => {
    const price = get(transaction, 'parameter.value.price');
    const tokenId = get(transaction, 'parameter.value.gentk.id');
    const sellerAddress = get(transaction, 'sender.address');
    const gentkVersion = get(transaction, 'parameter.value.gentk.version');

    if (!(gentkVersion in GENTK_VERSION_TO_FA2_CONTRACT_MAPPING)) {
      throw new Error(`unsupported gentk version: ${gentkVersion}`);
    }

    const fa2Address = GENTK_VERSION_TO_FA2_CONTRACT_MAPPING[gentkVersion];
    const swapId = String(parseInt(get(transaction, 'storage.listings_count'), 10) - 1);
    const id = createEventId(EVENT_TYPE_FX_LISTING, transaction);

    const event: FxListingEvent = {
      id,
      type: EVENT_TYPE_FX_LISTING,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      swap_id: swapId,
      seller_address: sellerAddress,
      price,
    };

    assert(omit(event, ['type']), FxListingEventSchema);

    return event;
  },
};

export default FxOfferHandler;
