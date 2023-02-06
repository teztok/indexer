import { EventField } from '../../types';

export const idField: EventField = ['id', 'string', 'A unique ID, is used to identify the event.'];
export const fa2AddressField: EventField = ['fa2_address', 'string', 'The contract address of the token (always starts with “KT”).'];
export const tokenIdField: EventField = [
  'token_id',
  'string',
  'The ID of the token. This is a numeric value but stored as a string because it can contain a lot of digits in some rare cases.',
];
export const opidField: EventField = ['opid', 'big integer', 'The ID of the operation which led to this event (created by TzKT).'];
export const levelField: EventField = [
  'level',
  'big integer',
  'The level of the block that contains the operation which led to this event.',
];
export const timestampField: EventField = [
  'timestamp',
  'timestamp',
  'The timestamp of the block that contains the operation which led to this event.',
];
export const typeField: EventField = ['type', 'string', 'The type of event.'];
export const ophashField: EventField = ['ophash', 'string', 'The hash of the operation which led to this event.'];
export const implementsField: EventField = [
  'implements',
  'string',
  'This is set to "SALE", meaning that this event represents the sale of a token.',
];
export const fromAddressField: EventField = ['from_address', 'string', 'The Tezos address of the account that sent the token.'];
export const toAddressField: EventField = ['to_address', 'string', 'The Tezos address of the account that received the token.'];
export const amountField: EventField = ['amount', 'big integer', 'The amount of tokens.'];
export const sellerAddressField: EventField = ['seller_address', 'string', 'The Tezos address of the seller.'];
export const buyerAddressField: EventField = ['buyer_address', 'string', 'The Tezos address of the buyer.'];
export const swapIdField: EventField = ['swap_id', 'big integer', 'The ID of the swap (created by the marketplace contract).'];
export const priceField: EventField = ['price', 'big integer', 'The price of the token in micro tez (e.g. 1000000 = 1 tez).'];
export const royaltiesField: EventField = ['royalties', 'big integer', 'deprecated field'];
export const royaltySharesField: EventField = [
  'royalty_shares',
  'json',
  'An object containing information about the royalty receivers (who gets how much royalties).',
];
export const editionsField: EventField = ['editions', 'big integer', 'The number of editions.'];
export const metadataUriField: EventField = [
  'metadata_uri',
  'string',
  "A URI that points to the metadata of the token. Most tokens store metadata on IPFS, so this URI usually starts with 'ipfs://'.",
];
export const metadataField: EventField = ['metadata', 'json', 'A JSON containing the metadata of the token.'];
export const tokenNameField: EventField = ['token_name', 'string', 'The name of the token.'];
export const creatorNameField: EventField = ['creator_name', 'string', 'The name of the creator of the token.'];
export const tokenDescriptionField: EventField = ['token_description', 'string', 'The description of the token.'];
export const rgbField: EventField = ['rgb', 'string', 'Contains the RGB values of 8BIDOU on-chain tokens.'];
export const askIdField: EventField = ['ask_id', 'big integer', 'The ID of the ask (created by the marketplace contract).'];
export const bidIdField: EventField = ['bid_id', 'big integer', 'The ID of the bid (created by the marketplace contract).'];
export const auctionIdField: EventField = ['auction_id', 'big integer', 'The ID of the auction (created by the marketplace contract).'];
export const startTimeField: EventField = ['start_time', 'timestamp', ''];
export const endTimeField: EventField = ['end_time', 'timestamp', ''];
export const startPriceField: EventField = ['start_price', 'big integer', 'Start price in micro tez (e.g. 1000000 = 1 tez).'];
export const currentPriceField: EventField = ['current_price', 'big integer', 'Current price in micro tez (e.g. 1000000 = 1 tez).'];
export const endPriceField: EventField = ['end_price', 'big integer', 'End price in micro tez (e.g. 1000000 = 1 tez).'];
export const bidField: EventField = ['bid', 'big integer', 'Bid in micro tez (e.g. 1000000 = 1 tez).'];
export const reserveField: EventField = ['reserve', 'big integer', ''];
export const extensionTimeField: EventField = ['extension_time', 'big integer', ''];
export const priceIncrementField: EventField = ['price_increment', 'big integer', ''];
export const highestBidderAddressField: EventField = ['highest_bidder_address', 'string', 'The Tezos address of the highest bidder.'];
export const bidderAddressField: EventField = ['bidder_address', 'string', 'The Tezos address of the bidder.'];
export const artistAddressField: EventField = ['artist_address', 'string', 'The Tezos address of the artist.'];
export const collectionIdField: EventField = ['collection_id', 'big integer', 'The ID of the artist collection on objkt.com.'];
export const issuerIdField: EventField = ['issuer_id', 'big integer', 'The ID of the generative token.'];
export const iterationField: EventField = ['iteration', 'big integer', ''];
export const ownerAddressField: EventField = ['owner_address', 'string', 'The Tezos address of the owner.'];
export const holderAddressField: EventField = ['holder_address', 'string', 'The Tezos address of the holder.'];
export const currencyField: EventField = ['currency', 'string', 'Set to tez or otez (wrapped tez from objkt.com).'];
export const offerIdField: EventField = ['offer_id', 'big integer', 'The ID of the offer (created by the marketplace contract).'];
export const isMintField: EventField = ['is_mint', 'boolean', "Set to true if it's the mint."];
export const burnOnEndField: EventField = [
  'burn_on_end',
  'boolean',
  'Set to true if the remaining editions should be burned once the swap ended.',
];
export const eightscriboTitleField: EventField = ['eightscribo_title', 'string', `The title of the token.`];
export const eightscriboRowoneField: EventField = ['eightscribo_rowone', 'string', `The text in the first row.`];
export const eightscriboRowtwoField: EventField = ['eightscribo_rowtwo', 'string', `The text in the second row.`];
export const eightscriboRowthreeField: EventField = ['eightscribo_rowthree', 'string', `The text in the third row.`];
export const ledgerTypeField: EventField = ['ledger_type', 'string', `Either ‘MULTI_ASSET’ or ‘NFT_ASSET’.`];
export const isVerifiedArtistField: EventField = [
  'is_verified_artist',
  'boolean',
  `If the artist_address of the event is the same as the address of the Tezos account that called the mint endpoint, this is set to true.`,
];
export const kalamintOnSaleField: EventField = ['kalamint_on_sale', 'boolean', `If the token is up for sale.`];
export const kalamintEditionsField: EventField = [
  'kalamint_editions',
  'big integer',
  `The number of editions. Note that on Kalamint each edition is minted as separate token.`,
];
export const kalamintEditionField: EventField = [
  'kalamint_edition',
  'big integer',
  `The edition of the token. Note that on Kalamint each edition is minted as separate token.`,
];
export const customDataField: EventField = ['custom_data', 'json', `A property that can contain some custom data (used by plugins).`];
export const contractAddressField: EventField = ['contract_address', 'string', `The address of the contract.`];

