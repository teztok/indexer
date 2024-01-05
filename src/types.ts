import {
  HEN_CONTRACT_MARKETPLACE,
  HEN_CONTRACT_MARKETPLACE_V2,
  OBJKT_CONTRACT_MARKETPLACE,
  OBJKT_CONTRACT_MARKETPLACE_V2,
  OBJKT_CONTRACT_MARKETPLACE_V3,
  FX_CONTRACT_MARKETPLACE,
  FX_CONTRACT_MARKETPLACE_V3,
  EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE,
  EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE,
  EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE,
  VERSUM_CONTRACT_MARKETPLACE,
  TEIA_CONTRACT_MARKETPLACE,
  TYPED_CONTRACT_MARKETPLACE,
  EIGHTSCRIBO_CONTRACT_MARKETPLACE,
  KALAMINT_CONTRACT_FA2,
} from './consts';

export interface Operation {
  hash: string;
  transactions: Transactions;
}

export type TransactionAcceptFn = (transaction: Transaction, operation: Operation) => boolean;

export interface Event {
  id: string;
  type: string;
  timestamp: string;
  level: number;
  opid: string;
  ophash: string;
  quotes?: Record<string, number>;
  price_in_eur?: string | null;
  price_in_usd?: string | null;
  price_in_cny?: string | null;
  price_in_jpy?: string | null;
  price_in_krw?: string | null;
  price_in_gbp?: string | null;
}

export interface TokenEvent extends Event {
  fa2_address: string;
  token_id: string;
}

export interface MetadataEvent extends TokenEvent {
  metadata_uri: string;
}

export interface MintEvent extends TokenEvent {
  editions: string;
  artist_address: string;
  is_verified_artist: boolean;
}

export type SaleEventInterface = 'SALE';

export interface SaleEvent extends Event {
  amount?: string;
  currency?: string;
  implements: SaleEventInterface;
  seller_address: string;
  buyer_address: string;
  price: string;
}

export type KeysEnum<T> = { [P in keyof Required<T>]: string };

export type BigmapDiffAction = 'add_key' | 'update_key' | 'remove_key';

export type BigmapDiffKey = string | { nat: string; address: string } | unknown;

export type BigmapDiffContent = {
  hash: string;
  key: BigmapDiffKey;
  value: unknown;
};

export interface BigmapDiff {
  bigmap: number;
  path: string;
  action: BigmapDiffAction;
  content: BigmapDiffContent;
}

export type BigmapDiffs = Array<BigmapDiff>;

export interface Pattern {
  entrypoint?: string;
  target_address?: string;
}

export type Patterns = Array<Pattern>;

export interface Transaction {
  id: number;
  level: number;
  timestamp: string;
  block: string;
  hash: string;
  counter: number;
  nonce: null | number;
  sender: {
    alias?: string;
    address: string;
  };
  target: {
    alias?: string;
    address: string;
  };
  parameter: unknown; // TODO
  amount: number;
  hasInternals: boolean;
  status: string;
  initiator: {
    alias?: string;
    address: string;
  } | null;
  storage?: unknown; // TODO
  diffs?: BigmapDiffs | null;
}

export type Transactions = Array<Transaction>;

export interface GetTransactionsFilters {
  level?: number;
}

export interface GetOriginationsFilters {
  level?: number;
}

export type OriginationAcceptFn = (origination: Origination) => boolean;

export interface Origination {
  id: number;
  level: number;
  timestamp: string;
  block: string;
  hash: string;
  counter: number;
  nonce: null | number;
  sender: {
    alias?: string;
    address: string;
  };
  status: string;
  initiator: {
    alias?: string;
    address: string;
  } | null;
  storage?: unknown;
  originatedContract: unknown;
}

export type Originations = Array<Origination>;

type EventFieldName = string;
type EventFieldType = 'string' | 'big integer' | 'timestamp' | 'json' | 'boolean';
type EventFieldDescription = string;

export type EventField = [EventFieldName, EventFieldType, EventFieldDescription];

interface HandlerMeta {
  eventDescription: string;

  eventFields?: Array<EventField>;
}

export interface TransactionHandler<E extends Event> {
  source: 'transaction';

  type: string;

  meta: HandlerMeta;

  accept: TransactionAcceptFn | Pattern | Patterns;

  exec: (transaction: Transaction, operation: Operation) => E | Array<E>;
}

export interface OriginationHandler<E extends Event> {
  source: 'origination';

  type: string;

  meta: HandlerMeta;

  accept: OriginationAcceptFn;

  exec: (origination: Origination) => E | Array<E>;
}

export interface Processor<T extends Event = Event> {
  accept: (event: Event) => boolean;

  exec: (events: Array<T>) => Promise<void>;
}

export interface Task {
  name: string;

  spawnWorkers: () => Promise<void>;
}

export interface DataRate {
  value: number;
  unit: string;
}

export interface Dimensions {
  value: string;
  unit: string;
}

