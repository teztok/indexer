import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, is } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { ObjktcomOpenEditionArtistContractSchema } from '../../../lib/schemas';
import { createEventId } from '../../../lib/utils';
import { SALE_INTERFACE } from '../../../consts';
import { tokenSaleEventFields } from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_CLAIM = 'OBJKT_CLAIM';

export interface ObjktClaimEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_CLAIM;
  implements: SaleEventInterface;
  seller_address: string;
  buyer_address: string;
  price: string;
}

const ObjktClaimEventSchema: Describe<Omit<ObjktClaimEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  price: PgBigInt,
});

const ObjktClaimHandler: TransactionHandler<ObjktClaimEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_CLAIM,

  meta: {
    eventDescription: `An open edition was bought/claimed on objkt.com.`,
    eventFields: [...tokenSaleEventFields],
  },

  accept: (transaction) => {
    if (
      get(transaction, 'parameter.entrypoint') !== 'claim' ||
      !get(transaction, 'parameter.value.amount') ||
      !get(transaction, 'parameter.value.token_id')
    ) {
      return false;
    }

    return is(get(transaction, 'storage'), ObjktcomOpenEditionArtistContractSchema);
  },

  exec: (transaction) => {
    const totalPrice = get(transaction, 'amount');
    const fa2Address = get(transaction, 'target.address');
    const buyerAddress = get(transaction, 'sender.address');
    const tokenId = get(transaction, 'parameter.value.token_id');
    const amount = parseInt(get(transaction, 'parameter.value.amount'), 10);
    const sellerAddress = get(transaction, 'storage.administrator');
    const price = (totalPrice / amount).toFixed();
    const events: Array<ObjktClaimEvent> = [];

    for (let i = 0; i < amount; i++) {
      const id = createEventId(EVENT_TYPE_OBJKT_CLAIM, transaction, i);

      const event: ObjktClaimEvent = {
        id,
        type: EVENT_TYPE_OBJKT_CLAIM,
        implements: SALE_INTERFACE,
        opid: String(transaction.id),
        ophash: transaction.hash,
        level: transaction.level,
        timestamp: transaction.timestamp,
        price,
        fa2_address: fa2Address,
        token_id: tokenId,
        buyer_address: buyerAddress,
        seller_address: sellerAddress,
      };

      assert(omit(event, ['type', 'implements']), ObjktClaimEventSchema);

      events.push(event);
    }

    return events;
  },
};

export default ObjktClaimHandler;
