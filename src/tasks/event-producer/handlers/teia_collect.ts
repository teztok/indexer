import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import { TEIA_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';
import { tokenSaleEventFields, artistAddressField, swapIdField } from '../event-fields-meta';

export const EVENT_TYPE_TEIA_COLLECT = 'TEIA_COLLECT';

export interface TeiaCollectEvent extends TokenEvent {
  type: typeof EVENT_TYPE_TEIA_COLLECT;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
}

const TeiaCollectEventSchema: Describe<Omit<TeiaCollectEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
});

const TeiaCollectHandler: TransactionHandler<TeiaCollectEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_TEIA_COLLECT,

  meta: {
    eventDescription: `A token was collected on the Teia marketplace contract (marketplace contract: KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w).`,
    eventFields: [...tokenSaleEventFields, artistAddressField, swapIdField],
  },

  accept: (transaction) => {
    if (
      !transactionMatchesPattern(transaction, {
        entrypoint: 'collect',
        target_address: TEIA_CONTRACT_MARKETPLACE,
      })
    ) {
      return false;
    }

    return !!findDiff(transaction.diffs!, 90366, 'swaps', ['update_key', 'remove_key'], get(transaction, 'parameter.value'));
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const buyerAddress = get(transaction, 'sender.address');
    const diff = findDiff(transaction.diffs!, 90366, 'swaps', ['update_key', 'remove_key'], swapId);
    const artistAddress = get(diff, 'content.value.creator');
    const fa2Address = get(diff, 'content.value.fa2');
    const sellerAddress = get(diff, 'content.value.issuer');
    const tokenId = get(diff, 'content.value.objkt_id');
    const price = get(diff, 'content.value.xtz_per_objkt');
    const id = createEventId(EVENT_TYPE_TEIA_COLLECT, transaction);

    const event: TeiaCollectEvent = {
      id,
      type: EVENT_TYPE_TEIA_COLLECT,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
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

    assert(omit(event, ['type', 'implements']), TeiaCollectEventSchema);

    return event;
  },
};

export default TeiaCollectHandler;
