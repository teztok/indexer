import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { HAIKU_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_HAIKU_MINT = 'HAIKU_MINT';

export interface HaikuMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_HAIKU_MINT;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
  haiku_title: string;
  haiku_rowone: string;
  haiku_rowtwo: string;
  haiku_rowthree: string;
}

const HaikuMintEventSchema: Describe<Omit<HaikuMintEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  haiku_title: string(),
  haiku_rowone: string(),
  haiku_rowtwo: string(),
  haiku_rowthree: string(),
  artist_address: TezosAddress,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
  royalty_shares: RoyaltySharesSchema,
});

const HaikuMintHandler: Handler<Transaction, HaikuMintEvent> = {
  type: EVENT_TYPE_HAIKU_MINT,

  accept: {
    entrypoint: 'mint_haiku',
    target_address: HAIKU_CONTRACT_FA2,
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
    const id = createEventId(EVENT_TYPE_HAIKU_MINT, transaction);

    const event: HaikuMintEvent = {
      id,
      type: EVENT_TYPE_HAIKU_MINT,
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
      haiku_title: haikuTitle,
      haiku_rowone: haikuRowone,
      haiku_rowtwo: haikuRowtwo,
      haiku_rowthree: haikuRowthree,
    };

    assert(omit(event, ['type']), HaikuMintEventSchema);

    return event;
  },
};

export default HaikuMintHandler;
