import get from 'lodash/get';
import keyBy from 'lodash/keyBy';
import omit from 'lodash/omit';
import { assert, object, string, optional, Describe } from 'superstruct';
import { TezosAddress, IsoDateString, PositiveInteger, PgBigInt, ContractAddress } from '../../../lib/validators';
import { Handler, TokenEvent, Transaction, MintEvent, SaleEventInterface } from '../../../types';
import { findDiff, createEventId } from '../../../lib/utils';
import * as eventsDao from '../../../lib/daos/events';
import { VERSUM_CONTRACT_MARKETPLACE, SALE_INTERFACE } from '../../../consts';
import { EVENT_TYPE_VERSUM_MINT } from './versum_mint';

export const EVENT_TYPE_VERSUM_COLLECT_SWAP = 'VERSUM_COLLECT_SWAP';

export interface VersumCollectEvent extends TokenEvent {
  type: typeof EVENT_TYPE_VERSUM_COLLECT_SWAP;
  implements: SaleEventInterface;
  buyer_address: string;
  seller_address: string;
  artist_address?: string;
  swap_id: string;
  price: string;
  amount: string;
}

const VersumCollectEventSchema: Describe<Omit<VersumCollectEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
  artist_address: optional(TezosAddress),
  swap_id: PgBigInt,
  price: PgBigInt,
  amount: PgBigInt,
});

export async function addArtistAddress<T extends TokenEvent>(events: Array<T>) {
  const mintEvents = (await eventsDao.getMatchingEvents(
    events.map((event) => ({
      type: EVENT_TYPE_VERSUM_MINT,
      fa2_address: event.fa2_address,
      token_id: event.token_id,
    }))
  )) as Array<MintEvent>;

  const mintEventsByFa2AddressAndTokenId = keyBy(mintEvents, ({ fa2_address, token_id }) => `${fa2_address}-${token_id}`);

  return events.map((event) => {
    const id = `${event.fa2_address}-${event.token_id}`;
    const mintEvent = mintEventsByFa2AddressAndTokenId[id] ? mintEventsByFa2AddressAndTokenId[id] : null;

    if (!mintEvent) {
      return event;
    }

    console.log(`added artist address ${event.id}:`, mintEvent.artist_address);

    return {
      ...event,
      artist_address: mintEvent.artist_address,
    };
  });
}

const VersumCollectSwapHandler: Handler<Transaction, VersumCollectEvent> = {
  type: EVENT_TYPE_VERSUM_COLLECT_SWAP,

  accept: {
    entrypoint: 'collect_swap',
    target_address: VERSUM_CONTRACT_MARKETPLACE,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value.swap_id');
    const amount = get(transaction, 'parameter.value.amount');
    const price = String(get(transaction, 'amount'));
    const buyerAddress = get(transaction, 'sender.address');
    const diff = findDiff(transaction.diffs!, 75634, 'swaps', ['update_key', 'remove_key'], swapId);
    const fa2Address = get(diff, 'content.value.token.address');
    const tokenId = get(diff, 'content.value.token.nat');
    const sellerAddress = get(diff, 'content.value.seller');
    const id = createEventId(EVENT_TYPE_VERSUM_COLLECT_SWAP, transaction);

    const event: VersumCollectEvent = {
      id,
      type: EVENT_TYPE_VERSUM_COLLECT_SWAP,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      buyer_address: buyerAddress,
      seller_address: sellerAddress,
      swap_id: swapId,
      price: price,
      amount: amount,
    };

    assert(omit(event, ['type', 'implements']), VersumCollectEventSchema);

    return event;
  },

  // postProcess: addArtistAddress,
};

export default VersumCollectSwapHandler;
