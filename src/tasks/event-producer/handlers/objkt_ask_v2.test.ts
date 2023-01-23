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
    {
      id: 160016305750016,
      level: 2106416,
      timestamp: '2022-02-10T18:37:24Z',
      block: 'BLLu6firaER2CuXkfi4uYXDavdDVHXiBb2UdQcw5Vmg3j6Jsqvi',
      hash: 'onrJtnWxki1XyRCPzKi5WUatiN8QCmR9aGoDG1iWfoXWrev59yR',
      counter: 20571088,
      sender: {
        address: 'tz1XiiTWAVzGk9Sq7hDmbpdZVCopubFmkY8F',
      },
      target: {
        alias: 'objkt.com Marketplace v2',
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      amount: 0,
      parameter: {
        entrypoint: 'ask',
        value: {
          token: {
            address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
            token_id: '300343',
          },
          amount: '55000000',
          shares: [
            {
              amount: '2500',
              recipient: 'tz1P3LVXdgtMmWfvag98ELYvA45KsMaSCd3W',
            },
          ],
          target: null,
          currency: {
            tez: {},
          },
          editions: '1',
          expiry_time: null,
        },
      },
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
        next_ask_id: '1000010',
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
            hash: 'exprvFercbGPFfKB5YGvzrDxQQdRC6Ho7CvDwVEFYyggdpkfTtXnoR',
            key: '1000009',
            value: {
              token: {
                address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
                token_id: '300343',
              },
              amount: '55000000',
              shares: [
                {
                  amount: '2500',
                  recipient: 'tz1P3LVXdgtMmWfvag98ELYvA45KsMaSCd3W',
                },
              ],
              target: null,
              creator: 'tz1XiiTWAVzGk9Sq7hDmbpdZVCopubFmkY8F',
              currency: {
                tez: {},
              },
              editions: '1',
              expiry_time: null,
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktAskV2Handler]);

  expect(events).toStrictEqual([
    {
      id: 'cf1adf9ddf988178882d8535e64a88cd',
      type: 'OBJKT_ASK_V2',
      opid: '170773706',
      ophash: 'opVpgjZYgKLYFw5nXKkBcE8EMJMNTXhUNjWCKVsUY5643BgwRxX',
      timestamp: '2022-02-10T13:01:54Z',
      level: 2105745,
      fa2_address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
      token_id: '2',
      ask_id: '1000001',
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      currency: 'tez',
      price: '20000',
      amount: '10',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu: '500',
        },
      },
    },
    {
      amount: '1',
      ask_id: '1000009',
      currency: 'tez',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      id: '2d854f60cd97d9780176191ebc125395',
      level: 2106416,
      ophash: 'onrJtnWxki1XyRCPzKi5WUatiN8QCmR9aGoDG1iWfoXWrev59yR',
      opid: '160016305750016',
      price: '55000000',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1P3LVXdgtMmWfvag98ELYvA45KsMaSCd3W: '2500',
        },
      },
      seller_address: 'tz1XiiTWAVzGk9Sq7hDmbpdZVCopubFmkY8F',
      timestamp: '2022-02-10T18:37:24Z',
      token_id: '300343',
      type: 'OBJKT_ASK_V2',
    },
  ]);
});
