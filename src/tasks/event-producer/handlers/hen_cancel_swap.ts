import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { IsoDateString, PositiveInteger, ContractAddress, TezosAddress, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { HEN_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_HEN_CANCEL_SWAP = 'HEN_CANCEL_SWAP';

export interface HenCancelSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_HEN_CANCEL_SWAP;
  swap_id: string;
  seller_address: string;
}

const HenSwapEventSchema: Describe<Omit<HenCancelSwapEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  seller_address: TezosAddress,
  token_id: string(),
  ophash: string(),
  swap_id: PgBigInt,
});

const HenSwapHandler: Handler<Transaction, HenCancelSwapEvent> = {
  type: EVENT_TYPE_HEN_CANCEL_SWAP,

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_swap',
        target_address: HEN_CONTRACT_MARKETPLACE,
      })
    ) {
      return false;
    }

    return !!findDiff(transaction.diffs!, 523, 'swaps', 'remove_key', get(transaction, 'parameter.value'));
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const fa2Address = get(transaction, 'storage.objkt');
    const diff = findDiff(transaction.diffs!, 523, 'swaps', 'remove_key', swapId);
    const tokenId = get(diff, 'content.value.objkt_id');
    const sellerAddress = get(diff, 'content.value.issuer');
    const id = createEventId(EVENT_TYPE_HEN_CANCEL_SWAP, transaction.id);

    const event: HenCancelSwapEvent = {
      id,
      type: EVENT_TYPE_HEN_CANCEL_SWAP,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: sellerAddress,
      token_id: tokenId,
      swap_id: swapId,
    };

    assert(omit(event, ['type']), HenSwapEventSchema);

    return event;
  },
};

export default HenSwapHandler;
