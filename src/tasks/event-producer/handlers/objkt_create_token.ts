import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe, is } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { normalizeMetadataIpfsUri } from '../../../lib/utils';
import { TransactionHandler, MintEvent } from '../../../types';
import { ObjktcomOpenEditionArtistContractSchema } from '../../../lib/schemas';
import { createEventId, filterDiffs } from '../../../lib/utils';

import { tokenEventFields, artistAddressField, isVerifiedArtistField, editionsField, metadataUriField } from '../event-fields-meta';

export const EVENT_TYPE_OBJKT_CREATE_TOKEN = 'OBJKT_CREATE_TOKEN';

export interface ObjktCreateTokenEvent extends MintEvent {
  type: typeof EVENT_TYPE_OBJKT_CREATE_TOKEN;
  metadata_uri: string;
}

const ObjktCreateTokenEventSchema: Describe<Omit<ObjktCreateTokenEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  artist_address: TezosAddress,
  is_verified_artist: boolean(),
  editions: PgBigInt,
  metadata_uri: MetadataUri,
});

const HenMintHandler: TransactionHandler<ObjktCreateTokenEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_OBJKT_CREATE_TOKEN,

  meta: {
    eventDescription: `An open edition was minted in an artist collection on objkt.com.`,
    eventFields: [...tokenEventFields, artistAddressField, isVerifiedArtistField, editionsField, metadataUriField],
  },

  accept: (transaction) => {
    if (get(transaction, 'parameter.entrypoint') !== 'create_token') {
      return false;
    }

    return is(get(transaction, 'storage'), ObjktcomOpenEditionArtistContractSchema);
  },

  exec: (transaction) => {
    const artistAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'target.address');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.'), 'hex').toString();
    const metadataDiffs = filterDiffs(transaction.diffs!, null, 'token_metadata', ['add_key']);
    const tokenId = get(metadataDiffs, '0.content.value.token_id');
    const id = createEventId(EVENT_TYPE_OBJKT_CREATE_TOKEN, transaction);

    const event: ObjktCreateTokenEvent = {
      id,
      type: EVENT_TYPE_OBJKT_CREATE_TOKEN,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      fa2_address: fa2Address,
      token_id: tokenId,
      level: transaction.level,
      artist_address: artistAddress,
      is_verified_artist: true,
      editions: '0',
      metadata_uri: normalizeMetadataIpfsUri(metadataUri),
    };

    assert(omit(event, ['type']), ObjktCreateTokenEventSchema);

    return event;
  },
};

export default HenMintHandler;
