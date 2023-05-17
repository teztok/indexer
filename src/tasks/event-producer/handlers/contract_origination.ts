import get from 'lodash/get';
import omit from 'lodash/omit';
import { array, assert, object, number, string, optional, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { OriginationHandler, Event } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { commonEventFields, initiatorAddress, senderAddress, typeHash, codeHash } from '../event-fields-meta';

export const CONTRACT_ORIGINATION = 'CONTRACT_ORIGINATION';

export interface ContractOriginationEvent extends Event {
  type: typeof CONTRACT_ORIGINATION;
  contract_address: string;
  initiator_address?: string;
  sender_address: string;
  code_hash: number;
  type_hash: number;
}

const ContractOriginationEventSchema: Describe<Omit<ContractOriginationEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  ophash: string(),
  timestamp: IsoDateString,
  level: PositiveInteger,
  contract_address: ContractAddress,
  initiator_address: optional(TezosAddress),
  sender_address: TezosAddress,
  code_hash: number(),
  type_hash: number(),
});

const ContractOriginationHandler: OriginationHandler<ContractOriginationEvent> = {
  source: 'origination',

  type: CONTRACT_ORIGINATION,

  meta: {
    eventDescription: `A contract originated.`,
    eventFields: [...commonEventFields, initiatorAddress, senderAddress, typeHash, codeHash],
  },

  accept: () => true,

  exec: (origination) => {
    const contractAddress = get(origination, 'originatedContract.address');
    const initiatorAddress = get(origination, 'initiator.address');
    const senderAddress = get(origination, 'sender.address');
    const typeHash = get(origination, 'originatedContract.typeHash');
    const codeHash = get(origination, 'originatedContract.codeHash');

    const id = createEventId(CONTRACT_ORIGINATION, origination);

    const event: ContractOriginationEvent = {
      id,
      type: CONTRACT_ORIGINATION,
      opid: String(origination.id),
      ophash: origination.hash,
      timestamp: origination.timestamp,
      level: origination.level,
      contract_address: contractAddress,
      sender_address: senderAddress,
      type_hash: typeHash,
      code_hash: codeHash,
    };

    if (initiatorAddress) {
      event.initiator_address = initiatorAddress;
    }

    assert(omit(event, ['type']), ContractOriginationEventSchema);

    return event;
  },
};

export default ContractOriginationHandler;
