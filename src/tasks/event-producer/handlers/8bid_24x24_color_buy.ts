import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import logger from '../../../lib/logger';
import { EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_8BID_24X24_COLOR_BUY = '8BID_24X24_COLOR_BUY';

export interface EightbidBuy24x24ColorEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8BID_24X24_COLOR_BUY;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
}

const EightbidBuy24x24ColorEventSchema: Describe<Omit<EightbidBuy24x24ColorEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: TezosAddress,
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
});

const EightbidBuy24x24ColorHandler: Handler<Transaction, EightbidBuy24x24ColorEvent> = {
  type: EVENT_TYPE_8BID_24X24_COLOR_BUY,

  accept: {
    entrypoint: 'buy',
    target_address: EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value.swap_id');
    const amount = parseInt(get(transaction, 'parameter.value.nft_amount'), 10);
    const buyerAddress = get(transaction, 'sender.address');
    const diff = findDiff(get(transaction, 'diffs')!, 143421, 'swap_list', ['update_key'], swapId);
    const fa2Address = get(diff, 'content.value.nft_contract_address');
    const tokenId = get(diff, 'content.value.nft_id');
    const sellerAddress = get(diff, 'content.value.seller');
    const artistAddress = get(diff, 'content.value.creator');
    const price = get(diff, 'content.value.payment');
    const events: Array<EightbidBuy24x24ColorEvent> = [];

    for (let i = 0; i < amount; i++) {
      try {
        const id = createEventId(EVENT_TYPE_8BID_24X24_COLOR_BUY, transaction, i);

        const event: EightbidBuy24x24ColorEvent = {
          id,
          type: EVENT_TYPE_8BID_24X24_COLOR_BUY,
          opid: String(transaction.id),
          ophash: transaction.hash,
          timestamp: transaction.timestamp,
          level: transaction.level,
          fa2_address: fa2Address,
          token_id: tokenId,

          implements: SALE_INTERFACE,
          seller_address: sellerAddress,
          buyer_address: buyerAddress,
          artist_address: artistAddress,
          swap_id: swapId,
          price: price,
        };

        assert(omit(event, ['type', 'implements']), EightbidBuy24x24ColorEventSchema);

        events.push(event);
      } catch (err) {
        logger.error(`handler "${EVENT_TYPE_8BID_24X24_COLOR_BUY}" failed to create event: ${(err as Error).message}`);
      }
    }

    return events;
  },
};

export default EightbidBuy24x24ColorHandler;
