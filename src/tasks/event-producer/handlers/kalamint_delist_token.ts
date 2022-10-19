import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { KALAMINT_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_KALAMINT_DELIST_TOKEN = 'KALAMINT_DELIST_TOKEN';

export interface KalamintDelistTokenEvent extends TokenEvent {
  type: typeof EVENT_TYPE_KALAMINT_DELIST_TOKEN;
  seller_address: string;
}

const KalamintDelistTokenEventSchema: Describe<Omit<KalamintDelistTokenEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  seller_address: TezosAddress,
});

const KalamintDelistTokenHandler: Handler<Transaction, KalamintDelistTokenEvent> = {
  type: EVENT_TYPE_KALAMINT_DELIST_TOKEN,

  accept: {
    entrypoint: 'delist_token',
    target_address: KALAMINT_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const tokenId = get(transaction, 'parameter.value');
    const fa2Address = get(transaction, 'target.address');
    const sellerAddress = get(transaction, 'sender.address');
    const id = createEventId(EVENT_TYPE_KALAMINT_DELIST_TOKEN, transaction);

    const event: KalamintDelistTokenEvent = {
      id,
      type: EVENT_TYPE_KALAMINT_DELIST_TOKEN,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: sellerAddress,
      token_id: tokenId,
    };

    assert(omit(event, ['type']), KalamintDelistTokenEventSchema);

    return event;
  },
};

export default KalamintDelistTokenHandler;
