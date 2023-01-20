import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { TYPED_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_TYPED_CANCEL_SWAP = 'TYPED_CANCEL_SWAP';

export interface TypedCancelSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_TYPED_CANCEL_SWAP;
  swap_id: string;
  seller_address: string;
  artist_address: string;
}

const TypedCancelSwapEventSchema: Describe<Omit<TypedCancelSwapEvent, 'type'>> = object({
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

const TypedCancelSwapHandler: TransactionHandler<TypedCancelSwapEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_TYPED_CANCEL_SWAP,

  description: `A swap was canceled on typed (marketplace contract: KT1VoZeuBMJF6vxtLqEFMoc4no5VDG789D7z).`,

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_swap',
        target_address: TYPED_CONTRACT_MARKETPLACE,
      })
    ) {
      return false;
    }

    return !!findDiff(transaction.diffs!, 196868, 'swaps', 'remove_key', get(transaction, 'parameter.value'));
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 196868, 'swaps', 'remove_key', swapId);
    const tokenId = get(diff, 'content.value.objkt_id');
    const sellerAddress = get(diff, 'content.value.issuer');
    const artistAddress = get(diff, 'content.value.creator');
    const fa2Address = get(diff, 'content.value.fa2');
    const id = createEventId(EVENT_TYPE_TYPED_CANCEL_SWAP, transaction);

    const event: TypedCancelSwapEvent = {
      id,
      type: EVENT_TYPE_TYPED_CANCEL_SWAP,
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

    assert(omit(event, ['type']), TypedCancelSwapEventSchema);

    return event;
  },
};

export default TypedCancelSwapHandler;