export const quotesField: EventField = [
  'quotes',
  'json',
  'An object with quotes from the time when this happened. These quotes are available: BTC, ETH, EUR, USD, CNY, JPY, KRW, GBP',
];
export const eurField: EventField = ['price_in_eur', 'big integer', 'The price in EUR (needs to be divided by 1000000).'];
export const usdField: EventField = ['price_in_usd', 'big integer', 'The price in USD (needs to be divided by 1000000).'];
export const cnyField: EventField = ['price_in_cny', 'big integer', 'The price in CNY (needs to be divided by 1000000).'];
export const jpyField: EventField = ['price_in_jpy', 'big integer', 'The price in JPY (needs to be divided by 1000000).'];
export const krwField: EventField = ['price_in_krw', 'big integer', 'The price in KRW (needs to be divided by 1000000).'];
export const gbpField: EventField = ['price_in_gbp', 'big integer', 'The price in GBP (needs to be divided by 1000000).'];

export const tokenEventFields: Array<EventField> = [
  idField,
  typeField,
  opidField,
  levelField,
  timestampField,
  ophashField,
  fa2AddressField,
  tokenIdField,
  quotesField,
];
export const tokenSaleEventFields: Array<EventField> = [
  ...tokenEventFields,
  implementsField,
  sellerAddressField,
  buyerAddressField,
  priceField,
  eurField,
  usdField,
  cnyField,
  jpyField,
  krwField,
  gbpField,
];
