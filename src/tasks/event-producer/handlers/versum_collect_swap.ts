import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';
import { assert, object, string, optional, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction, MintEvent, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import * as eventsDao from '../../../lib/daos/events';
import { VERSUM_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';
import { EVENT_TYPE_VERSUM_MINT } from './versum_mint';

export const EVENT_TYPE_VERSUM_COLLECT_SWAP = 'VERSUM_COLLECT_SWAP';

export interface VersumCollectEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_COLLECT_SWAP;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  artist_address?: string;
  swap_id: string;
  price: string;
  amount: string;
}

const VersumCollectEventSchema: Describe<Omit<VersumCollectEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  artist_address: optional(TezosAddress),
  swap_id: PgBigInt,
  price: PgBigInt,
  amount: PgBigInt,
});

const VersumCollectSwapHandler: TransactionHandler<VersumCollectEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_VERSUM_COLLECT_SWAP,

  description: `A token was collected on versum (marketplace contract: KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5).`,

  accept: {
    entrypoint: 'collect_swap',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value.swap_id');
    const amount = get(transaction, 'parameter.value.amount');
    const price = String(get(transaction, 'amount'));
    const buyerAddress = get(transaction, 'sender.address');
    const diff = findDiff(transaction.diffs!, 75634, 'swaps', ['update_key', 'remove_key'], swapId);
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.nat');
    const sellerAddress = get(diff, 'content.value.seller');
    const id = createEventId(EVENT_TYPE_VERSUM_COLLECT_SWAP, transaction);

    const event: VersumCollectEvent = {
      id,
      type: EVENT_TYPE_VERSUM_COLLECT_SWAP,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      swap_id: swapId,
      price: price,
      amount: amount,
    };

    assert(omit(event, ['type', 'implements']), VersumCollectEventSchema);

    return event;
  },
};

export default VersumCollectSwapHandler;
