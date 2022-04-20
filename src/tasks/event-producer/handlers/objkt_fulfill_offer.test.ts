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
      // artist_address: 'tz1iZ2TPEShFC8TqHsXLA9RXdV7tSv8E3aLe', TODO: add
    },
  ]);
});
