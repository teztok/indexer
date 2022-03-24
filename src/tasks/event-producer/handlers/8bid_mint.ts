import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, MintEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { EIGHTBIDOU_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_8BID_MINT = '8BID_MINT';

export interface EightbidMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_8BID_MINT;
  editions: string;
  artist_address: string;
  token_name: string;
  creator_name: string;
  token_description: string;
  metadata_uri: string;
  rgb: string;
}

const EightbidMintEventSchema: Describe<Omit<EightbidMintEvent, 'type'>> = object({
  id: string(),
  opid: PositiveInteger,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),

  editions: PgBigInt,
  artist_address: TezosAddress,
  token_name: string(),
  creator_name: string(),
  token_description: string(),
  metadata_uri: MetadataUri,
  rgb: string(),
});

const EightbidMintHandler: Handler<Transaction, EightbidMintEvent> = {
  type: EVENT_TYPE_8BID_MINT,

  accept: {
    entrypoint: 'mint',
    target_address: EIGHTBIDOU_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'target.address');
    const editions = get(transaction, 'parameter.value.mint_tx.amount');
    const artistAddress = get(transaction, 'sender.address');
    const rgb = get(transaction, 'parameter.value.rgb.rgb');
    const tokenName = Buffer.from(get(transaction, 'parameter.value.rgb.token_name'), 'hex').toString();
    const creatorName = Buffer.from(get(transaction, 'parameter.value.rgb.creater_name'), 'hex').toString();
    const tokenDescription = Buffer.from(get(transaction, 'parameter.value.rgb.token_description'), 'hex').toString();
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.token_meta.token_info.'), 'hex').toString();
    const tokenId = get(transaction, 'storage.token_index');
    const id = createEventId(EVENT_TYPE_8BID_MINT, transaction.id);

    const event: EightbidMintEvent = {
      id,
      type: EVENT_TYPE_8BID_MINT,
      opid: transaction.id,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,

      editions: editions,
      artist_address: artistAddress,
      token_name: tokenName,
      token_description: tokenDescription,
      rgb: rgb,
      creator_name: creatorName,
      metadata_uri: metadataUri,
    };

    assert(omit(event, ['type']), EightbidMintEventSchema);

    return event;
  },
};

export default EightbidMintHandler;
