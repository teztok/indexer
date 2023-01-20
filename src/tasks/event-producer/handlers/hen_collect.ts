import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, Describe, string } from 'superstruct';
import { TezosAddress, PgBigInt, IsoDateString, PositiveInteger, ContractAddress } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { findDiff, transactionMatchesPattern, createEventId } from '../../../lib/utils';
import logger from '../../../lib/logger';
import { HEN_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_HEN_COLLECT = 'HEN_COLLECT';

export interface HenCollectEvent extends TokenEvent {
  type: typeof EVENT_TYPE_HEN_COLLECT;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  swap_id: string;
  price: string;
}

const HenCollectEventSchema: Describe<Omit<HenCollectEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
});

const HenMintHandler: TransactionHandler<HenCollectEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_HEN_COLLECT,

  description: `A token was collected on the first version of the hic et nunc marketplace contract (marketplace contract: KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9).`,

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
    const amount = parseInt(get(transaction, 'parameter.value.objkt_amount'));
    const events: Array<HenCollectEvent> = [];

    for (let i = 0; i < amount; i++) {
      try {
        const id = createEventId(EVENT_TYPE_HEN_COLLECT, transaction, i);

        const event: HenCollectEvent = {
          id,
          type: EVENT_TYPE_HEN_COLLECT,
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
        };

        assert(omit(event, ['type', 'implements']), HenCollectEventSchema);

        events.push(event);
      } catch (err) {
        logger.error(`handler "${EVENT_TYPE_HEN_COLLECT}" failed to create event: ${(err as Error).message}`);
      }
    }

    return events;
  },
};

export default HenMintHandler;
