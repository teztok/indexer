import ObjktBuyDutchAuctionHandlerV2 from './objkt_buy_dutch_auction_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_BUY_DUTCH_AUCTION_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 172704907,
      level: 2115331,
      timestamp: '2022-02-13T22:22:34Z',
      block: 'BLJPP6uFrPKxCER4tcSyPDet2NR4C1SL444SfvodCZjkRFw3eda',
      hash: 'ooniyKbJChaGDmwmVY7JHUZ3imUJvkUPHgVeaEvHC1qaGrhj53X',
      counter: 47965252,
      sender: {
        address: 'tz1ZZdLNgiA1ESH8MdrjzTzdypWPz8RKasc2',
      },
      target: {
        alias: 'objkt.com Dutch Auctions v2',
        address: 'KT1XXu88HkNzQRHNgAf7Mnq68LyS9MZJNoHP',
      },
      parameter: {
        entrypoint: 'buy',
        value: {
          proxy: null,
          amount: '11149675',
          auction_id: '1000023',
        },
      },
      amount: 11149675,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        paused: false,
        big_map: 103267,
        auctions: 103265,
        metadata: 103266,
        upgradable: true,
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        next_auction_id: '1000083',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103265,
          path: 'auctions',
          action: 'remove_key',
          content: {
            hash: 'expru1V6qAQjZy3tywh1YdFndR9YyawK6KTRT3hcs9bsq2L9MJc7QY',
            key: '1000023',
            value: {
              token: {
                address: 'KT1SnUZLQ4gVrQeapUvp6GY9UKKb4gAZJ8D9',
                token_id: '0',
              },
              shares: [
                {
                  amount: '500',
                  recipient: 'tz1bq5QazD43hBGxYxX8mv4sa1r1kz5sRGWz',
                },
              ],
              creator: 'tz1WaBEh29qiAEkkpJQA46GhkYSS8EBq4Qkp',
              currency: {
                tez: {},
              },
              editions: '1',
              end_time: '2022-02-13T23:07:09Z',
              end_price: '11000000',
              start_time: '2022-02-11T23:07:09Z',
              start_price: '12000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktBuyDutchAuctionHandlerV2]);

  expect(events).toStrictEqual([
    {
      id: '36c5272dcbfbce45ffe588ba919017c0',
      type: 'OBJKT_BUY_DUTCH_AUCTION_V2',
      implements: 'SALE',
      opid: 172704907,
      ophash: 'ooniyKbJChaGDmwmVY7JHUZ3imUJvkUPHgVeaEvHC1qaGrhj53X',
      timestamp: '2022-02-13T22:22:34Z',
      level: 2115331,
      fa2_address: 'KT1SnUZLQ4gVrQeapUvp6GY9UKKb4gAZJ8D9',
      token_id: '0',
      seller_address: 'tz1WaBEh29qiAEkkpJQA46GhkYSS8EBq4Qkp',
      buyer_address: 'tz1ZZdLNgiA1ESH8MdrjzTzdypWPz8RKasc2',
      currency: 'tez',
      start_time: '2022-02-11T23:07:09Z',
      end_time: '2022-02-13T23:07:09Z',
      amount: '1',
      start_price: '12000000',
      end_price: '11000000',
      price: '11149675',
      auction_id: '1000023',
    },
  ]);
});
