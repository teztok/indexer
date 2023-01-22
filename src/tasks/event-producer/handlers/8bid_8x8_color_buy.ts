import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import logger from '../../../lib/logger';
import { EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';
import { tokenSaleEventFields, artistAddressField, swapIdField } from '../event-fields-meta';

export const EVENT_TYPE_8BID_8X8_COLOR_BUY = '8BID_8X8_COLOR_BUY';

export interface EightbidBuy8x8ColorEvent extends TokenEvent {
  type: typeof EVENT_TYPE_8BID_8X8_COLOR_BUY;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
}

const EightbidBuy8x8ColorEventSchema: Describe<Omit<EightbidBuy8x8ColorEvent, 'type' | 'implements'>> = object({
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

const EightbidBuy8x8ColorHandler: TransactionHandler<EightbidBuy8x8ColorEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_8BID_8X8_COLOR_BUY,

  meta: {
    eventDescription: `An 8x8 color token was bought on 8bidou.`,
    eventFields: [...tokenSaleEventFields, artistAddressField, swapIdField],
  },

  accept: {
    entrypoint: 'buy',
    target_address: EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value.swap_id');
    const amount = parseInt(get(transaction, 'parameter.value.nft_amount'), 10);
    const buyerAddress = get(transaction, 'sender.address');
    const diff = findDiff(get(transaction, 'diffs')!, 113273, 'swap_list', ['update_key'], swapId);
    const fa2Address = get(diff, 'content.value.nft_contract_address');
    const tokenId = get(diff, 'content.value.nft_id');
    const sellerAddress = get(diff, 'content.value.seller');
    const artistAddress = get(diff, 'content.value.creator');
    const price = get(diff, 'content.value.payment');
    const events: Array<EightbidBuy8x8ColorEvent> = [];

    for (let i = 0; i < amount; i++) {
      try {
        const id = createEventId(EVENT_TYPE_8BID_8X8_COLOR_BUY, transaction, i);

        const event: EightbidBuy8x8ColorEvent = {
          id,
          type: EVENT_TYPE_8BID_8X8_COLOR_BUY,
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

        assert(omit(event, ['type', 'implements']), EightbidBuy8x8ColorEventSchema);

        events.push(event);
      } catch (err) {
        logger.error(`handler "${EVENT_TYPE_8BID_8X8_COLOR_BUY}" failed to create event: ${(err as Error).message}`);
      }
    }

    return events;
  },
};

export default EightbidBuy8x8ColorHandler;
