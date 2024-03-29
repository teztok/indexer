import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, boolean } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, MintEvent, Transaction, SaleEventInterface, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { FX_CONTRACT_MINT, FX_CONTRACT_FA2, SALE_INTERFACE } from '../../../consts';
import {
  tokenSaleEventFields,
  artistAddressField,
  isVerifiedArtistField,
  royaltiesField,
  issuerIdField,
  editionsField,
  iterationField,
  metadataUriField,
  royaltySharesField,
} from '../event-fields-meta';

export const EVENT_TYPE_FX_MINT = 'FX_MINT';

export interface FxMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_FX_MINT;
  implements: SaleEventInterface;
  royalties: string;
  issuer_id: string;
  iteration: string;
  metadata_uri: string;
  price: string;
  seller_address: string;
  buyer_address: string;
  royalty_shares: RoyaltyShares;
}

const FxMintEventSchema: Describe<Omit<FxMintEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  artist_address: TezosAddress,
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  is_verified_artist: boolean(),
  issuer_id: PgBigInt,
  royalties: PgBigInt,
  editions: PgBigInt,
  iteration: PgBigInt,
  metadata_uri: MetadataUri,
  price: PgBigInt,
  royalty_shares: RoyaltySharesSchema,
});

const FxMintIssuerHandler: TransactionHandler<FxMintEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_MINT,

  meta: {
    eventDescription: `A token was minted on fxhash (mint contract: KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS).`,
    eventFields: [
      ...tokenSaleEventFields,
      artistAddressField,
      isVerifiedArtistField,
      royaltiesField,
      issuerIdField,
      editionsField,
      iterationField,
      metadataUriField,
      royaltySharesField,
    ],
  },

  accept: [
    {
      entrypoint: 'mint',
      target_address: FX_CONTRACT_MINT,
    },
    {
      entrypoint: 'mint',
      target_address: FX_CONTRACT_FA2,
    },
  ],

  exec: (transaction, operation) => {
    const fa2MintTransaction = operation.transactions.find(
      (transaction) => get(transaction, 'parameter.entrypoint') === 'mint' && get(transaction, 'target.address') === FX_CONTRACT_FA2
    );
    const tokenId = get(fa2MintTransaction, 'parameter.value.token_id');
    const issuerId = get(fa2MintTransaction, 'parameter.value.issuer_id');
    const iteration = get(fa2MintTransaction, 'parameter.value.iteration');
    const royalties = get(fa2MintTransaction, 'parameter.value.royalties');
    const artistAddress = get(transaction, 'parameter.value.issuer_address');
    const editions = '1';
    const price = String(get(transaction, 'amount'));
    const fa2Address = get(transaction, 'storage.objkt_contract');
    const metadataUri = Buffer.from(get(fa2MintTransaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_FX_MINT, transaction);

    const event: FxMintEvent = {
      id,
      type: EVENT_TYPE_FX_MINT,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: artistAddress,
      buyer_address: transaction.sender.address,
      artist_address: artistAddress,
      is_verified_artist: false,
      issuer_id: issuerId,
      token_id: tokenId,
      royalties: royalties,
      editions: editions,
      iteration,
      metadata_uri: metadataUri,
      price,
      royalty_shares: royaltiesToRoyaltyShares(artistAddress, royalties, 3),
    };

    assert(omit(event, ['type', 'implements']), FxMintEventSchema);

    return event;
  },
};

export default FxMintIssuerHandler;
