import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { EIGHTSCRIBO_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_8SCRIBO_MINT = '8SCRIBO_MINT';

export interface EightscriboMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_8SCRIBO_MINT;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
  eightscribo_title: string;
  eightscribo_rowone: string;
  eightscribo_rowtwo: string;
  eightscribo_rowthree: string;
}

const EightscriboMintEventSchema: Describe<Omit<EightscriboMintEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  is_verified_artist: boolean(),
  eightscribo_title: string(),
  eightscribo_rowone: string(),
  eightscribo_rowtwo: string(),
  eightscribo_rowthree: string(),
  artist_address: TezosAddress,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
  royalty_shares: RoyaltySharesSchema,
});

const EightscriboMintHandler: Handler<Transaction, EightscriboMintEvent> = {
  type: EVENT_TYPE_8SCRIBO_MINT,

  accept: {
    entrypoint: 'mint_haiku',
    target_address: EIGHTSCRIBO_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const tokenId = String(parseInt(get(transaction, 'storage.last_token_id'), 10) - 1);
    const royalties = get(transaction, 'parameter.value.params.royalties');
    const editions = get(transaction, 'parameter.value.params.amount');
    const fa2Address = get(transaction, 'target.address');
    const artistAddress = get(transaction, 'sender.address');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.params.token_metadata.'), 'hex').toString();
    const haikuTitle = Buffer.from(get(transaction, 'parameter.value.haiku.title'), 'hex').toString();
    const haikuRowone = Buffer.from(get(transaction, 'parameter.value.haiku.rowone'), 'hex').toString();
    const haikuRowtwo = Buffer.from(get(transaction, 'parameter.value.haiku.rowtwo'), 'hex').toString();
    const haikuRowthree = Buffer.from(get(transaction, 'parameter.value.haiku.rowthree'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_8SCRIBO_MINT, transaction);

    const event: EightscriboMintEvent = {
      id,
      type: EVENT_TYPE_8SCRIBO_MINT,
      opid: transaction.id,
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
      eightscribo_title: haikuTitle,
      eightscribo_rowone: haikuRowone,
      eightscribo_rowtwo: haikuRowtwo,
      eightscribo_rowthree: haikuRowthree,
    };

    assert(omit(event, ['type']), EightscriboMintEventSchema);

    return event;
  },
};

export default EightscriboMintHandler;
