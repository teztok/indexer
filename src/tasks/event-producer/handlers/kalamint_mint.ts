import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, boolean, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, MetadataUri, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, MintEvent, Transaction, RoyaltyShares } from '../../../types';
import { createEventId, royaltiesToRoyaltyShares } from '../../../lib/utils';
import { RoyaltySharesSchema } from '../../../lib/schemas';
import { KALAMINT_CONTRACT_FA2 } from '../../../consts';
import {
  tokenEventFields,
  artistAddressField,
  isVerifiedArtistField,
  editionsField,
  priceField,
  metadataUriField,
  royaltySharesField,
  kalamintEditionField,
  kalamintEditionsField,
  kalamintOnSaleField,
} from '../event-fields-meta';

export const EVENT_TYPE_KALAMINT_MINT = 'KALAMINT_MINT';

export interface KalamintMintEvent extends MintEvent {
  type: typeof EVENT_TYPE_KALAMINT_MINT;
  metadata_uri: string;
  royalty_shares: RoyaltyShares;
  price: string;
  kalamint_editions: string;
  kalamint_edition: string;
  kalamint_on_sale: boolean;
}

const KalamintMintEventSchema: Describe<Omit<KalamintMintEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: TezosAddress,
  is_verified_artist: boolean(),
  editions: PgBigInt,
  price: PgBigInt,
  metadata_uri: MetadataUri,
  royalty_shares: RoyaltySharesSchema,
  kalamint_editions: PgBigInt,
  kalamint_edition: PgBigInt,
  kalamint_on_sale: boolean(),
});

const KalamintMintHandler: TransactionHandler<KalamintMintEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_KALAMINT_MINT,

  meta: {
    eventDescription: `A token was minted on Kalamint.`,
    eventFields: [
      ...tokenEventFields,
      artistAddressField,
      isVerifiedArtistField,
      editionsField,
      priceField,
      metadataUriField,
      royaltySharesField,
      kalamintEditionField,
      kalamintEditionsField,
      kalamintOnSaleField,
    ],
  },

  accept: {
    entrypoint: 'mint',
    target_address: KALAMINT_CONTRACT_FA2,
  },

  exec: (transaction, operation) => {
    const addTokenDiffs = (get(transaction, 'diffs') || []).filter((diff) => diff.path === 'tokens' && diff.action === 'add_key');

    const artistAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'target.address');
    const metadataUri = Buffer.from(get(transaction, 'parameter.value.token_metadata_uri'), 'hex').toString();

    const events: Array<KalamintMintEvent> = [];

    for (let i = 0; i < addTokenDiffs.length; i++) {
      const diff = addTokenDiffs[i];
      const tokenId = get(diff, 'content.key');
      const price = get(diff, 'content.value.price');
      const kalamintOnSale = get(diff, 'content.value.on_sale');
      const kalamintEditions = get(diff, 'content.value.editions');
      const kalamintEdition = get(diff, 'content.value.edition_number');
      const royalties = get(diff, 'content.value.creator_royalty');
      const id = createEventId(EVENT_TYPE_KALAMINT_MINT, transaction, i);

      const event: KalamintMintEvent = {
        id,
        type: EVENT_TYPE_KALAMINT_MINT,
        opid: String(transaction.id),
        ophash: transaction.hash,
        timestamp: transaction.timestamp,
        level: transaction.level,
        fa2_address: fa2Address,
        artist_address: artistAddress,
        is_verified_artist: true,
        token_id: tokenId,
        price,
        editions: '1',
        metadata_uri: metadataUri,
        kalamint_editions: kalamintEditions,
        kalamint_edition: kalamintEdition,
        kalamint_on_sale: kalamintOnSale,
        royalty_shares: royaltiesToRoyaltyShares(artistAddress, royalties, 2),
      };

      assert(omit(event, ['type']), KalamintMintEventSchema);

      events.push(event);
    }

    return events;
  },
};

export default KalamintMintHandler;
