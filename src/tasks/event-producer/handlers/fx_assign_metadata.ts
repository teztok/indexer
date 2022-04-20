import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, IsoDateString, MetadataUri, PositiveInteger } from '../../../lib/validators';
import { createEventId } from '../../../lib/utils';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { FX_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_FX_ASSIGN_METADATA = 'FX_ASSIGN_METADATA';

export interface FxAssignMetadataEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FX_ASSIGN_METADATA;
  metadata_uri: string;
}

const FxAssignMetadataEventSchema: Describe<Omit<FxAssignMetadataEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  metadata_uri: MetadataUri,
});

const FxAssignMetadataHandler: Handler<Transaction, FxAssignMetadataEvent> = {
  type: EVENT_TYPE_FX_ASSIGN_METADATA,

  accept: {
    entrypoint: 'assign_metadata',
    target_address: FX_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'target.address');
    const tokenId = get(transaction, 'parameter.value.token_id');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_FX_ASSIGN_METADATA, transaction.id);

    const event: FxAssignMetadataEvent = {
      id,
      type: EVENT_TYPE_FX_ASSIGN_METADATA,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      metadata_uri: metadataUri,
    };

    assert(omit(event, ['type']), FxAssignMetadataEventSchema);

    return event;
  },
};

export default FxAssignMetadataHandler;
