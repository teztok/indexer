import get from 'lodash/get';
import omit from 'lodash/omit';
import { array, assert, object, record, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { OriginationHandler, Event } from '../../../types';
import { SPLIT_CONTRACT_FACTORY_ADDRESS, HEN_CONTRACT_FA2, HEN_CONTRACT_MARKETPLACE } from '../constants';
import { createEventId } from '../../../lib/utils';

export const TEIA_SPLIT_CONTRACT_ORIGINATION = 'TEIA_SPLIT_CONTRACT_ORIGINATION';

export interface TeiaSplitContractOriginationEvent extends Event {
  type: typeof TEIA_SPLIT_CONTRACT_ORIGINATION;
  contract_address: string;
  custom_data: {
    shares: Record<string, string>;
    administrator: string;
    total_shares: string;
    core_participants: Array<string>;
  };
}

const TeiaSplitContractOriginationEventSchema: Describe<Omit<TeiaSplitContractOriginationEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  ophash: string(),
  timestamp: IsoDateString,
  level: PositiveInteger,
  contract_address: ContractAddress,

  custom_data: object({
    shares: record(string(), string()),
    administrator: TezosAddress,
    total_shares: string(),
    core_participants: array(TezosAddress),
  }),
});

const TeiaSplitContractOriginationHandler: OriginationHandler<TeiaSplitContractOriginationEvent> = {
  source: 'origination',

  type: TEIA_SPLIT_CONTRACT_ORIGINATION,

  description: `A split contract was created on teia.`,

  accept: (origination) => {
    return (
      get(origination, 'sender.address') === SPLIT_CONTRACT_FACTORY_ADDRESS &&
      get(origination, 'storage.tokenAddress') === HEN_CONTRACT_FA2 &&
      get(origination, 'storage.minterAddress') === HEN_CONTRACT_MARKETPLACE
    );
  },

  exec: (origination) => {
    const contractAddress = get(origination, 'originatedContract.address');
    const shares = get(origination, 'storage.shares');
    const administrator = get(origination, 'storage.administrator');
    const totalShares = get(origination, 'storage.totalShares');
    const coreParticipants = get(origination, 'storage.coreParticipants');
    const id = createEventId(TEIA_SPLIT_CONTRACT_ORIGINATION, origination);

    const event: TeiaSplitContractOriginationEvent = {
      id,
      type: TEIA_SPLIT_CONTRACT_ORIGINATION,
      opid: String(origination.id),
      ophash: origination.hash,
      timestamp: origination.timestamp,
      level: origination.level,
      contract_address: contractAddress,

      custom_data: {
        shares,
        administrator,
        total_shares: totalShares,
        core_participants: coreParticipants,
      },
    };

    assert(omit(event, ['type']), TeiaSplitContractOriginationEventSchema);

    return event;
  },
};

export default TeiaSplitContractOriginationHandler;
