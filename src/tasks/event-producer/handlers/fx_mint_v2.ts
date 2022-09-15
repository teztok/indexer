import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction, SaleEventInterface, RoyaltyShares } from '../../../types';
import { createEventId, findDiff, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { FX_CONTRACT_MINT_V2, FX_CONTRACT_FA2, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_FX_MINT_V2 = 'FX_MINT_V2';

export interface FxMintV2Event extends MintEvent {
  type: typeof EVENT_TYPE_FX_MINT_V2;
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

const FxMintV2EventSchema: Describe<Omit<FxMintV2Event, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  artist_address: TezosAddress,
  is_verified_artist: boolean(),
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  issuer_id: PgBigInt,
  royalties: PgBigInt,
  editions: PgBigInt,
  iteration: PgBigInt,
  metadata_uri: MetadataUri,
  price: PgBigInt,
  royalty_shares: RoyaltySharesSchema,
});

const FxMintIssuerHandler: Handler<Transaction, FxMintV2Event> = {
  type: EVENT_TYPE_FX_MINT_V2,

  accept: [
    {
      entrypoint: 'mint',
      target_address: FX_CONTRACT_MINT_V2,
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
    const diff = findDiff(transaction.diffs!, 70072, 'ledger', ['update_key'], issuerId);
    const artistAddress = get(diff, 'content.value.author');
    const editions = '1';
    const price = String(get(transaction, 'amount'));
    const fa2Address = get(transaction, 'storage.objkt_contract');
    const metadataUri = Buffer.from(get(fa2MintTransaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_FX_MINT_V2, transaction);

    const event: FxMintV2Event = {
      id,
      type: EVENT_TYPE_FX_MINT_V2,
      implements: SALE_INTERFACE,
      opid: transaction.id,
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

    assert(omit(event, ['type', 'implements']), FxMintV2EventSchema);

    return event;
  },
};

export default FxMintIssuerHandler;
