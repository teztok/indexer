import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { KALAMINT_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_KALAMINT_LIST_TOKEN = 'KALAMINT_LIST_TOKEN';

export interface KalamintListTokenEvent extends TokenEvent {
  type: typeof EVENT_TYPE_KALAMINT_LIST_TOKEN;
  seller_address: string;
  price: string;
}

const KalamintListTokenEventSchema: Describe<Omit<KalamintListTokenEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  price: PgBigInt,
});

const KalamintListTokenHandler: Handler<Transaction, KalamintListTokenEvent> = {
  type: EVENT_TYPE_KALAMINT_LIST_TOKEN,

  accept: {
    entrypoint: 'list_token',
    target_address: KALAMINT_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'target.address');
    const tokenId = get(transaction, 'parameter.value.token_id');
    const price = get(transaction, 'parameter.value.price');
    const id = createEventId(EVENT_TYPE_KALAMINT_LIST_TOKEN, transaction);

    const event: KalamintListTokenEvent = {
      id,
      type: EVENT_TYPE_KALAMINT_LIST_TOKEN,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      price: price,
    };

    assert(omit(event, ['type']), KalamintListTokenEventSchema);

    return event;
  },
};

export default KalamintListTokenHandler;
