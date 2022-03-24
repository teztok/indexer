import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { EIGHTBIDOU_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_8BID_CANCEL_SWAP = '8BID_CANCEL_SWAP';

export interface EightbidCancelSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8BID_CANCEL_SWAP;
  swap_id: string;
  seller_address: string;
  artist_address: string;
}

const HenCancelSwapEventSchema: Describe<Omit<EightbidCancelSwapEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),

  seller_address: TezosAddress,
  artist_address: TezosAddress,
  swap_id: PgBigInt,
});

const EightbidCancelSwapHandler: Handler<Transaction, EightbidCancelSwapEvent> = {
  type: EVENT_TYPE_8BID_CANCEL_SWAP,

  accept: {
    entrypoint: 'cancelswap',
    target_address: EIGHTBIDOU_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const diff = findDiff(transaction.diffs!, 113273, 'swap_list', 'update_key', swapId);
    const fa2Address = get(diff, 'content.value.nft_contract_address');
    const tokenId = get(diff, 'content.value.nft_id');
    const sellerAddress = get(diff, 'content.value.seller');
    const artistAddress = get(diff, 'content.value.creator');
    const id = createEventId(EVENT_TYPE_8BID_CANCEL_SWAP, transaction.id);

    const event: EightbidCancelSwapEvent = {
      id,
      type: EVENT_TYPE_8BID_CANCEL_SWAP,
      opid: transaction.id,
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

export default EightbidCancelSwapHandler;
