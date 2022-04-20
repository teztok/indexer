import ObjktFulfillAskV2Handler from './objkt_fulfill_ask_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_FULFILL_ASK_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 170995822,
      level: 2106438,
      timestamp: '2022-02-10T18:48:24Z',
      block: 'BMZECLrfH4bQiru5zy5k8gFnkYZ4GKe5MgNBRWyinVdXmHhjLW2',
      hash: 'ongfvZydFy7468gbUTukLEs4VpGyvxFvjWWrAxSNxvYHH7CsPHp',
      counter: 47761711,
      sender: {
        address: 'tz1cgAJDiPHM8HYX8nfvRuXgaBEZeJFgGw3K',
      },
      target: {
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      parameter: {
        entrypoint: 'fulfill_ask',
        value: {
          proxy: null,
          ask_id: '1000004',
        },
      },
      amount: 5000000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 103258,
        offers: 103260,
        paused: false,
        big_map: 103261,
        metadata: 103259,
        upgradable: true,
        next_ask_id: '1000063',
        next_offer_id: '1000004',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103258,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'exprtiZj4GFjA6uQsGKGFEYtR783FMLUJf3qKJhHvGSE5N3WrsJzM9',
            key: '1000004',
            value: {
              token: {
                address: 'KT1FReMp4U1KipyH53xXUnnjtdRQZaLnQpUj',
                token_id: '567',
              },
              amount: '5000000',
              shares: [
                {
                  amount: '1000',
                  recipient: 'tz1KyEhffNDKBZASZL7q6JerqAp1r8mqj2Lp',
                },
              ],
              target: null,
              creator: 'tz1f6Kdmw8tCgirihestPV4duyXzdMaFCmAw',
              currency: {
                tez: {},
              },
              editions: '1',
              expiry_time: null,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktFulfillAskV2Handler]);

  expect(events).toStrictEqual([
    {
      id: '9909b01937459a2ba0d6facf413b5ee1',
      type: 'OBJKT_FULFILL_ASK_V2',
      implements: 'SALE',
      opid: 170995822,
      ophash: 'ongfvZydFy7468gbUTukLEs4VpGyvxFvjWWrAxSNxvYHH7CsPHp',
      timestamp: '2022-02-10T18:48:24Z',
      level: 2106438,
      price: '5000000',
      fa2_address: 'KT1FReMp4U1KipyH53xXUnnjtdRQZaLnQpUj',
      token_id: '567',
      ask_id: '1000004',
      seller_address: 'tz1f6Kdmw8tCgirihestPV4duyXzdMaFCmAw',
      buyer_address: 'tz1cgAJDiPHM8HYX8nfvRuXgaBEZeJFgGw3K',
      amount: '1',
    },
  ]);
});
