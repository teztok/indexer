import ObjktAskV2Handler from './objkt_ask_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_ASK_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 170773706,
      level: 2105745,
      timestamp: '2022-02-10T13:01:54Z',
      block: 'BMYhQDTNkmSgKxabkJoNekLQvwACCqtMo2Wa27ZuBze9zFUGfCw',
      hash: 'opVpgjZYgKLYFw5nXKkBcE8EMJMNTXhUNjWCKVsUY5643BgwRxX',
      counter: 15958364,
      nonce: null,
      sender: {
        alias: 'oktu',
        address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      },
      target: {
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      parameter: {
        entrypoint: 'ask',
        value: {
          token: {
            address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
            token_id: '2',
          },
          amount: '20000',
          shares: [
            {
              amount: '500',
              recipient: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
            },
          ],
          target: null,
          currency: {
            tez: {},
          },
          editions: '10',
          expiry_time: null,
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 103258,
        offers: 103260,
        paused: false,
        big_map: 103261,
        metadata: 103259,
        upgradable: true,
        next_ask_id: '1000002',
        next_offer_id: '1000000',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103258,
          path: 'asks',
          action: 'add_key',
          content: {
            hash: 'expruAYg2AY2tSfvxx7Rf4mxtXZ7Myjd5h2T1feffhrJeRc4vyA61A',
            key: '1000001',
            value: {
              token: {
                address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
                token_id: '2',
              },
              amount: '20000',
              shares: [
                {
                  amount: '500',
                  recipient: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
                },
              ],
              target: null,
              creator: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
              currency: {
                tez: {},
              },
              editions: '10',
              expiry_time: null,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktAskV2Handler]);

  expect(events).toStrictEqual([
    {
      id: 'cf1adf9ddf988178882d8535e64a88cd',
      type: 'OBJKT_ASK_V2',
      opid: 170773706,
      ophash: 'opVpgjZYgKLYFw5nXKkBcE8EMJMNTXhUNjWCKVsUY5643BgwRxX',
      timestamp: '2022-02-10T13:01:54Z',
      level: 2105745,
      fa2_address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
      token_id: '2',
      ask_id: '1000001',
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      //artist_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ', // TODO
      currency: 'tez',
      price: '20000',
      amount: '10',
      // TODO: support royalty split
    },
  ]);
});
