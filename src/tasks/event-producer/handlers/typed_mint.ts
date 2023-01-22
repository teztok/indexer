import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, boolean, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, MintEvent, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { TYPED_CONTRACT_MINT, TYPED_CONTRACT_FA2 } from '../../../consts';
import {
  tokenEventFields,
  artistAddressField,
  isVerifiedArtistField,
  editionsField,
  metadataUriField,
  royaltySharesField,
} from '../event-fields-meta';

export const EVENT_TYPE_TYPED_MINT = 'TYPED_MINT';

export interface TypedMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_TYPED_MINT;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
}

const TypedMintEventSchema: Describe<Omit<TypedMintEvent, 'type'>> = object({
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
  royalty_shares: RoyaltySharesSchema,
});

const TypedMintHandler: TransactionHandler<TypedMintEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_TYPED_MINT,

  meta: {
    eventDescription: `A token was minted on typed.`,
    eventFields: [...tokenEventFields, artistAddressField, isVerifiedArtistField, editionsField, metadataUriField, royaltySharesField],
  },

  accept: [
    {
      entrypoint: 'mint_TYPED',
      target_address: TYPED_CONTRACT_MINT,
    },
    {
      entrypoint: 'mint',
      target_address: TYPED_CONTRACT_FA2,
    },
  ],

  exec: (transaction, operation) => {
    const transactionIdx = operation.transactions.findIndex(({ id }) => transaction.id === id);
    const mintTransaction = operation.transactions
      .slice(transactionIdx > 0 ? transactionIdx : 0)
      .find((transaction) => get(transaction, 'parameter.entrypoint') === 'mint');
    const tokenId = get(mintTransaction, 'parameter.value.token_id');
    const royalties = get(transaction, 'storage.royal');
    const editions = get(transaction, 'parameter.value.amount');
    const fa2Address = get(transaction, 'storage.objkt');
    const artistAddress = get(transaction, 'sender.address');
    const metadataUri = Buffer.from(get(mintTransaction, 'parameter.value.token_info.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_TYPED_MINT, transaction);

    const event: TypedMintEvent = {
      id,
      type: EVENT_TYPE_TYPED_MINT,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      artist_address: artistAddress,
      is_verified_artist: true,
      token_id: tokenId,
      editions: editions,
      metadata_uri: metadataUri,
      royalty_shares: royaltiesToRoyaltyShares(artistAddress, royalties, 3),
    };

    assert(omit(event, ['type']), TypedMintEventSchema);

    return event;
  },
};

export default TypedMintHandler;
