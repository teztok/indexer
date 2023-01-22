import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, MetadataUri } from '../../../lib/validators';
import { TransactionHandler, Event } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { HEN_SUBJKT_REGISTRY_ADDRESS } from '../constants';

export const EVENT_TYPE_TEIA_SUBJKT_REGISTRY = 'TEIA_SUBJKT_REGISTRY';

export interface TeiaSubjktRegistryEvent extends Event {
  type: typeof EVENT_TYPE_TEIA_SUBJKT_REGISTRY;
  metadata_uri: string;
  owner_address: string;
  custom_data: {
    subjkt: string;
  };
}

const TeiaSubjktRegistryEventSchema: Describe<Omit<TeiaSubjktRegistryEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  ophash: string(),
  timestamp: IsoDateString,
  level: PositiveInteger,

  metadata_uri: MetadataUri,
  custom_data: object({ subjkt: string() }),
  owner_address: TezosAddress,
});

const TeiaSubjktRegistryHandler: TransactionHandler<TeiaSubjktRegistryEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_TEIA_SUBJKT_REGISTRY,

  meta: {
    eventDescription: `A hic et nunc user was created.`,
  },

  accept: {
    entrypoint: 'registry',
    target_address: HEN_SUBJKT_REGISTRY_ADDRESS,
  },

  exec: (transaction) => {
    const ownerAddress = get(transaction, 'sender.address');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.metadata'), 'hex').toString();
    const subjkt = Buffer.from(get(transaction, 'parameter.value.subjkt'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_TEIA_SUBJKT_REGISTRY, transaction);

    const event: TeiaSubjktRegistryEvent = {
      id,
      type: EVENT_TYPE_TEIA_SUBJKT_REGISTRY,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,

      owner_address: ownerAddress,
      metadata_uri: metadataUri,
      custom_data: {
        subjkt,
      },
    };

    assert(omit(event, ['type']), TeiaSubjktRegistryEventSchema);

    return event;
  },
};

export default TeiaSubjktRegistryHandler;
