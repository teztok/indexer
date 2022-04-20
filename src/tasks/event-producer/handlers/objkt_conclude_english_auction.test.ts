import ObjktConcludeEnglishAuctionHandler from './objkt_conclude_english_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CONCLUDE_ENGLISH_AUCTION events', async () => {
  const transactions: Transactions = [
    // CONTRACT V1
    {
      id: 57887905,
      level: 1539646,
      timestamp: '2021-07-01T23:07:18Z',
      block: 'BKww8AS66LkqTMFcv2TRpCLRAK7uiW8SDuUn2fU8mtgQTRfhBzC',
      hash: 'opRG9N6L9Vw1dTW5Kf5JLVe2vciHk9kcumDu6MvhNJ7cTzqrLQP',
      counter: 15585812,
      sender: {
        address: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
      },
      target: {
        alias: 'objkt.com English Auctions Old',
        address: 'KT1Wvk8fon9SgNEPQKewoSL2ziGGuCQebqZc',
      },
      parameter: {
        entrypoint: 'conclude_auction',
        value: '73',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5904,
        metadata: 5905,
        auction_id: '411',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5904,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'exprtpZjbARBQtg3vxVcZY4orr1rTZ1Em7wGhieAyP3N17D6HZZqBa',
            key: '73',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '2',
              artist: 'tz1P5oKtCG6nVdJ2weobuiN44uWvjKuDsWy4',
              creator: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
              reserve: '8000000',
              end_time: '2021-07-01T23:01:29Z',
              objkt_id: '102795',
              royalties: '250',
              start_time: '2021-07-01T21:01:29Z',
              current_price: '23000000',
              extension_time: '600',
              highest_bidder: 'tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU',
              price_increment: '1000000',
            },
          },
        },
      ],
    },

    // CONTRACT V2
    {
      id: 58462934,
      level: 1544673,
      timestamp: '2021-07-06T00:28:42Z',
      block: 'BKjEKqppv97Zzpe7ewiUgpcNp9BvnaBX8A7RpWfynpzWcSk8bZD',
      hash: 'ooKPmcXR3gTm6sHTWZffvsppf3MeMNQw2K273uNRR3mPyzRUsBv',
      counter: 17174944,
      sender: {
        alias: 'Scubage',
        address: 'tz1Q71RJHgo7gvLtcXwMdsG7B4EccY9SmJiS',
      },
      target: {
        alias: 'objkt.com English Auctions',
        address: 'KT1XjcRq5MLAzMKQ3UHsrue2SeU2NbxUrzmU',
      },
      parameter: {
        entrypoint: 'conclude_auction',
        value: '10060',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 6210,
        metadata: 6211,
        auction_id: '10104',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 6210,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'expruNa8MfcMbbWZBpKBaQB6dHLX9QxL9Z7cxvEqY3acDXnG1viQ9e',
            key: '10060',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '2',
              artist: 'tz1gdno6FuKgE5WC1VKnqxb8qQQEuYrbKCub',
              creator: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
              reserve: '1000000',
              end_time: '2021-07-06T00:19:02Z',
              objkt_id: '104051',
              royalties: '100',
              start_time: '2021-07-05T22:09:28Z',
              current_price: '1000000',
              extension_time: '600',
              highest_bidder: 'tz1Q71RJHgo7gvLtcXwMdsG7B4EccY9SmJiS',
              price_increment: '1000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktConcludeEnglishAuctionHandler]);

  expect(events).toStrictEqual([
    // CONTRACT V1
    {
      id: '6965606cee9f964a319a1488411e36d3',
      type: 'OBJKT_CONCLUDE_ENGLISH_AUCTION',
      implements: 'SALE',
      opid: 57887905,
      ophash: 'opRG9N6L9Vw1dTW5Kf5JLVe2vciHk9kcumDu6MvhNJ7cTzqrLQP',
      timestamp: '2021-07-01T23:07:18Z',
      level: 1539646,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '102795',
      seller_address: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
      buyer_address: 'tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU',
      artist_address: 'tz1P5oKtCG6nVdJ2weobuiN44uWvjKuDsWy4',
      reserve: '8000000',
      start_time: '2021-07-01T21:01:29Z',
      end_time: '2021-07-01T23:01:29Z',
      price: '23000000',
      extension_time: '600',
      royalties: '250',
      price_increment: '1000000',
      auction_id: '73',
    },

    // CONTRACT V2
    {
      id: '6ae69441b0fa64347981cc12401c0deb',
      type: 'OBJKT_CONCLUDE_ENGLISH_AUCTION',
      implements: 'SALE',
      opid: 58462934,
      ophash: 'ooKPmcXR3gTm6sHTWZffvsppf3MeMNQw2K273uNRR3mPyzRUsBv',
      timestamp: '2021-07-06T00:28:42Z',
      level: 1544673,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '104051',
      seller_address: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
      buyer_address: 'tz1Q71RJHgo7gvLtcXwMdsG7B4EccY9SmJiS',
      artist_address: 'tz1gdno6FuKgE5WC1VKnqxb8qQQEuYrbKCub',
      reserve: '1000000',
      start_time: '2021-07-05T22:09:28Z',
      end_time: '2021-07-06T00:19:02Z',
      price: '1000000',
      extension_time: '600',
      royalties: '100',
      price_increment: '1000000',
      auction_id: '10060',
    },
  ]);
});
