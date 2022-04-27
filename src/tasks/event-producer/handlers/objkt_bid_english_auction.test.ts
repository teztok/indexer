import ObjktBidEnglishAuctionHandler from './objkt_bid_english_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_BID_ENGLISH_AUCTION events', async () => {
  const transactions: Transactions = [
    // CONTRACT V1
    {
      id: 57869529,
      level: 1539509,
      timestamp: '2021-07-01T20:40:18Z',
      block: 'BMV6WeHhU2mJs6bxHBo15uoTZoMoket5HjUaNQT2odfDUB7hCya',
      hash: 'ooSw7p1J4Sb6pKudZcMyFRrWY8VqHxwTbYdvj2x38yotj4UtPnQ',
      counter: 15957416,
      nonce: null,
      sender: {
        alias: 'oktu',
        address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      },
      target: {
        alias: 'objkt.com English Auctions Old',
        address: 'KT1Wvk8fon9SgNEPQKewoSL2ziGGuCQebqZc',
      },
      parameter: {
        entrypoint: 'bid',
        value: '5',
      },
      amount: 1000000,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5904,
        metadata: 5905,
        auction_id: '15',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5904,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'exprtqoNj2hRg8PsPMaXLcy3dXjMM3B7nHKrRNqpfjbYpMbULbRj8k',
            key: '5',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '0',
              artist: 'tz1XhBVf7LFFTKFATCrJPjeHTJ3xhDBovJta',
              creator: 'tz1XhBVf7LFFTKFATCrJPjeHTJ3xhDBovJta',
              reserve: '500000',
              end_time: '2021-07-02T20:35:34Z',
              objkt_id: '156586',
              royalties: '150',
              start_time: '2021-07-01T20:35:34Z',
              current_price: '1000000',
              extension_time: '600',
              highest_bidder: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
              price_increment: '1000000',
            },
          },
        },
      ],
    },

    // CONTRACT V2
    {
      id: 58454271,
      level: 1544590,
      timestamp: '2021-07-05T23:04:14Z',
      block: 'BLmfVaKa3phf68dXz733fAxk6gprNuHayw8mLzVQaTN4H9HY5QR',
      hash: 'onycyVTAu3pfiCFR5ov3mgxJ5gpHdBXnD9sFRqAmpHwsPy4HVVP',
      counter: 13551602,
      nonce: null,
      sender: {
        alias: 'Anderlaxe',
        address: 'tz1h7JN75F7sg53wwYof4Q877yjuLRDg6q94',
      },
      target: {
        alias: 'objkt.com English Auctions',
        address: 'KT1XjcRq5MLAzMKQ3UHsrue2SeU2NbxUrzmU',
      },
      parameter: {
        entrypoint: 'bid',
        value: '10016',
      },
      amount: 5000000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 6210,
        metadata: 6211,
        auction_id: '10076',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 6210,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'exprvTDAW9caHXsLnjAQnnEqSjB2yGmFJvcayiPxo8BGoi2VJZ5Eit',
            key: '10016',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '0',
              artist: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
              creator: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
              reserve: '1000000',
              end_time: '2021-07-05T23:20:00Z',
              objkt_id: '35758',
              royalties: '100',
              start_time: '2021-07-05T21:20:00Z',
              current_price: '5000000',
              extension_time: '600',
              highest_bidder: 'tz1h7JN75F7sg53wwYof4Q877yjuLRDg6q94',
              price_increment: '1000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktBidEnglishAuctionHandler]);

  expect(events).toStrictEqual([
    // CONTRACT V1
    {
      id: '51b53820922027495226e9a5cc142e28',
      type: 'OBJKT_BID_ENGLISH_AUCTION',
      opid: 57869529,
      ophash: 'ooSw7p1J4Sb6pKudZcMyFRrWY8VqHxwTbYdvj2x38yotj4UtPnQ',
      timestamp: '2021-07-01T20:40:18Z',
      level: 1539509,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '156586',
      bidder_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      seller_address: 'tz1XhBVf7LFFTKFATCrJPjeHTJ3xhDBovJta',
      artist_address: 'tz1XhBVf7LFFTKFATCrJPjeHTJ3xhDBovJta',
      reserve: '500000',
      start_time: '2021-07-01T20:35:34Z',
      end_time: '2021-07-02T20:35:34Z',
      current_price: '1000000',
      highest_bidder_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      extension_time: '600',
      royalties: '150',
      price_increment: '1000000',
      auction_id: '5',
      bid: '1000000',
    },

    // CONTRACT V2
    {
      id: '5b3cc388cea60c156f7fd4bcd4a6be8e',
      type: 'OBJKT_BID_ENGLISH_AUCTION',
      opid: 58454271,
      ophash: 'onycyVTAu3pfiCFR5ov3mgxJ5gpHdBXnD9sFRqAmpHwsPy4HVVP',
      timestamp: '2021-07-05T23:04:14Z',
      level: 1544590,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '35758',
      bidder_address: 'tz1h7JN75F7sg53wwYof4Q877yjuLRDg6q94',
      seller_address: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
      artist_address: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
      reserve: '1000000',
      start_time: '2021-07-05T21:20:00Z',
      end_time: '2021-07-05T23:20:00Z',
      current_price: '5000000',
      highest_bidder_address: 'tz1h7JN75F7sg53wwYof4Q877yjuLRDg6q94',
      extension_time: '600',
      royalties: '100',
      price_increment: '1000000',
      auction_id: '10016',
      bid: '5000000',
    },
  ]);
});
