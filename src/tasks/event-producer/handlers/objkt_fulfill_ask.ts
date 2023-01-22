import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';
import { tokenSaleEventFields, artistAddressField, askIdField } from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_FULFILL_ASK = 'OBJKT_FULFILL_ASK';

export interface ObjktFulfillAskEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_FULFILL_ASK;
  implements: SaleEventInterface;
  ask_id: string;
  seller_address: string;
  buyer_address: string;
  artist_address: string;
  price: string;
}

const ObjktFulfillAskEventSchema: Describe<Omit<ObjktFulfillAskEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  ask_id: PgBigInt,
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  artist_address: TezosAddress,
  price: PgBigInt,
});

const ObjktFulfillAskHandler: TransactionHandler<ObjktFulfillAskEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_FULFILL_ASK,

  meta: {
    eventDescription: `An ask was fulfilled on objkt.com (marketplace contract: KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq).`,
    eventFields: [...tokenSaleEventFields, artistAddressField, askIdField],
  },

  accept: {
    entrypoint: 'fulfill_ask',
    target_address: OBJKT_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const askId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 5909, 'asks', ['remove_key', 'update_key'], askId);
    const price = String(get(transaction, 'amount'));
    const fa2Address = get(diff, 'content.value.fa2');
    const tokenId = get(diff, 'content.value.objkt_id');
    const buyerAddress = get(transaction, 'sender.address');
    const artistAddress = get(diff, 'content.value.artist');
    const sellerAddress = get(diff, 'content.value.issuer');
    const id = createEventId(EVENT_TYPE_OBJKT_FULFILL_ASK, transaction);

    const event: ObjktFulfillAskEvent = {
      id,
      type: EVENT_TYPE_OBJKT_FULFILL_ASK,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      price,
      fa2_address: fa2Address,
      token_id: tokenId,
      artist_address: artistAddress,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      ask_id: askId,
    };

    assert(omit(event, ['type', 'implements']), ObjktFulfillAskEventSchema);

    return event;
  },
};

export default ObjktFulfillAskHandler;
