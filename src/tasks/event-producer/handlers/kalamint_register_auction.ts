import get from 'lodash/get';
import omit from 'lodash/omit';
import { assert, object, string, Describe } from 'superstruct';
import { ContractAddress, TezosAddress, IsoDateString, PositiveInteger, PgBigInt } from '../../../lib/validators';
import { TransactionHandler, TokenEvent, Transaction } from '../../../types';
import { createEventId } from '../../../lib/utils';
import { KALAMINT_CONTRACT_FA2 } from '../../../consts';

export const EVENT_TYPE_KALAMINT_REGISTER_AUCTION = 'KALAMINT_REGISTER_AUCTION';

export interface KalamintRegisterAuctionEvent extends TokenEvent {
  type: typeof EVENT_TYPE_KALAMINT_REGISTER_AUCTION;
}

const KalamintRegisterAuctionEventSchema: Describe<Omit<KalamintRegisterAuctionEvent, 'type'>> = object({
  id: string(),
  opid: PgBigInt,
  timestamp: IsoDateString,
  level: PositiveInteger,
  fa2_address: ContractAddress,
  token_id: string(),
  ophash: string(),
});

const KalamintRegisterAuctionHandler: TransactionHandler<KalamintRegisterAuctionEvent> = {
  source: 'transaction',

  type: EVENT_TYPE_KALAMINT_REGISTER_AUCTION,

  accept: {
    entrypoint: 'register_auction',
    target_address: KALAMINT_CONTRACT_FA2,
  },

  exec: (transaction) => {
    const tokenId = get(transaction, 'parameter.value.token_id');
    const fa2Address = get(transaction, 'target.address');
    const id = createEventId(EVENT_TYPE_KALAMINT_REGISTER_AUCTION, transaction);

    const event: KalamintRegisterAuctionEvent = {
      id,
      type: EVENT_TYPE_KALAMINT_REGISTER_AUCTION,
      opid: String(transaction.id),
      ophash: transaction.hash,
      timestamp: transaction.timestamp,
      level: transaction.level,
      fa2_address: fa2Address,
      token_id: tokenId,
    };

    assert(omit(event, ['type']), KalamintRegisterAuctionEventSchema);

    return event;
  },
};

export default KalamintRegisterAuctionHandler;
