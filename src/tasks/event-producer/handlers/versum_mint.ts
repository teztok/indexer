import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { VERSUM_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_VERSUM_MINT = 'VERSUM_MINT';

export interface VersumMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_VERSUM_MINT;
  royalties: string;
  metadata_uri: string;
}

const VersumMintEventSchema: Describe<Omit<VersumMintEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  artist_address: TezosAddress,
  token_id: string(),
  royalties: PgBigInt,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
});

const VersumMintHandler: Handler<Transaction, VersumMintEvent> = {
  type: EVENT_TYPE_VERSUM_MINT,

  accept: {
    entrypoint: 'mint',
    target_address: VERSUM_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const tokenId = String(parseInt(get(transaction, 'storage.token_counter'), 10) - 1);
    const royalties = get(transaction, 'parameter.value.royalty');
    const editions = get(transaction, 'parameter.value.amount');
    const fa2Address = get(transaction, 'target.address');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.metadata.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_VERSUM_MINT, transaction.id);

    const event: VersumMintEvent = {
      id,
      type: EVENT_TYPE_VERSUM_MINT,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      artist_address: transaction.sender.address,
      token_id: tokenId,
      royalties: royalties,
      editions: editions,
      metadata_uri: metadataUri,
    };

    assert(omit(event, ['type']), VersumMintEventSchema);

    return event;
  },
};

export default VersumMintHandler;
