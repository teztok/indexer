import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe, optional, boolean } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { VERSUM_CONTRACT_MARKETPLACE } from '../../../consts';

export const EVENT_TYPE_VERSUM_SWAP = 'VERSUM_SWAP';

export interface VersumSwapEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_SWAP;
  seller_address: string;
  artist_address?: string;
  swap_id: string;
  start_price: string;
  end_price: string;
  end_time?: string;
  amount: string;
  burn_on_end: boolean;
}

const VersumSwapEventSchema: Describe<Omit<VersumSwapEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  artist_address: optional(TezosAddress),
  seller_address: TezosAddress,
  swap_id: PgBigInt,
  start_price: PgBigInt,
  end_price: PgBigInt,
  end_time: optional(IsoDateString),
  amount: PgBigInt,
  burn_on_end: boolean(),
});

const VersumSwapHandler: Handler<Transaction, VersumSwapEvent> = {
  type: EVENT_TYPE_VERSUM_SWAP,

  accept: {
    entrypoint: 'create_swap',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = String(parseInt(get(transaction, 'storage.swap_counter'), 10) - 1);
    const sellerAddress = get(transaction, 'sender.address');
    const fa2Address = get(transaction, 'parameter.value.token.address');
    const tokenId = get(transaction, 'parameter.value.token.nat');
    const startingPrice = get(transaction, 'parameter.value.starting_price_in_nat');
    const endingPrice = get(transaction, 'parameter.value.ending_price_in_nat');
    const endingTime = get(transaction, 'parameter.value.ending_time');
    const currency = get(transaction, 'parameter.value.currency');
    const amount = get(transaction, 'parameter.value.token_amount');
    const burnOnEnd = get(transaction, 'parameter.value.burn_on_end');
    const id = createEventId(EVENT_TYPE_VERSUM_SWAP, transaction);

    if (currency !== null) {
      throw new Error('unsupported currency');
    }

    const event: VersumSwapEvent = {
      id,
      type: EVENT_TYPE_VERSUM_SWAP,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      seller_address: sellerAddress,
      start_price: startingPrice,
      end_price: endingPrice,
      swap_id: swapId,
      amount: amount,
      burn_on_end: burnOnEnd,
    };

    if (endingTime) {
      event.end_time = endingTime;
    }

    assert(omit(event, ['type']), VersumSwapEventSchema);

    return event;
  },
};

export default VersumSwapHandler;