export interface Format {
  uri: string;
  mimeType: string;
  hash?: string;
  fileSize?: number;
  fileName?: string;
  dimensions?: Dimensions;
  dataRate?: DataRate;
}

export interface FormatSnakeCase {
  uri: string;
  mime_type: string;
  hash?: string;
  file_size?: number;
  file_same?: string;
  dimensions?: Dimensions;
  data_rate?: DataRate;
}

export interface Attribute {
  name?: string;
  value?: any;
  type?: string;
}

type TeiacafePlaylist = Array<{ contract_id: string; token_id: number }>;

// the minimum on information a metadata data file needs to contain
export interface MetadataBase {
  name: string;
  artifactUri: string;
}

// see https://tzip.tezosagora.org/proposal/tzip-21/
export interface Metadata extends MetadataBase {
  symbol?: string;
  decimals?: number;
  description?: string;
  minter?: string;
  creators?: Array<string>;
  contributors?: Array<string>;
  publishers?: Array<string>;
  date?: string;
  blockLevel?: number;
  type?: string;
  tags?: Array<string>;
  genres?: Array<string>;
  language?: string;
  identifier?: string;
  rights?: string;
  rightUri?: string;
  displayUri?: string;
  thumbnailUri?: string;
  externalUri?: string;
  isTransferable?: boolean;
  isBooleanAmount?: boolean;
  shouldPreferSymbol?: boolean;
  formats?: Array<Format>;
  attributes?: Array<Attribute>;
  assets?: Array<Metadata>;
  royalties?: RoyaltyShares;
  teiacafe_playlist?: {
    playlist_description: string;
    playlist_cover: string;
    playlist: TeiacafePlaylist;
  };
}
export interface RoyaltyShares {
  decimals: number;
  shares: Record<string, string>;
}

export type Platform = 'HEN' | 'FXHASH' | 'OBJKT' | 'VERSUM' | '8BIDOU' | 'TYPED' | '8SCRIBO' | 'RARIBLE' | 'KALAMINT' | 'TEIACAFE' | null;

export interface Token {
  fa2_address: string;
  token_id: string;

  platform: Platform;

  last_processed_event_id: string | null;
  last_processed_event_timestamp: string | null;
  last_processed_event_level: number | null;

  metadata_uri: string | null;
  metadata_status: string;

  editions: string; // burned ones excluded
  burned_editions: string;

  minted_at: string | null;

  contract_creator_address: string | null;

  minter_address: string | null;
  artist_address: string | null;
  is_verified_artist: boolean;

  symbol: string | null;
  name: string | null;
  description: string | null;
  artifact_uri: string | null;
  display_uri: string | null;
  thumbnail_uri: string | null;
  external_uri: string | null;
  mime_type: string | null;
  formats: Array<FormatSnakeCase> | null;
  creators: Array<string> | null;
  contributors: Array<string> | null;

  rights: string | null;
  right_uri: string | null;
  attributes: Array<Attribute> | null;

  price: string | null; // the cheapest price
  lowest_price_listing: AnyListing | null;

  last_sales_price: string | null;
  highest_sales_price: string | null;
  lowest_sales_price: string | null;
  first_sales_price: string | null;

  current_price_to_last_sales_price_diff: string | null;
  current_price_to_last_sales_price_pct: string | null;

  current_price_to_highest_sales_price_diff: string | null;
  current_price_to_highest_sales_price_pct: string | null;

  current_price_to_lowest_sales_price_diff: string | null;
  current_price_to_lowest_sales_price_pct: string | null;

  current_price_to_first_sales_price_diff: string | null;
  current_price_to_first_sales_price_pct: string | null;

  highest_offer_price: string | null;

  last_sale_at: string | null;

  sales_count: string;
  sales_volume: string;
  royalties_total: string | null;

  eightbid_creator_name: string | null;
  eightbid_rgb: string | null;

  objkt_artist_collection_id: string | null;

  fx_issuer_id: string | null;
  fx_iteration: string | null;

  fx_collection_name?: string | null;
  fx_collection_description?: string | null;
  fx_collection_display_uri?: string | null;
  fx_collection_thumbnail_uri?: string | null;
  fx_collection_editions?: string | null;

  eightscribo_title: string | null;
  eightscribo_rowone: string | null;
  eightscribo_rowtwo: string | null;
  eightscribo_rowthree: string | null;

  teiacafe_playlist: TeiacafePlaylist | null;
  teiacafe_playlist_description: string | null;
  teiacafe_playlist_curator_fee: string | null;
  teiacafe_playlist_cover: string | null;
}

export interface Listing {
  type: string;
  created_at: string;
  contract_address: string;
  seller_address: string;
  price: string;
  amount: number;
  amount_left: number;
  status: 'active' | 'sold_out' | 'canceled';
}

export interface HenListing extends Listing {
  type: 'HEN_SWAP';
  swap_id: string;
  contract_address: typeof HEN_CONTRACT_MARKETPLACE;
}

