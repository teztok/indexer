import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, Describe, string } from 'superstruct';
import { TezosAddress, PgBigInt, IsoDateString, PositiveInteger, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { HEN_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_HEN_COLLECT = 'HEN_COLLECT';

export interface HenCollectEvent extends TokenEvent {
  type: typeof EVENT_TYPE_HEN_COLLECT;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  swap_id: string;
  amount: string;
  price: string;
}

const HenCollectEventSchema: Describe<Omit<HenCollectEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),

  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
  amount: PgBigInt,
});

const HenMintHandler: Handler<Transaction, HenCollectEvent> = {
  type: EVENT_TYPE_HEN_COLLECT,

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'collect',
        target_address: HEN_CONTRACT_MARKETPLACE,
      })
    ) {
      return false;
    }

    return !!findDiff(transaction.diffs!, 523, 'swaps', ['update_key', 'remove_key'], get(transaction, 'parameter.value.swap_id'));
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value.swap_id');
    const buyerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'storage.objkt');
    const diff = findDiff(transaction.diffs!, 523, 'swaps', ['update_key', 'remove_key'], swapId);
    const tokenId = get(diff, 'content.value.objkt_id');
    const price = get(diff, 'content.value.xtz_per_objkt');
    const sellerAddress = get(diff, 'content.value.issuer');
    const amount = get(transaction, 'parameter.value.objkt_amount');
    const id = createEventId(EVENT_TYPE_HEN_COLLECT, transaction.id);

    const event: HenCollectEvent = {
      id,
      type: EVENT_TYPE_HEN_COLLECT,
      implements: SALE_INTERFACE,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      swap_id: swapId,
      amount: amount,
      price: price,
    };

    assert(omit(event, ['type', 'implements']), HenCollectEventSchema);

    return event;
  },
};

export default HenMintHandler;
