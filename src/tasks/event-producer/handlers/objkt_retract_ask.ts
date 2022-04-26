import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import { OBJKT_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_OBJKT_RETRACT_ASK = 'OBJKT_RETRACT_ASK';

export interface ObjktRetractAskEvent extends TokenEvent {
  type: typeof EVENT_TYPE_OBJKT_RETRACT_ASK;
  ask_id: string;
  artist_address: string;
  seller_address: string;
}

const ObjktRetractAskEventSchema: Describe<Omit<ObjktRetractAskEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  artist_address: TezosAddress,
  seller_address: TezosAddress,
  ask_id: PgBigInt,
});

const ObjktRetractAskHandler: Handler<Transaction, ObjktRetractAskEvent> = {
  type: EVENT_TYPE_OBJKT_RETRACT_ASK,

  accept: {
    entrypoint: 'retract_ask',
    target_address: OBJKT_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const askId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 5909, 'asks', 'remove_key', askId);
    const fa2Address = get(diff, 'content.value.fa2');
    const tokenId = get(diff, 'content.value.objkt_id');
    const artistAddress = get(diff, 'content.value.artist');
    const sellerAddress = get(diff, 'content.value.issuer');
    const id = createEventId(EVENT_TYPE_OBJKT_RETRACT_ASK, transaction);

    const event: ObjktRetractAskEvent = {
      id,
      type: EVENT_TYPE_OBJKT_RETRACT_ASK,
      opid: transaction.id,
      ophash: transaction.hash,
      level: transaction.level,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      artist_address: artistAddress,
      seller_address: sellerAddress,
      token_id: tokenId,
      ask_id: askId,
    };

    assert(omit(event, ['type']), ObjktRetractAskEventSchema);

    return event;
  },
};

export default ObjktRetractAskHandler;