export interface HenListingV2 extends Listing {
  type: 'HEN_SWAP_V2';
  swap_id: string;
  contract_address: typeof HEN_CONTRACT_MARKETPLACE_V2;
}

export interface TeiaListing extends Listing {
  type: 'TEIA_SWAP';
  swap_id: string;
  contract_address: typeof TEIA_CONTRACT_MARKETPLACE;
}

export interface TypedListing extends Listing {
  type: 'TYPED_SWAP';
  swap_id: string;
  contract_address: typeof TYPED_CONTRACT_MARKETPLACE;
}

export interface EightscriboListing extends Listing {
  type: '8SCRIBO_SWAP';
  swap_id: string;
  contract_address: typeof EIGHTSCRIBO_CONTRACT_MARKETPLACE;
}

export interface ObjktListing extends Listing {
  type: 'OBJKT_ASK';
  ask_id: string;
  contract_address: typeof OBJKT_CONTRACT_MARKETPLACE;
}

export interface ObjktListingV2 extends Listing {
  type: 'OBJKT_ASK_V2';
  ask_id: string;
  end_time?: string;
  contract_address: typeof OBJKT_CONTRACT_MARKETPLACE_V2;
  currency: string;
}

export interface ObjktListingV3 extends Listing {
  type: 'OBJKT_ASK_V3';
  ask_id: string;
  end_time?: string;
  contract_address: typeof OBJKT_CONTRACT_MARKETPLACE_V3;
  currency: string;
}

export interface FxListing extends Listing {
  type: 'FX_OFFER';
  offer_id: string;
  contract_address: typeof FX_CONTRACT_MARKETPLACE;
}

export interface FxListingV3 extends Listing {
  type: 'FX_LISTING';
  swap_id: string;
  contract_address: typeof FX_CONTRACT_MARKETPLACE_V3;
}

export interface VersumListing extends Listing {
  type: 'VERSUM_SWAP';
  swap_id: string;
  contract_address: typeof VERSUM_CONTRACT_MARKETPLACE;
  start_price: string;
  end_price: string;
  end_time?: string;
  burn_on_end: boolean;
}

export interface Eightbid8x8ColorListing extends Listing {
  type: '8BID_8X8_COLOR_SWAP';
  swap_id: string;
  contract_address: typeof EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE;
}

export interface Eightbid24x24MonochromeListing extends Listing {
  type: '8BID_24X24_MONOCHROME_SWAP';
  swap_id: string;
  contract_address: typeof EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE;
}

export interface Eightbid24x24ColorListing extends Listing {
  type: '8BID_24X24_COLOR_SWAP';
  swap_id: string;
  contract_address: typeof EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE;
}

export interface KalamintListing extends Listing {
  type: 'KALAMINT_LIST_TOKEN';
  contract_address: typeof KALAMINT_CONTRACT_FA2;
}

export type AnyListing =
  | HenListing
  | HenListingV2
  | ObjktListing
  | ObjktListingV2
  | ObjktListingV3
  | FxListing
  | FxListingV3
  | VersumListing
  | TeiaListing
  | Eightbid8x8ColorListing
  | Eightbid24x24MonochromeListing
  | Eightbid24x24ColorListing
  | TypedListing
  | EightscriboListing
  | KalamintListing;

export interface Offer {
  type: string;
  created_at: string;
  contract_address: string;
  buyer_address: string;
  price: string;
  status: 'active' | 'fulfilled' | 'canceled';
}

export interface ObjktBid extends Offer {
  type: 'OBJKT_BID';
  bid_id: string;
  contract_address: typeof OBJKT_CONTRACT_MARKETPLACE;
}

export interface ObjktOffer extends Offer {
  type: 'OBJKT_OFFER';
  offer_id: string;
  contract_address: typeof OBJKT_CONTRACT_MARKETPLACE_V2;
  end_time?: string;
}

export interface ObjktOfferV3 extends Offer {
  type: 'OBJKT_OFFER_V3';
  offer_id: string;
  contract_address: typeof OBJKT_CONTRACT_MARKETPLACE_V3;
  end_time?: string;
}

export interface VersumOffer extends Offer {
  type: 'VERSUM_OFFER';
  offer_id: string;
  contract_address: typeof VERSUM_CONTRACT_MARKETPLACE;
  amount: number;
}

export interface FxOfferV3 extends Offer {
  type: 'FX_OFFER_V3';
  offer_id: string;
  contract_address: typeof FX_CONTRACT_MARKETPLACE_V3;
}

export type AnyOffer = ObjktBid | ObjktOffer | ObjktOfferV3 | VersumOffer | FxOfferV3;

export type Holders = Record<string, number>;

export type LedgerTypeMultiAsset = 'MULTI_ASSET';
export type LedgerTypeNftAsset = 'NFT_ASSET';

export interface Holding {
  last_received_at: string;
  first_received_at: string;
  amount: number;
}
