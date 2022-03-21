import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_ASK = 'OBJKT_ASK';

export interface ObjktAskEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_ASK;
  ask_id: string;
  seller_address: string;
  artist_address: string;
  royalties: string;
  price: string;
  amount: string;
}

const ObjktAskEventSchema: Describe<Omit<ObjktAskEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ask_id: PgBigInt,
  seller_address: TezosAddress,
  artist_address: TezosAddress,
  royalties: PgBigInt,
  price: PgBigInt,
  amount: PgBigInt,
});

const ObjktAskHandler: Handler<Transaction, ObjktAskEvent> = {
  type: EVENT_TYPE_OBJKT_ASK,

  accept: {
    entrypoint: 'ask',
    target_address: OBJKT_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'parameter.value.fa2');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const askId = String(parseInt(get(transaction, 'storage.ask_id'), 10) - 1);
    const sellerAddress = get(transaction, 'sender.address');
    const artistAddress = get(transaction, 'parameter.value.artist');
    const royalties = get(transaction, 'parameter.value.royalties');
    const price = get(transaction, 'parameter.value.price');
    const amount = get(transaction, 'parameter.value.amount');
    const id = createEventId(EVENT_TYPE_OBJKT_ASK, transaction.id);

    const event: ObjktAskEvent = {
      id,
      type: EVENT_TYPE_OBJKT_ASK,
      opid: transaction.id,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      ask_id: askId,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      royalties: royalties,
      price: price,
      amount: amount,
    };

    assert(omit(event, ['type']), ObjktAskEventSchema);

    return event;
  },
};

export default ObjktAskHandler;
