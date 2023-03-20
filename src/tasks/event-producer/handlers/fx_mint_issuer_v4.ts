import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, Event } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MINT_V4, FX_CONTRACT_FA2_V4 } from '../../../consts';
import {
  idField,
  typeField,
  opidField,
  timestampField,
  levelField,
  fa2AddressField,
  quotesField,
  artistAddressField,
  isVerifiedArtistField,
  ophashField,
  issuerIdField,
  royaltiesField,
  editionsField,
  metadataUriField,
} from '../event-fields-meta';

export const EVENT_TYPE_FX_MINT_ISSUER_V4 = 'FX_MINT_ISSUER_V4';

export interface FxMintIssuerV4Event extends Event {
  type: typeof EVENT_TYPE_FX_MINT_ISSUER_V4;
  fa2_address: string;
  artist_address: string;
  is_verified_artist: boolean;
  issuer_id: string;
  royalties: string;
  editions: string;
  metadata_uri: string;
}

const FxMintIssuerV4EventSchema: Describe<Omit<FxMintIssuerV4Event, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  artist_address: TezosAddress,
  is_verified_artist: boolean(),
  ophash: string(),
  issuer_id: PgBigInt,
  royalties: PgBigInt,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
});

const FxMintIssuerV4Handler: TransactionHandler<FxMintIssuerV4Event> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_MINT_ISSUER_V4,

  meta: {
    eventDescription: `A generator token was created on fxhash (contract: KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b).`,
    eventFields: [
      idField,
      typeField,
      opidField,
      timestampField,
      levelField,
      fa2AddressField,
      quotesField,
      artistAddressField,
      isVerifiedArtistField,
      ophashField,
      issuerIdField,
      royaltiesField,
      editionsField,
      metadataUriField,
    ],
  },

  accept: {
    entrypoint: 'mint_issuer',
    target_address: FX_CONTRACT_MINT_V4,
  },

  exec: (transaction) => {
    const issuerId = String(parseInt(get(transaction, 'storage.all_tokens'), 10) - 1);
    const royalties = get(transaction, 'parameter.value.royalties');
    const editions = get(transaction, 'parameter.value.amount');
    const artistAddress = get(transaction, 'sender.address');
    const fa2Address = FX_CONTRACT_FA2_V4;
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.metadata'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_FX_MINT_ISSUER_V4, transaction);

    const event: FxMintIssuerV4Event = {
      id,
      type: EVENT_TYPE_FX_MINT_ISSUER_V4,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      artist_address: artistAddress,
      is_verified_artist: true,
      issuer_id: issuerId,
      royalties: royalties,
      editions: editions,
      metadata_uri: metadataUri,
    };

    assert(omit(event, ['type']), FxMintIssuerV4EventSchema);

    return event;
  },
};

export default FxMintIssuerV4Handler;
