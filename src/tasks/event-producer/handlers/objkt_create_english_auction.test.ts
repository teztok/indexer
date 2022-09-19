import ObjktCreateEnglishAuctionHandler from './objkt_create_english_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CREATE_ENGLISH_AUCTION events', async () => {
  const transactions: Transactions = [
    // CONTRACT V1
    {
      id: 57866989,
      level: 1539489,
      timestamp: '2021-07-01T20:19:38Z',
      block: 'BLJ75y1e8Tx51cozNorBfJuZVa8nbyuBDcFT8dVn83j6ZcsxfH5',
      hash: 'opTh8g5Fn7VvkgfGPjH9w1TAAtUn5o5AT5VUfKtkippyG2WGd18',
      counter: 11549426,
      nonce: null,
      sender: {
        alias: 'NFT PROTECTOR',
        address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      },
      target: {
        alias: 'objkt.com English Auctions Old',
        address: 'KT1Wvk8fon9SgNEPQKewoSL2ziGGuCQebqZc',
      },
      parameter: {
        entrypoint: 'create_auction',
        value: {
          fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
          artist: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
          reserve: '50000000',
          end_time: '2021-07-02T20:18:42Z',
          objkt_id: '77565',
          royalties: '250',
          start_time: '2021-07-01T20:18:42Z',
          extension_time: '600',
          price_increment: '1000000',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5904,
        metadata: 5905,
        auction_id: '2',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5904,
          path: 'auctions',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '0',
              artist: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
              creator: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
              reserve: '50000000',
              end_time: '2021-07-02T20:18:42Z',
              objkt_id: '77565',
              royalties: '250',
              start_time: '2021-07-01T20:18:42Z',
              current_price: '0',
              extension_time: '600',
              highest_bidder: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
              price_increment: '1000000',
            },
          },
        },
      ],
    },

    // CONTRACT V2
    {
      id: 58437179,
      level: 1544460,
      timestamp: '2021-07-05T20:47:26Z',
      block: 'BLjBqoNqV9yM6QEkfEV6khLy6PqWNiDAnWeQ3RxZNnuPxMp6F2h',
      hash: 'ooQMF1GJGfZHpckAVpG75EYhtY1zyegLsUgKJG1NWT919MGfWvy',
      counter: 16578242,
      nonce: null,
      sender: {
        alias: 'jeremy torman',
        address: 'tz1aH8sCGaEMR994eGb5LKCuN8BBEHuJr8Am',
      },
      target: {
        alias: 'objkt.com English Auctions',
        address: 'KT1XjcRq5MLAzMKQ3UHsrue2SeU2NbxUrzmU',
      },
      parameter: {
        entrypoint: 'create_auction',
        value: {
          fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
          artist: 'tz1aH8sCGaEMR994eGb5LKCuN8BBEHuJr8Am',
          reserve: '10000000',
          end_time: '2021-07-07T20:46:58Z',
          objkt_id: '159079',
          royalties: '100',
          start_time: '2021-07-05T20:46:58Z',
          extension_time: '600',
          price_increment: '1000000',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 6210,
        metadata: 6211,
        auction_id: '10002',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 6210,
          path: 'auctions',
          action: 'add_key',
          content: {
            hash: 'expruRuaKyc8orpZZ8QwHtovjMbLw9MytLc8VRoGnMCGbWAeoUyJ47',
            key: '10001',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '0',
              artist: 'tz1aH8sCGaEMR994eGb5LKCuN8BBEHuJr8Am',
              creator: 'tz1aH8sCGaEMR994eGb5LKCuN8BBEHuJr8Am',
              reserve: '10000000',
              end_time: '2021-07-07T20:46:58Z',
              objkt_id: '159079',
              royalties: '100',
              start_time: '2021-07-05T20:46:58Z',
              current_price: '0',
              extension_time: '600',
              highest_bidder: 'tz1aH8sCGaEMR994eGb5LKCuN8BBEHuJr8Am',
              price_increment: '1000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktCreateEnglishAuctionHandler]);

  expect(events).toStrictEqual([
    // CONTRACT V1
    {
      id: 'b753c9cb2672f33224390231e3c7e9e9',
      type: 'OBJKT_CREATE_ENGLISH_AUCTION',
      opid: '57866989',
      ophash: 'opTh8g5Fn7VvkgfGPjH9w1TAAtUn5o5AT5VUfKtkippyG2WGd18',
      timestamp: '2021-07-01T20:19:38Z',
      level: 1539489,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '77565',
      seller_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      reserve: '50000000',
      start_time: '2021-07-01T20:18:42Z',
      end_time: '2021-07-02T20:18:42Z',
      extension_time: '600',
      royalties: '250',
      price_increment: '1000000',
      auction_id: '1',
    },

    // CONTRACT V2
    {
      id: 'c73891188f858152859b3884826f6069',
      type: 'OBJKT_CREATE_ENGLISH_AUCTION',
      opid: '58437179',
      ophash: 'ooQMF1GJGfZHpckAVpG75EYhtY1zyegLsUgKJG1NWT919MGfWvy',
      timestamp: '2021-07-05T20:47:26Z',
      level: 1544460,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '159079',
      seller_address: 'tz1aH8sCGaEMR994eGb5LKCuN8BBEHuJr8Am',
      artist_address: 'tz1aH8sCGaEMR994eGb5LKCuN8BBEHuJr8Am',
      reserve: '10000000',
      start_time: '2021-07-05T20:46:58Z',
      end_time: '2021-07-07T20:46:58Z',
      extension_time: '600',
      royalties: '100',
      price_increment: '1000000',
      auction_id: '10001',
    },
  ]);
});
