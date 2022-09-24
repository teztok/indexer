import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, Event, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { FX_CONTRACT_MINT_V2 } from '../../../consts';

export const EVENT_TYPE_FX_MINT_ISSUER_V2 = 'FX_MINT_ISSUER_V2';

export interface FxMintIssuerV2Event extends Event {
  type: typeof EVENT_TYPE_FX_MINT_ISSUER_V2;
  fa2_address: string;
  artist_address: string;
  is_verified_artist: boolean;
  issuer_id: string;
  royalties: string;
  editions: string;
  metadata_uri: string;
  price: string;
}

const FxMintIssuerV2EventSchema: Describe<Omit<FxMintIssuerV2Event, 'type'>> = object({
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
  price: PgBigInt,
});

const FxMintIssuerV2Handler: Handler<Transaction, FxMintIssuerV2Event> = {
  type: EVENT_TYPE_FX_MINT_ISSUER_V2,

  accept: {
    entrypoint: 'mint_issuer',
    target_address: FX_CONTRACT_MINT_V2,
  },

  exec: (transaction) => {
    const issuerId = String(parseInt(get(transaction, 'storage.all_tokens'), 10) - 1);
    const royalties = get(transaction, 'parameter.value.royalties');
    const editions = get(transaction, 'parameter.value.amount');
    const price = get(transaction, 'parameter.value.price');
    const fa2Address = get(transaction, 'storage.objkt_contract');
    const artistAddress = get(transaction, 'sender.address');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.metadata'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_FX_MINT_ISSUER_V2, transaction);

    const event: FxMintIssuerV2Event = {
      id,
      type: EVENT_TYPE_FX_MINT_ISSUER_V2,
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
      price,
    };

    assert(omit(event, ['type']), FxMintIssuerV2EventSchema);

    return event;
  },
};

export default FxMintIssuerV2Handler;
