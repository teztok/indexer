import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { KALAMINT_CONTRACT_FA2, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_KALAMINT_BUY = 'KALAMINT_BUY';

export interface KalamintBuyEvent extends TokenEvent {
  type: typeof EVENT_TYPE_KALAMINT_BUY;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  price: string;
}

const KalamintBuyEventSchema: Describe<Omit<KalamintBuyEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  price: PgBigInt,
});

const KalamintBuyHandler: Handler<Transaction, KalamintBuyEvent> = {
  type: EVENT_TYPE_KALAMINT_BUY,

  accept: {
    entrypoint: 'buy',
    target_address: KALAMINT_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const tokenId = get(transaction, 'parameter.value');
    const buyerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'target.address');
    const price = String(get(transaction, 'amount'));

    const sellerDiff = (get(transaction, 'diffs') || []).find((diff) => {
      return (
        get(diff, 'path') === 'ledger' &&
        get(diff, 'action') === 'update_key' &&
        get(diff, 'content.key.nat') === tokenId &&
        get(diff, 'content.value') === '0'
      );
    });

    const sellerAddress = get(sellerDiff, 'content.key.address');
    const id = createEventId(EVENT_TYPE_KALAMINT_BUY, transaction);

    const event: KalamintBuyEvent = {
      id,
      type: EVENT_TYPE_KALAMINT_BUY,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      price: price,
    };

    assert(omit(event, ['type', 'implements']), KalamintBuyEventSchema);

    return event;
  },
};

export default KalamintBuyHandler;
