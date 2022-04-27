import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction, SaleEventInterface } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { FX_CONTRACT_MINT_V3, FX_CONTRACT_FA2_V3, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_FX_MINT_V3 = 'FX_MINT_V3';

export interface FxMintV3Event extends MintEvent {
  type: typeof EVENT_TYPE_FX_MINT_V3;
  implements: SaleEventInterface;
  royalties: string;
  issuer_id: string;
  iteration: string;
  metadata_uri: string;
  price: string;
  seller_address: string;
  buyer_address: string;
}

const FxMintV3EventSchema: Describe<Omit<FxMintV3Event, 'type' | 'implements'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  ophash: string(),
  artist_address: TezosAddress,
  seller_address: TezosAddress,
  buyer_address: TezosAddress,
  issuer_id: PgBigInt,
  token_id: string(),
  royalties: PgBigInt,
  editions: PgBigInt,
  iteration: PgBigInt,
  metadata_uri: MetadataUri,
  price: PgBigInt,
});

const FxMintIssuerHandler: Handler<Transaction, FxMintV3Event> = {
  type: EVENT_TYPE_FX_MINT_V3,

  accept: [
    {
      entrypoint: 'mint',
      target_address: FX_CONTRACT_MINT_V3,
    },
    {
      entrypoint: 'mint',
      target_address: FX_CONTRACT_FA2_V3,
    },
  ],

  exec: (transaction, operation) => {
    const fa2MintTransaction = operation.transactions.find(
      (transaction) => get(transaction, 'parameter.entrypoint') === 'mint' && get(transaction, 'target.address') === FX_CONTRACT_FA2_V3
    );

    const tokenId = get(fa2MintTransaction, 'parameter.value.token_id');
    const issuerId = get(fa2MintTransaction, 'parameter.value.issuer_id');
    const iteration = get(fa2MintTransaction, 'parameter.value.iteration');
    const royalties = get(fa2MintTransaction, 'parameter.value.royalties');
    const diff = findDiff(transaction.diffs!, 149776, 'ledger', ['update_key'], issuerId);
    const artistAddress = get(diff, 'content.value.author');
    const editions = '1';
    const price = String(get(transaction, 'amount'));
    const fa2Address = FX_CONTRACT_FA2_V3;
    const metadataUri = Buffer.from(get(fa2MintTransaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_FX_MINT_V3, transaction);

    const event: FxMintV3Event = {
      id,
      type: EVENT_TYPE_FX_MINT_V3,
      implements: SALE_INTERFACE,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      seller_address: artistAddress,
      buyer_address: transaction.sender.address,
      artist_address: artistAddress,
      issuer_id: issuerId,
      token_id: tokenId,
      royalties: royalties,
      editions: editions,
      iteration,
      metadata_uri: metadataUri,
      price,
    };

    assert(omit(event, ['type', 'implements']), FxMintV3EventSchema);

    return event;
  },
};

export default FxMintIssuerHandler;
