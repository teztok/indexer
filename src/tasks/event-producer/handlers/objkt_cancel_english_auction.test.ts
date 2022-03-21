import ObjktCancelEnglishAuctionHandler from './objkt_cancel_english_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CANCEL_ENGLISH_AUCTION events', async () => {
  const transactions: Transactions = [
    // CONTRACT V1
    {
      id: 57869065,
      level: 1539505,
      timestamp: '2021-07-01T20:36:18Z',
      block: 'BLBHAQJwU9nwTYy5QUtRGr88kYpVz2thUReP8VLJ29P3t9nKn4t',
      hash: 'opQMLHEQcC9GC5AHogJTjc4Q5hGGpiL2vunfX2zbHN6mKWbNyZs',
      counter: 17742665,
      sender: {
        alias: 'CryptoGotchiz',
        address: 'tz1RgnLSzM48rnwAqwiYf51CAXxEgxDzASrJ',
      },
      target: {
        alias: 'objkt.com English Auctions Old',
        address: 'KT1Wvk8fon9SgNEPQKewoSL2ziGGuCQebqZc',
      },
      parameter: {
        entrypoint: 'cancel_auction',
        value: '4',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5904,
        metadata: 5905,
        auction_id: '8',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5904,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'exprtkcv5vD1Ct4y91FvZFgXVHCxebKhorSVs8hFmXYgmGsEMo4qdp',
            key: '4',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '1',
              artist: 'tz1RgnLSzM48rnwAqwiYf51CAXxEgxDzASrJ',
              creator: 'tz1RgnLSzM48rnwAqwiYf51CAXxEgxDzASrJ',
              reserve: '3000000',
              end_time: '2021-07-03T20:32:38Z',
              objkt_id: '157449',
              royalties: '200',
              start_time: '2021-07-01T20:32:38Z',
              current_price: '0',
              extension_time: '600',
              highest_bidder: 'tz1RgnLSzM48rnwAqwiYf51CAXxEgxDzASrJ',
              price_increment: '1000000',
            },
          },
        },
      ],
    },

    // CONTRACT V2
    {
      id: 58466763,
      level: 1544729,
      timestamp: '2021-07-06T01:27:22Z',
      block: 'BKttvJ4PcAjCVieyWwkhoNRDUNVJ8YQMkVbRRdXnmgrQbFsx7YV',
      hash: 'opUSYQcb7PiRENmpDaZfqjr9qz37fPtk6TmgKRooyQiugMQKWUV',
      counter: 15206656,
      sender: {
        alias: 'BODMONTING  ',
        address: 'tz2CPZAqqT8m2TTVnwPR6T68jvA9EBfhzUQZ',
      },
      target: {
        alias: 'objkt.com English Auctions',
        address: 'KT1XjcRq5MLAzMKQ3UHsrue2SeU2NbxUrzmU',
      },
      parameter: {
        entrypoint: 'cancel_auction',
        value: '10112',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 6210,
        metadata: 6211,
        auction_id: '10116',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 6210,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'exprumjmBoB96EpqG9odWiz51daxzs4c9CqgD8P2Vzd9qGzjJK8Gfr',
            key: '10112',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '1',
              artist: 'tz2CPZAqqT8m2TTVnwPR6T68jvA9EBfhzUQZ',
              creator: 'tz2CPZAqqT8m2TTVnwPR6T68jvA9EBfhzUQZ',
              reserve: '1000000',
              end_time: '2021-07-07T01:04:27Z',
              objkt_id: '140781',
              royalties: '200',
              start_time: '2021-07-06T01:04:27Z',
              current_price: '0',
              extension_time: '600',
              highest_bidder: 'tz2CPZAqqT8m2TTVnwPR6T68jvA9EBfhzUQZ',
              price_increment: '1000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktCancelEnglishAuctionHandler]);

  expect(events).toStrictEqual([
    // CONTRACT V1
    {
      id: 'be86a69f653246402230ddf236af5b8f',
      type: 'OBJKT_CANCEL_ENGLISH_AUCTION',
      opid: 57869065,
      timestamp: '2021-07-01T20:36:18Z',
      level: 1539505,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157449',
      seller_address: 'tz1RgnLSzM48rnwAqwiYf51CAXxEgxDzASrJ',
      artist_address: 'tz1RgnLSzM48rnwAqwiYf51CAXxEgxDzASrJ',
      reserve: '3000000',
      start_time: '2021-07-01T20:32:38Z',
      end_time: '2021-07-03T20:32:38Z',
      current_price: '0',
      highest_bidder_address: 'tz1RgnLSzM48rnwAqwiYf51CAXxEgxDzASrJ',
      extension_time: '600',
      royalties: '200',
      price_increment: '1000000',
      auction_id: '4',
    },

    // CONTRACT V2
    {
      id: '847dfe7ee21d66e041bb663b7fdf4e9e',
      type: 'OBJKT_CANCEL_ENGLISH_AUCTION',
      opid: 58466763,
      timestamp: '2021-07-06T01:27:22Z',
      level: 1544729,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '140781',
      seller_address: 'tz2CPZAqqT8m2TTVnwPR6T68jvA9EBfhzUQZ',
      artist_address: 'tz2CPZAqqT8m2TTVnwPR6T68jvA9EBfhzUQZ',
      reserve: '1000000',
      start_time: '2021-07-06T01:04:27Z',
      end_time: '2021-07-07T01:04:27Z',
      current_price: '0',
      highest_bidder_address: 'tz2CPZAqqT8m2TTVnwPR6T68jvA9EBfhzUQZ',
      extension_time: '600',
      royalties: '200',
      price_increment: '1000000',
      auction_id: '10112',
    },
  ]);
});
