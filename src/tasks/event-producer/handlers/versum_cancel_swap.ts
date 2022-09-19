import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { VERSUM_CONTRACT_MARKETPLACE } from '../../../consts';
import { addArtistAddress } from './versum_collect_swap';

export const EVENT_TYPE_VERSUM_CANCEL_SWAP = 'VERSUM_CANCEL_SWAP';

export interface VersumCancelSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_CANCEL_SWAP;
  swap_id: string;
  seller_address: string;
  artist_address?: string; // TODO: add support
}

const VersumCancelSwapEventSchema: Describe<Omit<VersumCancelSwapEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  ophash: string(),
  seller_address: TezosAddress,
  artist_address: optional(TezosAddress),
  token_id: string(),
  swap_id: PgBigInt,
});

const VersumCancelSwapHandler: Handler<Transaction, VersumCancelSwapEvent> = {
  type: EVENT_TYPE_VERSUM_CANCEL_SWAP,

  accept: {
    entrypoint: 'cancel_swap',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 75634, 'swaps', 'remove_key', swapId);
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.nat');
    const sellerAddress = get(diff, 'content.value.seller');
    const id = createEventId(EVENT_TYPE_VERSUM_CANCEL_SWAP, transaction);

    const event: VersumCancelSwapEvent = {
      id,
      type: EVENT_TYPE_VERSUM_CANCEL_SWAP,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: sellerAddress,
      token_id: tokenId,
      swap_id: swapId,
    };

    assert(omit(event, ['type']), VersumCancelSwapEventSchema);

    return event;
  },

  // postProcess: addArtistAddress,
};

export default VersumCancelSwapHandler;
