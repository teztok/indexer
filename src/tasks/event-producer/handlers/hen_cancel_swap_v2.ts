import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { HEN_CONTRACT_MARKETPLACE_V2 } from '../../../consts';

export const EVENT_TYPE_HEN_CANCEL_SWAP_V2 = 'HEN_CANCEL_SWAP_V2';

export interface HenCancelSwapV2Event extends TokenEvent {
  type: typeof EVENT_TYPE_HEN_CANCEL_SWAP_V2;
  swap_id: string;
  seller_address: string;
  artist_address: string;
}

const HenCancelSwapEventSchema: Describe<Omit<HenCancelSwapV2Event, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  seller_address: TezosAddress,
  artist_address: TezosAddress,
  swap_id: PgBigInt,
});

const HenCancelSwapHandler: Handler<Transaction, HenCancelSwapV2Event> = {
  type: EVENT_TYPE_HEN_CANCEL_SWAP_V2,

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_swap',
        target_address: HEN_CONTRACT_MARKETPLACE_V2,
      })
    ) {
      return false;
    }

    return !!findDiff(transaction.diffs!, 6072, 'swaps', 'remove_key', get(transaction, 'parameter.value'));
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const fa2Address = get(transaction, 'storage.objkt');
    const diff = findDiff(transaction.diffs!, 6072, 'swaps', 'remove_key', swapId);
    const tokenId = get(diff, 'content.value.objkt_id');
    const sellerAddress = get(diff, 'content.value.issuer');
    const artistAddress = get(diff, 'content.value.creator');
    const id = createEventId(EVENT_TYPE_HEN_CANCEL_SWAP_V2, transaction);

    const event: HenCancelSwapV2Event = {
      id,
      type: EVENT_TYPE_HEN_CANCEL_SWAP_V2,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      token_id: tokenId,
      swap_id: swapId,
    };

    assert(omit(event, ['type']), HenCancelSwapEventSchema);

    return event;
  },
};

export default HenCancelSwapHandler;
