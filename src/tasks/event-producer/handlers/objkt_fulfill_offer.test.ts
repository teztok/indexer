import ObjktFulfillOfferHandler from './objkt_fulfill_offer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_FULFILL_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 171012851,
      level: 2106532,
      timestamp: '2022-02-10T19:35:24Z',
      block: 'BMMUEoqZY6RAZxx3VFm7vaNFiimwy1jfPFAL6pnRUSXtpwGKt3E',
      hash: 'onk171Yp9EzB9n7QdrDSr84LHaaueadTPsmruwhRPUypvwRTFSv',
      counter: 34838814,
      sender: {
        alias: 'Narisofka',
        address: 'tz2PSYEYJff71Vi2qnUd5kUu7efMRzaCEnK2',
      },
      target: {
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      parameter: {
        entrypoint: 'fulfill_offer',
        value: {
          offer_id: '1000012',
          token_id: '0',
        },
      },
      amount: 0,
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
        next_ask_id: '1000249',
        next_offer_id: '1000024',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103260,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'exprtgKHjv98gxmkEPFg8Fm2XJib31Tpe9buhwp2ASLmz8id9hJyQr',
            key: '1000012',
            value: {
              token: {
                address: 'KT1UJubKkif4y4W8MFFfJ3BNum717n92LmUK',
                token_id: '0',
              },
              amount: '8000000',
              shares: [
                {
                  amount: '1500',
                  recipient: 'tz2PSYEYJff71Vi2qnUd5kUu7efMRzaCEnK2',
                },
              ],
              target: null,
              creator: 'tz1aLySy25NTVivCzPhCfHsVwZ38ZT2u7tAi',
              currency: {
                tez: {},
              },
              expiry_time: null,
            },
          },
        },
      ],
    },
    {
      id: 212174403,
      level: 2300110,
      timestamp: '2022-04-21T15:10:59Z',
      block: 'BLiMKSBbstJynTFMCqP7zAtZpvA4xcLt4zR31BX5L99UtXAyRQ3',
      hash: 'oobEcddAjV1UWi7EjEgpWT6ZrDLDrGGCRrqxqBdZ7u17PB6WNvT',
      counter: 41306227,
      sender: {
        alias: 'pseudosufism',
        address: 'tz2WCHSSnwGmXt6CiHUXhLwgZvuEji3sc8Gv',
      },
      target: {
        alias: 'objkt.com Marketplace v2',
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      amount: 0,
      parameter: {
        entrypoint: 'fulfill_offer',
        value: {
          offer_id: '1108443',
          token_id: '2189',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 103258,
        offers: 103260,
        paused: false,
        big_map: 103261,
        metadata: 103259,
        upgradable: false,
        next_ask_id: '1347918',
        next_offer_id: '1114785',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1DF2c7VUED7W3h5BnqUKdB87Ke7XdCjQiY',
      },
      diffs: [
        {
          bigmap: 103260,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'exprthr1quxEvvCrxt7CcXRxEQnSwo664CyHpMiinoWhwFfkScBDPd',
            key: '1108443',
            value: {
              token: {
                address: 'KT1BqfEQFrfx3h2wWQo7gTM1SE6FpH1Y5pqK',
                token_id: null,
              },
              amount: '8450000',
              shares: [
                {
                  amount: '600',
                  recipient: 'tz1bKM4FRgAsGdDWzXs4o5HZdjBbLMbPBAA1',
                },
              ],
              target: null,
              creator: 'tz1Ziaxoio55wxE9UWpXnaMgRtSN3VBhgGTX',
              currency: {
                tez: {},
              },
              expiry_time: null,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktFulfillOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: '6912624af7a500ed5b0fb043d1fc3b20',
      type: 'OBJKT_FULFILL_OFFER',
      implements: 'SALE',
      opid: 171012851,
      ophash: 'onk171Yp9EzB9n7QdrDSr84LHaaueadTPsmruwhRPUypvwRTFSv',
      timestamp: '2022-02-10T19:35:24Z',
      level: 2106532,
      price: '8000000',
      fa2_address: 'KT1UJubKkif4y4W8MFFfJ3BNum717n92LmUK',
      token_id: '0',
      offer_id: '1000012',
      seller_address: 'tz2PSYEYJff71Vi2qnUd5kUu7efMRzaCEnK2',
      buyer_address: 'tz1aLySy25NTVivCzPhCfHsVwZ38ZT2u7tAi',
    },
    {
      id: 'dedc2158555b15d20945bcc271c7e897',
      type: 'OBJKT_FULFILL_OFFER',
      implements: 'SALE',
      opid: 212174403,
      ophash: 'oobEcddAjV1UWi7EjEgpWT6ZrDLDrGGCRrqxqBdZ7u17PB6WNvT',
      timestamp: '2022-04-21T15:10:59Z',
      level: 2300110,
      price: '8450000',
      fa2_address: 'KT1BqfEQFrfx3h2wWQo7gTM1SE6FpH1Y5pqK',
      token_id: '2189',
      offer_id: '1108443',
      seller_address: 'tz2WCHSSnwGmXt6CiHUXhLwgZvuEji3sc8Gv',
      buyer_address: 'tz1Ziaxoio55wxE9UWpXnaMgRtSN3VBhgGTX',
    },
  ]);
});
