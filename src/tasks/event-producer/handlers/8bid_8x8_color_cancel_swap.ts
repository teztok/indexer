import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_8BID_8X8_COLOR_CANCEL_SWAP = '8BID_8X8_COLOR_CANCEL_SWAP';

export interface EightbidCancelSwap8x8ColorEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8BID_8X8_COLOR_CANCEL_SWAP;
  swap_id: string;
  seller_address: string;
  artist_address: string;
}

const EightbidCancelSwap8x8ColorSchema: Describe<Omit<EightbidCancelSwap8x8ColorEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  seller_address: TezosAddress,
  artist_address: TezosAddress,
  swap_id: PgBigInt,
});

const EightbidCancelSwap8x8ColorEvent: Handler<Transaction, EightbidCancelSwap8x8ColorEvent> = {
  type: EVENT_TYPE_8BID_8X8_COLOR_CANCEL_SWAP,

  accept: {
    entrypoint: 'cancelswap',
    target_address: EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 113273, 'swap_list', 'update_key', swapId);
    const fa2Address = get(diff, 'content.value.nft_contract_address');
    const tokenId = get(diff, 'content.value.nft_id');
    const sellerAddress = get(diff, 'content.value.seller');
    const artistAddress = get(diff, 'content.value.creator');
    const id = createEventId(EVENT_TYPE_8BID_8X8_COLOR_CANCEL_SWAP, transaction);

    const event: EightbidCancelSwap8x8ColorEvent = {
      id,
      type: EVENT_TYPE_8BID_8X8_COLOR_CANCEL_SWAP,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      token_id: tokenId,
      swap_id: swapId,
    };

    assert(omit(event, ['type']), EightbidCancelSwap8x8ColorSchema);

    return event;
  },
};

export default EightbidCancelSwap8x8ColorEvent;
