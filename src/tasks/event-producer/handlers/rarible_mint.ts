import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction, RoyaltyShares } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { RARIBLE_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_RARIBLE_MINT = 'RARIBLE_MINT';

export interface RaribleMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_RARIBLE_MINT;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
}

const RaribleMintEventSchema: Describe<Omit<RaribleMintEvent, 'type'>> = object({
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

const RaribleMintHandler: Handler<Transaction, RaribleMintEvent> = {
  type: EVENT_TYPE_RARIBLE_MINT,

  accept: {
    entrypoint: 'mint',
    target_address: RARIBLE_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const editions = get(transaction, 'parameter.value.iamount');
    const fa2Address = get(transaction, 'target.address');
    const artistAddress = get(transaction, 'parameter.value.iowner');
    const tokenId = get(transaction, 'parameter.value.itokenid');
    const iroyalties = get(transaction, 'parameter.value.iroyalties');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.itokenMetadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_RARIBLE_MINT, transaction);
    const royaltyShares: RoyaltyShares = {
      decimals: 4,
      shares: {},
    };

    for (const receiver of iroyalties) {
      royaltyShares.shares[receiver.partAccount] = receiver.partValue;
    }

    const event: RaribleMintEvent = {
      id,
      type: EVENT_TYPE_RARIBLE_MINT,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      artist_address: artistAddress,
      token_id: tokenId,
      editions: editions,
      metadata_uri: metadataUri,
      royalty_shares: royaltyShares,
    };

    assert(omit(event, ['type']), RaribleMintEventSchema);

    return event;
  },
};

export default RaribleMintHandler;
