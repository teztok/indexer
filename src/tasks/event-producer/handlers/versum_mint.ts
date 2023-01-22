import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { TransactionHandler, MintEvent, RoyaltyShares } from '../../../types';
import { createEventId, splitsToRoyaltyShares } from '../../../lib/utils';
import { VERSUM_CONTRACT_FA2 } from '../../../consts';
import {
  tokenEventFields,
  artistAddressField,
  isVerifiedArtistField,
  royaltiesField,
  editionsField,
  metadataUriField,
  royaltySharesField,
} from '../event-fields-meta';

export const EVENT_TYPE_VERSUM_MINT = 'VERSUM_MINT';

export interface VersumMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_VERSUM_MINT;
  royalties: string;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
}

const VersumMintEventSchema: Describe<Omit<VersumMintEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  artist_address: TezosAddress,
  is_verified_artist: boolean(),
  token_id: string(),
  ophash: string(),
  royalties: PgBigInt,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
  royalty_shares: RoyaltySharesSchema,
});

const VersumMintHandler: TransactionHandler<VersumMintEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_VERSUM_MINT,

  meta: {
    eventDescription: `A token was minted on versum.`,
    eventFields: [
      ...tokenEventFields,
      artistAddressField,
      isVerifiedArtistField,
      royaltiesField,
      editionsField,
      metadataUriField,
      royaltySharesField,
    ],
  },

  accept: {
    entrypoint: 'mint',
    target_address: VERSUM_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const tokenId = String(parseInt(get(transaction, 'storage.token_counter'), 10) - 1);
    const royalties = get(transaction, 'parameter.value.royalty');
    const splits = get(transaction, 'parameter.value.splits');
    const editions = get(transaction, 'parameter.value.amount');
    const artistAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'target.address');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_VERSUM_MINT, transaction);

    const event: VersumMintEvent = {
      id,
      type: EVENT_TYPE_VERSUM_MINT,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      artist_address: artistAddress,
      is_verified_artist: true,
      token_id: tokenId,
      royalties: royalties,
      editions: editions,
      metadata_uri: metadataUri,
      royalty_shares: splitsToRoyaltyShares(splits, royalties),
    };

    assert(omit(event, ['type']), VersumMintEventSchema);

    return event;
  },
};

export default VersumMintHandler;
