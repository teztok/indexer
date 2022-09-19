import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { HEN_CONTRACT_MARKETPLACE, HEN_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_HEN_MINT = 'HEN_MINT';

export interface HenMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_HEN_MINT;
  royalties: string;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
}

const HenMintEventSchema: Describe<Omit<HenMintEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: TezosAddress,
  is_verified_artist: boolean(),
  royalties: PgBigInt,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
  royalty_shares: RoyaltySharesSchema,
});

const HenMintHandler: Handler<Transaction, HenMintEvent> = {
  type: EVENT_TYPE_HEN_MINT,

  accept: [
    {
      entrypoint: 'mint_OBJKT',
      target_address: HEN_CONTRACT_MARKETPLACE,
    },
    {
      entrypoint: 'mint',
      target_address: HEN_CONTRACT_FA2,
    },
  ],

  exec: (transaction, operation) => {
    const transactionIdx = operation.transactions.findIndex(({ id }) => transaction.id === id);
    const mintTransaction = operation.transactions
      .slice(transactionIdx > 0 ? transactionIdx : 0)
      .find((transaction) => get(transaction, 'parameter.entrypoint') === 'mint');
    const tokenId = get(mintTransaction, 'parameter.value.token_id');
    const royalties = get(transaction, 'parameter.value.royalties');
    const editions = get(transaction, 'parameter.value.amount');
    const fa2Address = get(transaction, 'storage.objkt');
    const artistAddress = get(transaction, 'sender.address');
    const metadataUri = Buffer.from(get(mintTransaction, 'parameter.value.token_info.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_HEN_MINT, transaction);

    const event: HenMintEvent = {
      id,
      type: EVENT_TYPE_HEN_MINT,
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
      royalty_shares: royaltiesToRoyaltyShares(artistAddress, royalties, 3),
    };

    assert(omit(event, ['type']), HenMintEventSchema);

    return event;
  },
};

export default HenMintHandler;
