import uniqBy from 'lodash/uniqBy';
import {
  coerce,
  defaulted,
  number,
  string,
  type,
  array,
  boolean,
  optional,
  object,
  any,
  Describe,
  Struct,
  create,
  record,
} from 'superstruct';
import { RoyaltyShares, MetadataBase, Metadata, Attribute, Format, Dimensions, DataRate } from '../types';
import { Royalty, Uri, TezosAddress } from './validators';

interface TokenStorage {
  ledger: number;
  token_metadata: number;
}

function sanitizeString<T, S>(struct: Struct<T, S>): Struct<T, S> {
  return coerce(struct, string(), (x) => x.replace(/\0/g, '').trim());
}

function lowerCaseString<T, S>(struct: Struct<T, S>): Struct<T, S> {
  return coerce(struct, string(), (x) => x.toLowerCase());
}

function removeEmptyStrings<T, S>(struct: Struct<T, S>): Struct<T, S> {
  return coerce(struct, array(string()), (x) => x.filter((e) => e.length));
}

function removeDuplicates<T, S>(struct: Struct<T, S>): Struct<T, S> {
  return coerce(struct, array(string()), (x) => uniqBy(x, (e) => e.toLowerCase().trim()));
}

export const TokenStorageSchema: Describe<TokenStorage> = type({
  ledger: number(),
  token_metadata: number(),
});

interface ObjktcomOpenEditionArtistContractStorage {
  ledger: number;
  locked: number;
  supply: number;
  claimed: number;
  managers: number;
  metadata: number;
  operators: number;
  administrator: string;
  last_token_id: string;
  token_metadata: number;
}

export const DataRateSchema: Describe<DataRate> = type({
  value: number(),
  unit: sanitizeString(string()),
});

export const DimensionsSchema: Describe<Dimensions> = type({
  value: sanitizeString(string()),
  unit: sanitizeString(string()),
});

export const AttributeSchema: Describe<Attribute> = type({
  name: optional(sanitizeString(string())),
  value: any(),
  type: optional(sanitizeString(string())),
});

export const FormatSchema: Describe<Format> = type({
  uri: sanitizeString(Uri),
  mimeType: sanitizeString(string()),
  hash: optional(sanitizeString(string())),
  fileSize: optional(number()),
  fileName: optional(sanitizeString(string())),
});

export const MetadataSchema: Describe<Metadata> = type({
  name: sanitizeString(string()),
  symbol: optional(sanitizeString(string())),
  decimals: optional(number()),
  description: optional(sanitizeString(string())),
  minter: optional(TezosAddress),
  creators: optional(array(sanitizeString(string()))),
  contributors: optional(array(sanitizeString(string()))),
  publishers: optional(array(sanitizeString(string()))),
  date: optional(sanitizeString(string())),
  blockLevel: optional(number()),
  type: optional(sanitizeString(string())),
  tags: optional(defaulted(removeEmptyStrings(array(sanitizeString(string()))), [])),
  genres: optional(array(sanitizeString(string()))),
  language: optional(sanitizeString(string())),
  identifier: optional(sanitizeString(string())),
  rights: optional(sanitizeString(string())),
  rightUri: optional(sanitizeString(Uri)),
  artifactUri: sanitizeString(Uri),
  displayUri: optional(sanitizeString(Uri)),
  thumbnailUri: optional(sanitizeString(Uri)),
  externalUri: optional(sanitizeString(Uri)),
  isTransferable: optional(defaulted(boolean(), true)),
  isBooleanAmount: optional(defaulted(boolean(), false)),
  shouldPreferSymbol: optional(defaulted(boolean(), false)),
  formats: optional(array(FormatSchema)),
  attributes: optional(array(AttributeSchema)),
});

export const MetadataBaseSchema: Describe<MetadataBase> = type({
  name: string(),
  artifactUri: Uri,
});

export const RoyaltySharesSchema: Describe<RoyaltyShares> = object({ decimals: number(), shares: record(TezosAddress, Royalty) });

export const ObjktcomOpenEditionArtistContractSchema: Describe<ObjktcomOpenEditionArtistContractStorage> = type({
  ledger: number(),
  locked: number(),
  supply: number(),
  claimed: number(),
  managers: number(),
  metadata: number(),
  operators: number(),
  administrator: string(),
  last_token_id: string(),
  token_metadata: number(),
});

export function cleanString(val: any, fallback = null) {
  try {
    return create(val, sanitizeString(string()));
  } catch (err) {
    return fallback;
  }
}

export function cleanUri(val: any, fallback = null) {
  try {
    return create(val, sanitizeString(Uri));
  } catch (err) {
    return fallback;
  }
}

export function cleanTezosAddress(val: any, fallback = null) {
  try {
    return create(val, sanitizeString(TezosAddress));
  } catch (err) {
    return fallback;
  }
}

export function cleanTags(val: any, fallback = []) {
  try {
    return create(val, defaulted(removeEmptyStrings(removeDuplicates(array(lowerCaseString(sanitizeString(string()))))), fallback));
  } catch (err) {
    return fallback;
  }
}

export function cleanCreators(val: any, fallback = []) {
  try {
    return create(val, defaulted(removeEmptyStrings(array(sanitizeString(string()))), fallback));
  } catch (err) {
    return fallback;
  }
}

export function cleanFormats(val: any, fallback = []) {
  try {
    return create(val, defaulted(array(FormatSchema), []));
  } catch (err) {
    return fallback;
  }
}

export function cleanAttributes(val: any, fallback = null) {
  try {
    return create(val, array(AttributeSchema));
  } catch (err) {
    return fallback;
  }
}
