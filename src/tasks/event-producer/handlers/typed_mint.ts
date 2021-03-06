import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { TYPED_CONTRACT_MINT, TYPED_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_TYPED_MINT = 'TYPED_MINT';

export interface TypedMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_TYPED_MINT;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
}

const TypedMintEventSchema: Describe<Omit<TypedMintEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: TezosAddress,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
  royalty_shares: RoyaltySharesSchema,
});

const TypedMintHandler: Handler<Transaction, TypedMintEvent> = {
  type: EVENT_TYPE_TYPED_MINT,

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
    const artistAddress = transaction.sender.address;
    const metadataUri = Buffer.from(get(mintTransaction, 'parameter.value.token_info.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_TYPED_MINT, transaction);

    const event: TypedMintEvent = {
      id,
      type: EVENT_TYPE_TYPED_MINT,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      artist_address: transaction.sender.address,
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
