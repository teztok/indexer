import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE_V3, GENTK_VERSION_TO_FA2_CONTRACT_MAPPING } from '../../../consts';

export const EVENT_TYPE_FX_LISTING_CANCEL = 'FX_LISTING_CANCEL';

export interface FxListingCancelEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FX_LISTING_CANCEL;
  swap_id: string;
  seller_address: string;
}

const FxListingCancelEventSchema: Describe<Omit<FxListingCancelEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  seller_address: TezosAddress,
  token_id: string(),
  ophash: string(),
  swap_id: PgBigInt,
});

const FxListingCancelHandler: TransactionHandler<FxListingCancelEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_LISTING_CANCEL,

  accept: {
    entrypoint: 'listing_cancel',
    target_address: FX_CONTRACT_MARKETPLACE_V3,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 149787, 'listings', 'remove_key', swapId);
    const tokenId = get(diff, 'content.value.gentk.id');
    const gentkVersion = get(diff, 'content.value.gentk.version');

    if (!(gentkVersion in GENTK_VERSION_TO_FA2_CONTRACT_MAPPING)) {
      throw new Error(`unsupported gentk version: ${gentkVersion}`);
    }

    const fa2Address = GENTK_VERSION_TO_FA2_CONTRACT_MAPPING[gentkVersion];
    const sellerAddress = get(diff, 'content.value.seller');
    const id = createEventId(EVENT_TYPE_FX_LISTING_CANCEL, transaction);

    const event: FxListingCancelEvent = {
      id,
      type: EVENT_TYPE_FX_LISTING_CANCEL,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: sellerAddress,
      token_id: tokenId,
      swap_id: swapId,
    };

    assert(omit(event, ['type']), FxListingCancelEventSchema);

    return event;
  },
};

export default FxListingCancelHandler;
