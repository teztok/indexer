import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { TezosAddress, ContractAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction, SaleEventInterface } from '../../../types';
import { createEventId, findDiff } from '../../../lib/utils';
import { FX_CONTRACT_MARKETPLACE_V3, GENTK_VERSION_TO_FA2_CONTRACT_MAPPING, SALE_INTERFACE } from '../../../consts';

export const EVENT_TYPE_FX_LISTING_ACCEPT = 'FX_LISTING_ACCEPT';

export interface FxListingAcceptEvent extends TokenEvent {
  type: typeof EVENT_TYPE_FX_LISTING_ACCEPT;
  implements: SaleEventInterface;
  swap_id: string;
  price: string;
  buyer_address: string;
  seller_address: string;
}

const FxListingAcceptEventSchema: Describe<Omit<FxListingAcceptEvent, 'type' | 'implements'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
  swap_id: PgBigInt,
  price: PgBigInt,
  buyer_address: TezosAddress,
  seller_address: TezosAddress,
});

const FxListingAcceptHandler: TransactionHandler<FxListingAcceptEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_FX_LISTING_ACCEPT,

  description: `A listing was accepted on fxhash (marketplace contract: KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u).`,

  accept: {
    entrypoint: 'listing_accept',
    target_address: FX_CONTRACT_MARKETPLACE_V3,
  },

  exec: (transaction) => {
    const swapId = get(transaction, 'parameter.value');
    const diff = findDiff(get(transaction, 'diffs')!, 149787, 'listings', ['remove_key'], swapId);
    const tokenId = get(diff, 'content.value.gentk.id');

    const gentkVersion = get(diff, 'content.value.gentk.version');

    if (!(gentkVersion in GENTK_VERSION_TO_FA2_CONTRACT_MAPPING)) {
      throw new Error(`unsupported gentk version: ${gentkVersion}`);
    }

    const fa2Address = GENTK_VERSION_TO_FA2_CONTRACT_MAPPING[gentkVersion];
    const sellerAddress = get(diff, 'content.value.seller');
    const buyerAddress = get(transaction, 'sender.address');
    const price = get(diff, 'content.value.price');
    const id = createEventId(EVENT_TYPE_FX_LISTING_ACCEPT, transaction);

    const event: FxListingAcceptEvent = {
      id,
      type: EVENT_TYPE_FX_LISTING_ACCEPT,
      implements: SALE_INTERFACE,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
      swap_id: swapId,
      seller_address: sellerAddress,
      buyer_address: buyerAddress,
      price,
    };

    assert(omit(event, ['type', 'implements']), FxListingAcceptEventSchema);

    return event;
  },
};

export default FxListingAcceptHandler;
