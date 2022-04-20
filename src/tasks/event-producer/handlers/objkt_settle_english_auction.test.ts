import ObjktSettleEnglishAuctionHandler from './objkt_settle_english_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_SETTLE_ENGLISH_AUCTION events', async () => {
  const transactions: Transactions = [
    {
      id: 170948586,
      level: 2106338,
      timestamp: '2022-02-10T17:58:24Z',
      block: 'BLU81fg6FkKNsqR8GRhPNdnAcS3WihF1qeNp2uKNMnoP6Vvk7Ss',
      hash: 'ooedR95DFKAsEGvGnkTZcGQofiaKzmNwdbC43g5rTiCzvrfdcDZ',
      counter: 49889104,
      sender: {
        address: 'tz1PLNscHFFHxYZLXnaeSxDqnC7pvM5Ran6E',
      },
      target: {
        alias: 'objkt.com English Auctions v2',
        address: 'KT18p94vjkkHYY3nPmernmgVR7HdZFzE7NAk',
      },
      parameter: {
        entrypoint: 'settle_auction',
        value: '1000002',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        paused: false,
        big_map: 103264,
        auctions: 103262,
        metadata: 103263,
        upgradable: true,
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        next_auction_id: '1000005',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103262,
          path: 'auctions',
          action: 'remove_key',
          content: {
            hash: 'exprvBPmeMFPsUgdfWCa6Aa1bCfZCbnGRPRiLibBtPbgidTGamE2dn',
            key: '1000002',
            value: {
              token: {
                address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
                token_id: '2',
              },
              shares: [
                {
                  amount: '500',
                  recipient: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
                },
              ],
              creator: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
              reserve: '1200000',
              currency: {
                fa12: 'KT1TjnZYs5CGLbmV6yuW169P8Pnr9BiVwwjz',
              },
              end_time: '2022-02-10T17:54:18Z',
              start_time: '2022-02-10T17:48:18Z',
              current_price: '0',
              extension_time: '600',
              highest_bidder: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
              price_increment: '1000000',
            },
          },
        },
      ],
    },
    {
      id: 171048203,
      level: 2106713,
      timestamp: '2022-02-10T21:08:14Z',
      block: 'BMXFA4Gghepia1MUQwfU5GprxnZjyaeKuCSCCQENEeUp1zbRuvm',
      hash: 'opL5UYA8haCtw7qRRBp5tv935J87F35PBhjEiChexni7KbNcyNT',
      counter: 49889121,
      sender: {
        address: 'tz1PLNscHFFHxYZLXnaeSxDqnC7pvM5Ran6E',
      },
      target: {
        alias: 'objkt.com English Auctions v2',
        address: 'KT18p94vjkkHYY3nPmernmgVR7HdZFzE7NAk',
      },
      parameter: {
        entrypoint: 'settle_auction',
        value: '1000023',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        paused: false,
        big_map: 103264,
        auctions: 103262,
        metadata: 103263,
        upgradable: true,
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        next_auction_id: '1000084',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103262,
          path: 'auctions',
          action: 'remove_key',
          content: {
            hash: 'expru1V6qAQjZy3tywh1YdFndR9YyawK6KTRT3hcs9bsq2L9MJc7QY',
            key: '1000023',
            value: {
              token: {
                address: 'KT1PooRxUckYjnWVvn9CetZxC9YeG1kkFYW5',
                token_id: '5217',
              },
              shares: [
                {
                  amount: '1000',
                  recipient: 'tz2ANxo2gjHxkxAv5cLW8utqNi1SFdXkZ4v5',
                },
              ],
              creator: 'tz2Wk3Wn3zTsUTWsoWDWAmWxXs7ivByoSYAq',
              reserve: '3000000',
              currency: {
                fa12: 'KT1TjnZYs5CGLbmV6yuW169P8Pnr9BiVwwjz',
              },
              end_time: '2022-02-10T20:56:13Z',
              start_time: '2022-02-10T18:56:13Z',
              current_price: '3000000',
              extension_time: '600',
              highest_bidder: 'tz1YvQnu8Wnw59f8onYuuBgnNZVKF4fMJssG',
              price_increment: '1000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktSettleEnglishAuctionHandler]);

  expect(events).toStrictEqual([
    {
      id: '1f161b85b8c7e0754af403ce3b3e126c',
      type: 'OBJKT_SETTLE_ENGLISH_AUCTION',
      opid: 170948586,
      ophash: 'ooedR95DFKAsEGvGnkTZcGQofiaKzmNwdbC43g5rTiCzvrfdcDZ',
      timestamp: '2022-02-10T17:58:24Z',
      level: 2106338,
      fa2_address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
      token_id: '2',
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      buyer_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',

      currency: 'otez',
      reserve: '1200000',
      start_time: '2022-02-10T17:48:18Z',
      end_time: '2022-02-10T17:54:18Z',
      price: '0',
      extension_time: '600',
      price_increment: '1000000',
      auction_id: '1000002',
    },
    {
      id: '5bf4b61e94dd0d5abe87e594c781c97d',
      type: 'OBJKT_SETTLE_ENGLISH_AUCTION',
      implements: 'SALE',
      opid: 171048203,
      ophash: 'opL5UYA8haCtw7qRRBp5tv935J87F35PBhjEiChexni7KbNcyNT',
      timestamp: '2022-02-10T21:08:14Z',
      level: 2106713,
      fa2_address: 'KT1PooRxUckYjnWVvn9CetZxC9YeG1kkFYW5',
      token_id: '5217',
      seller_address: 'tz2Wk3Wn3zTsUTWsoWDWAmWxXs7ivByoSYAq',
      buyer_address: 'tz1YvQnu8Wnw59f8onYuuBgnNZVKF4fMJssG',

      currency: 'otez',
      reserve: '3000000',
      start_time: '2022-02-10T18:56:13Z',
      end_time: '2022-02-10T20:56:13Z',
      price: '3000000',
      extension_time: '600',
      price_increment: '1000000',
      auction_id: '1000023',
    },
  ]);
});
