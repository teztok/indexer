import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, MetadataUri, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, MintEvent, SaleEventInterface, RoyaltyShares } from '../../../types';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { createEventId, findDiff, splitsToRoyaltyShares } from '../../../lib/utils';
import { FX_CONTRACT_MINT_V4, FX_CONTRACT_FA2_V4, FX_CONTRACT_TICKET_FA2, SALE_INTERFACE } from '../../../consts';
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

export const EVENT_TYPE_FX_MINT_WITH_TICKET = 'FX_MINT_WITH_TICKET';

export interface FxMintWithTicketEvent extends MintEvent {
  type: typeof EVENT_TYPE_FX_MINT_WITH_TICKET;
  implements: SaleEventInterface;
  royalties: string;
  issuer_id: string;
  iteration: string;
  price: string;
  metadata_uri: string;
  seller_address: string;
  buyer_address: string;
  royalty_shares: RoyaltyShares;
}

const FxMintWithTicketEventSchema: Describe<Omit<FxMintWithTicketEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  ophash: string(),
  artist_address: TezosAddress,
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  is_verified_artist: boolean(),
  issuer_id: PgBigInt,
  token_id: string(),
  royalties: PgBigInt,
  editions: PgBigInt,
  iteration: PgBigInt,
  metadata_uri: MetadataUri,
  price: PgBigInt,
  royalty_shares: RoyaltySharesSchema,
});

const FxMintWithTicketHandler: TransactionHandler<FxMintWithTicketEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_MINT_WITH_TICKET,

  meta: {
    eventDescription: `A token was minted with a ticket on fxhash (mint contract: KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b).`,
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
      entrypoint: 'mint_with_ticket',
      target_address: FX_CONTRACT_MINT_V4,
    },
    {
      entrypoint: 'consume',
      target_address: FX_CONTRACT_TICKET_FA2,
    },
    {
      entrypoint: 'mint',
      target_address: FX_CONTRACT_FA2_V4,
    },
  ],

  exec: (transaction, operation) => {
    const transactionIdx = operation.transactions.findIndex(({ id }) => transaction.id === id);
    const ticketConsumeTransaction = operation.transactions
      .slice(transactionIdx > 0 ? transactionIdx : 0)
      .find(
        (transaction) =>
          get(transaction, 'parameter.entrypoint') === 'consume' && get(transaction, 'target.address') === FX_CONTRACT_TICKET_FA2
      );
    const fa2MintTransaction = operation.transactions
      .slice(transactionIdx > 0 ? transactionIdx : 0)
      .find(
        (transaction) => get(transaction, 'parameter.entrypoint') === 'mint' && get(transaction, 'target.address') === FX_CONTRACT_FA2_V4
      );

    const tokenId = get(fa2MintTransaction, 'parameter.value.token_id');
    const issuerId = get(fa2MintTransaction, 'parameter.value.issuer_id');
    const royalties = get(fa2MintTransaction, 'parameter.value.royalties');
    const iteration = get(fa2MintTransaction, 'parameter.value.iteration');
    const splits = get(fa2MintTransaction, 'parameter.value.royalties_split');
    const diff = findDiff(transaction.diffs!, 411393, 'ledger', ['update_key'], issuerId);
    const artistAddress = get(diff, 'content.value.author');
    const ticketDiff = findDiff(
      ticketConsumeTransaction!.diffs!,
      411412,
      'token_data',
      ['remove_key'],
      get(ticketConsumeTransaction, 'parameter.value.token_id')
    );
    const editions = '1';
    const price = get(ticketDiff, 'content.value.price');
    const fa2Address = FX_CONTRACT_FA2_V4;
    const metadataUri = Buffer.from(get(fa2MintTransaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_FX_MINT_WITH_TICKET, transaction);

    const event: FxMintWithTicketEvent = {
      id,
      type: EVENT_TYPE_FX_MINT_WITH_TICKET,
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
      royalty_shares: splitsToRoyaltyShares(splits, royalties),
    };

    assert(omit(event, ['type', 'implements']), FxMintWithTicketEventSchema);

    return event;
  },
};

export default FxMintWithTicketHandler;
