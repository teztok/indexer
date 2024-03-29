import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { EIGHTSCRIBO_CONTRACT_MARKETPLACE } from '../../../consts';
import { tokenEventFields, sellerAddressField, artistAddressField, swapIdField } from '../event-fields-meta';

export const EVENT_TYPE_8SCRIBO_CANCEL_SWAP = '8SCRIBO_CANCEL_SWAP';

export interface EightscriboCancelSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8SCRIBO_CANCEL_SWAP;
  swap_id: string;
  seller_address: string;
  artist_address: string;
}

const EightscriboCancelSwapEventSchema: Describe<Omit<EightscriboCancelSwapEvent, 'type'>> = object({
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

const EightscriboCancelSwapHandler: TransactionHandler<EightscriboCancelSwapEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_8SCRIBO_CANCEL_SWAP,

  meta: {
    eventDescription: `A swap was canceled on 8SCRIBO.`,
    eventFields: [...tokenEventFields, sellerAddressField, artistAddressField, swapIdField],
  },

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'cancel_swap',
        target_address: EIGHTSCRIBO_CONTRACT_MARKETPLACE,
      })
    ) {
      return false;
    }

    return !!findDiff(transaction.diffs!, 226249, 'swaps', 'remove_key', get(transaction, 'parameter.value'));
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 226249, 'swaps', 'remove_key', swapId);
    const tokenId = get(diff, 'content.value.objkt_id');
    const sellerAddress = get(diff, 'content.value.issuer');
    const artistAddress = get(diff, 'content.value.creator');
    const fa2Address = get(diff, 'content.value.fa2');
    const id = createEventId(EVENT_TYPE_8SCRIBO_CANCEL_SWAP, transaction);

    const event: EightscriboCancelSwapEvent = {
      id,
      type: EVENT_TYPE_8SCRIBO_CANCEL_SWAP,
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

    assert(omit(event, ['type']), EightscriboCancelSwapEventSchema);

    return event;
  },
};

export default EightscriboCancelSwapHandler;
