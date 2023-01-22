import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, optional, Describe, boolean } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, MintEvent, Transaction, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_FA2 } from '../../../consts';
import {
  tokenEventFields,
  isVerifiedArtistField,
  editionsField,
  artistAddressField,
  tokenNameField,
  creatorNameField,
  tokenDescriptionField,
  metadataUriField,
  rgbField,
  royaltySharesField,
} from '../event-fields-meta';

export const EVENT_TYPE_8BID_24X24_MONOCHROME_MINT = '8BID_24X24_MONOCHROME_MINT';

export interface EightbidMint24x24MonochromeEvent extends MintEvent {
  type: typeof EVENT_TYPE_8BID_24X24_MONOCHROME_MINT;
  editions: string;
  artist_address: string;
  token_name: string;
  creator_name: string;
  token_description: string;
  metadata_uri?: string;
  rgb: string;
  royalty_shares: RoyaltyShares;
}

const EightbidMint24x24MonochromeSchema: Describe<Omit<EightbidMint24x24MonochromeEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  is_verified_artist: boolean(),
  editions: PgBigInt,
  artist_address: TezosAddress,
  token_name: string(),
  creator_name: string(),
  token_description: string(),
  metadata_uri: optional(string()),
  rgb: string(),
  royalty_shares: RoyaltySharesSchema,
});

const EightbidMint24x24MonochromeHandler: TransactionHandler<EightbidMint24x24MonochromeEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_8BID_24X24_MONOCHROME_MINT,

  meta: {
    eventDescription: `A 24x24 monochrome token was minted on 8bidou.`,
    eventFields: [
      ...tokenEventFields,
      isVerifiedArtistField,
      editionsField,
      artistAddressField,
      tokenNameField,
      creatorNameField,
      tokenDescriptionField,
      metadataUriField,
      rgbField,
      royaltySharesField,
    ],
  },

  accept: {
    entrypoint: 'mint',
    target_address: EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const fa2Address = get(transaction, 'target.address');
    const editions = get(transaction, 'parameter.value.mint_tx.amount');
    const artistAddress = get(transaction, 'sender.address');
    const rgb = get(transaction, 'parameter.value.rgb.rgb');
    const tokenName = Buffer.from(get(transaction, 'parameter.value.rgb.token_name'), 'hex').toString();
    const creatorName = Buffer.from(get(transaction, 'parameter.value.rgb.creator_name'), 'hex').toString();
    const tokenDescription = Buffer.from(get(transaction, 'parameter.value.rgb.token_description'), 'hex').toString();
    const metadataUriRaw = get(transaction, 'parameter.value.token_meta.token_info.');
    const metadataUri = metadataUriRaw ? Buffer.from(metadataUriRaw, 'hex').toString() : null;
    const tokenId = get(transaction, 'storage.token_index');
    const id = createEventId(EVENT_TYPE_8BID_24X24_MONOCHROME_MINT, transaction);

    const event: EightbidMint24x24MonochromeEvent = {
      id,
      type: EVENT_TYPE_8BID_24X24_MONOCHROME_MINT,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      editions: editions,
      artist_address: artistAddress,
      is_verified_artist: true,
      token_name: tokenName,
      token_description: tokenDescription,
      rgb: rgb,
      creator_name: creatorName,
      royalty_shares: royaltiesToRoyaltyShares(artistAddress, '166666', 6),
    };

    if (metadataUri) {
      event.metadata_uri = metadataUri;
    }

    assert(omit(event, ['type']), EightbidMint24x24MonochromeSchema);

    return event;
  },
};

export default EightbidMint24x24MonochromeHandler;
