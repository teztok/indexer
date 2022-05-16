import { number, string, refine, define } from 'superstruct';
import isString from 'lodash/isString';
import { validateAddress, ValidationResult } from '@taquito/utils';
import { SALE_INTERFACE } from '../consts';
import { isValidISODateString } from 'iso-datestring-validator';
import isIPFS from 'is-ipfs';

const stringIsAValidUrl = (value: string, protocols: Array<string>) => {
  try {
    const url = new URL(value);
    return protocols ? (url.protocol ? protocols.map((x) => `${x.toLowerCase()}:`).includes(url.protocol) : false) : true;
  } catch (err) {
    return false;
  }
};

export const isValidTezosAddress = (value: unknown) => validateAddress(value) === ValidationResult.VALID;

// for now we will treat bigints as string.
export const PgBigInt = define<string>('PgBigInt', (value) => {
  try {
    return typeof value === 'string' && BigInt(value) <= 9223372036854775807;
  } catch (err) {
    return false;
  }
});

export const TezosAddress = define<string>('TezosAddress', (value) => validateAddress(value) === ValidationResult.VALID);

export const ContractAddress = define<string>('ContractAddress', (value) => isValidTezosAddress(value));

export const IsoDateString = define<string>('IsoDateString', (value) => (isString(value) ? isValidISODateString(value as string) : false));

export const SaleInterface = define<string>('SaleInterface', (value) => (isString(value) ? value === SALE_INTERFACE : false));

export const Uri = define<string>('Uri', (value) => {
  if (!isString(value)) {
    return false;
  }

  try {
    new URL(value);
    return true;
  } catch (err) {
    return false;
  }
});

// https://gitlab.com/tezos/tzip/-/blob/master/proposals/tzip-16/tzip-16.md#metadata-uris
// see https://tzip.tezosagora.org/proposal/tzip-21/
export const MetadataUri = define<string>('MetadataUri', (value) => {
  if (!isString(value)) {
    return false;
  }

  const lowerCasedValue = value.toLowerCase();

  if (lowerCasedValue.startsWith('tezos-storage:')) {
    // TODO: do further validation
    true;
  }

  if (lowerCasedValue.startsWith('ipfs://')) {
    const cid = value.substr(7);
    return isIPFS.cid(cid) || isIPFS.cidPath(cid);
  }

  if (lowerCasedValue.startsWith('http://') || lowerCasedValue.startsWith('https://') || lowerCasedValue.startsWith('sha256://')) {
    return stringIsAValidUrl(value, ['http', 'https', 'sha256']);
  }

  return false;
});

export const PositiveInteger = refine(number(), 'PositiveInteger', (value) => value >= 0 && Number.isInteger(value));

export const Royalty = define<string>('Royalty', (value) => {
  try {
    const intValue = parseInt(value as string, 10);

    if (!Number.isInteger(intValue)) {
      return false;
    }

    return intValue >= 0;
  } catch (err) {
    return false;
  }
});
