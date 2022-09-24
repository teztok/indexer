import FxCollectHandler from './fx_collect';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_COLLECT events', async () => {
  const transactions: Transactions = [
    {
      id: 108221561,
      level: 1853721,
      timestamp: '2021-11-11T05:03:18Z',
      block: 'BM4NuEfD8TW2FLywiz5JTBWqiW9TGHkutCxqwvYoiQX6Xge5TpD',
      hash: 'opGhFbP2TobRH3ChmnfkyvS6PeLNLrJi4hjiwp2UJo5jqECFjL2',
      counter: 1583451,
      nonce: null,
      sender: {
        address: 'tz1UXV2pDd8DM3Jicru3o6fZZfHeKnBYbs4H',
      },
      target: {
        alias: 'FXHASH Marketplace',
        address: 'KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9',
      },
      parameter: {
        entrypoint: 'collect',
        value: '2',
      },
      amount: 10000000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '25',
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        objkts: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
        offers: 22799,
        counter: '3',
        enabled: true,
        metadata: 22798,
        treasury: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 22799,
          path: 'offers',
          action: 'update_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              price: '10000000',
              issuer: 'tz1X1vYvUhXRuedJigE8aFY5ALDnbQPd1MeR',
              creator: 'tz1SawhUHXWjiGK8gPK6QPmn95G8PkkSjA3S',
              objkt_id: '363',
              royalties: '100',
              objkt_amount: '0',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxCollectHandler]);

  expect(events).toStrictEqual([
    {
      id: 'ee4eb6ba24c70bc2d8e225a6e75d570d',
      type: 'FX_COLLECT',
      implements: 'SALE',
      opid: '108221561',
      ophash: 'opGhFbP2TobRH3ChmnfkyvS6PeLNLrJi4hjiwp2UJo5jqECFjL2',
      timestamp: '2021-11-11T05:03:18Z',
      level: 1853721,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '363',
      offer_id: '2',
      artist_address: 'tz1SawhUHXWjiGK8gPK6QPmn95G8PkkSjA3S',
      seller_address: 'tz1X1vYvUhXRuedJigE8aFY5ALDnbQPd1MeR',
      buyer_address: 'tz1UXV2pDd8DM3Jicru3o6fZZfHeKnBYbs4H',
      price: '10000000',
    },
  ]);
});
