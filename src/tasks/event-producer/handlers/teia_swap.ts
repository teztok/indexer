import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { TEIA_CONTRACT_MARKETPLACE } from '../../../consts';
import {
  tokenEventFields,
  artistAddressField,
  sellerAddressField,
  swapIdField,
  priceField,
  royaltiesField,
  amountField,
} from '../event-fields-meta';

export const EVENT_TYPE_TEIA_SWAP = 'TEIA_SWAP';

export interface TeiaSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_TEIA_SWAP;
  seller_address: string;
  artist_address: string;
  swap_id: string;
  price: string;
  amount: string;
  royalties: string;
}

const TeiaSwapEventSchema: Describe<Omit<TeiaSwapEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),

  artist_address: TezosAddress,
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  price: PgBigInt,
  royalties: PgBigInt,
  amount: PgBigInt,
});

const TeiaSwapHandler: TransactionHandler<TeiaSwapEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_TEIA_SWAP,

  meta: {
    eventDescription: `A token was swapped on the Teia marketplace contract (marketplace contract: KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w).`,
    eventFields: [...tokenEventFields, artistAddressField, sellerAddressField, swapIdField, priceField, royaltiesField, amountField],
  },

  accept: {
    entrypoint: 'swap',
    target_address: TEIA_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = String(parseInt(get(transaction, 'storage.counter'), 10) - 1);
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'parameter.value.fa2');
    const tokenId = get(transaction, 'parameter.value.objkt_id');
    const price = get(transaction, 'parameter.value.xtz_per_objkt');
    const royalties = get(transaction, 'parameter.value.royalties');
    const amount = get(transaction, 'parameter.value.objkt_amount');
    const artistAddress = get(transaction, 'parameter.value.creator');
    const id = createEventId(TEIA_CONTRACT_MARKETPLACE, transaction);

    const event: TeiaSwapEvent = {
      id,
      type: EVENT_TYPE_TEIA_SWAP,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      artist_address: artistAddress,
      swap_id: swapId,
      price: price,
      royalties: royalties,
      amount: amount,
    };

    assert(omit(event, ['type']), TeiaSwapEventSchema);

    return event;
  },
};

export default TeiaSwapHandler;
