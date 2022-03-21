import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { HEN_CONTRACT_MARKETPLACE_V2, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_HEN_COLLECT_V2 = 'HEN_COLLECT_V2';

export interface HenCollectV2Event extends TokenEvent {
  type: typeof EVENT_TYPE_HEN_COLLECT_V2;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
}

const HenCollectEventSchema: Describe<Omit<HenCollectV2Event, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
});

const HenMintHandler: Handler<Transaction, HenCollectV2Event> = {
  type: EVENT_TYPE_HEN_COLLECT_V2,

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'collect',
        target_address: HEN_CONTRACT_MARKETPLACE_V2,
      })
    ) {
      return false;
    }

    return !!findDiff(transaction.diffs!, 6072, 'swaps', ['update_key', 'remove_key'], get(transaction, 'parameter.value'));
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const buyerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'storage.objkt');
    const diff = findDiff(transaction.diffs!, 6072, 'swaps', ['update_key', 'remove_key'], swapId);
    const artistAddress = get(diff, 'content.value.creator');
    const sellerAddress = get(diff, 'content.value.issuer');
    const tokenId = get(diff, 'content.value.objkt_id');
    const price = get(diff, 'content.value.xtz_per_objkt');
    const id = createEventId(EVENT_TYPE_HEN_COLLECT_V2, transaction.id);

    const event: HenCollectV2Event = {
      id,
      type: EVENT_TYPE_HEN_COLLECT_V2,
      implements: SALE_INTERFACE,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      swap_id: swapId,
      price: price,
    };

    assert(omit(event, ['type', 'implements']), HenCollectEventSchema);

    return event;
  },
};

export default HenMintHandler;
