import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { HEN_CONTRACT_MARKETPLACE, HEN_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_HEN_MINT = 'HEN_MINT';

export interface HenMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_HEN_MINT;
  royalties: string;
  metadata_uri: string;
}

const HenMintEventSchema: Describe<Omit<HenMintEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: TezosAddress,
  royalties: PgBigInt,
  editions: PgBigInt,
  metadata_uri: MetadataUri,
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
    const mintTransaction = operation.transactions.find((transaction) => get(transaction, 'parameter.entrypoint') === 'mint');
    const tokenId = get(mintTransaction, 'parameter.value.token_id');
    const royalties = get(transaction, 'parameter.value.royalties');
    const editions = get(transaction, 'parameter.value.amount');
    const fa2Address = get(transaction, 'storage.objkt');
    const metadataUri = Buffer.from(get(mintTransaction, 'parameter.value.token_info.'), 'hex').toString();
    const id = createEventId(EVENT_TYPE_HEN_MINT, transaction.id);

    const event: HenMintEvent = {
      id,
      type: EVENT_TYPE_HEN_MINT,
      opid: transaction.id,
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      artist_address: transaction.sender.address,
      token_id: tokenId,
      royalties: royalties,
      editions: editions,
      metadata_uri: metadataUri,
    };

    assert(omit(event, ['type']), HenMintEventSchema);

    return event;
  },
};

export default HenMintHandler;
