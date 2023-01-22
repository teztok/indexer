import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { KALAMINT_CONTRACT_FA2 } from '../../../consts';
import { tokenEventFields, sellerAddressField, priceField } from '../event-fields-meta';

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

const KalamintListTokenHandler: TransactionHandler<KalamintListTokenEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_KALAMINT_LIST_TOKEN,

  meta: {
    eventDescription: `A token was listed for sale on Kalamint.`,
    eventFields: [...tokenEventFields, sellerAddressField, priceField],
  },

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
