import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt, MetadataUri } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { SIGN_CONTRACT_ADDRESS, HEN_CONTRACT_FA2 } from '../constants';
import { createEventId } from '../../../lib/utils';

export const EVENT_TYPE_TEIA_SPLIT_CONTRACT_SIGN = 'TEIA_SPLIT_CONTRACT_SIGN';

export interface TeiaSplitContractSignEvent extends TokenEvent {
  type: typeof EVENT_TYPE_TEIA_SPLIT_CONTRACT_SIGN;
  owner_address: string;
}

const TeiaSplitContractSignEventSchema: Describe<Omit<TeiaSplitContractSignEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  ophash: string(),
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  owner_address: TezosAddress,
});

const TeiaSplitContractSignHandler: TransactionHandler<TeiaSplitContractSignEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_TEIA_SPLIT_CONTRACT_SIGN,

  meta: {
    eventDescription: `A participant of a split contract signed a token on teia.`,
  },

  accept: {
    entrypoint: 'sign',
    target_address: SIGN_CONTRACT_ADDRESS,
  },

  exec: (transaction) => {
    const ownerAddress = get(transaction, 'sender.address');
    const tokenId = get(transaction, 'parameter.value');
    const id = createEventId(EVENT_TYPE_TEIA_SPLIT_CONTRACT_SIGN, transaction);

    const event: TeiaSplitContractSignEvent = {
      id,
      type: EVENT_TYPE_TEIA_SPLIT_CONTRACT_SIGN,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,

      fa2_address: HEN_CONTRACT_FA2,
      token_id: tokenId,
      owner_address: ownerAddress,
    };

    assert(omit(event, ['type']), TeiaSplitContractSignEventSchema);

    return event;
  },
};

export default TeiaSplitContractSignHandler;
