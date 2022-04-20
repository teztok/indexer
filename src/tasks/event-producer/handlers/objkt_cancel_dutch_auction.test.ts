import ObjktCancelDutchAuctionHandler from './objkt_cancel_dutch_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CANCEL_DUTCH_AUCTION events', async () => {
  const transactions: Transactions = [
    // CONTRACT V1
    {
      id: 57874781,
      level: 1539545,
      timestamp: '2021-07-01T21:18:18Z',
      block: 'BM4hyuF4ES1XFJAbAD9JNvP5GFFPMHYq6j5SJ9CT7kaoTDBZ5EQ',
      hash: 'oouRQNsvwwaE1Dvzcb7xi2f54XUe24MzJMxHv6CkzocrKUv5GTR',
      counter: 15585727,
      sender: {
        address: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
      },
      target: {
        alias: 'objkt.com Dutch Auctions Old',
        address: 'KT1ET45vnyEFMLS9wX1dYHEs9aCN3twDEiQw',
      },
      parameter: {
        entrypoint: 'cancel_auction',
        value: '1',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5907,
        metadata: 5908,
        auction_id: '5',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5907,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '1',
              artist: 'tz1PuZSxCh63Hj1EfGNq5SZv7e7PhqYRbTPo',
              creator: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
              end_time: '2021-07-02T20:49:20Z',
              objkt_id: '144522',
              end_price: '4000000',
              royalties: '220',
              start_time: '2021-07-01T20:49:20Z',
              start_price: '10000000',
            },
          },
        },
      ],
    },

    // CONTRACT V2
    {
      id: 58511167,
      level: 1545282,
      timestamp: '2021-07-06T11:05:10Z',
      block: 'BKxAHXCdP6naK4xgmUNHofwGCMjxMZNb9UTX2CPyAmXigHP22mt',
      hash: 'oo34bQ3Zy9VwRTWm2KRFPzRkBDdNc5PUtTyMRWzFqS3eTmZVoQ4',
      counter: 13535114,
      sender: {
        alias: 'austinnuma',
        address: 'tz1Rm5QmNUnQetDKSVW8srM29hjPRiQCgqJx',
      },
      target: {
        alias: 'objkt.com Dutch Auctions',
        address: 'KT1QJ71jypKGgyTNtXjkCAYJZNhCKWiHuT2r',
      },
      parameter: {
        entrypoint: 'cancel_auction',
        value: '10011',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 6212,
        metadata: 6213,
        auction_id: '10012',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 6212,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'exprthSQN3Egghq93uQqWFWDE5q66xWwokXhTrAPKXAVTFdi5yuNGM',
            key: '10011',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '1',
              artist: 'tz1ZWje5jpfbWrG5iuxz7qUx7eBLLAS5Tv3z',
              creator: 'tz1Rm5QmNUnQetDKSVW8srM29hjPRiQCgqJx',
              end_time: '2021-07-06T11:00:27Z',
              objkt_id: '126303',
              end_price: '6000000',
              royalties: '160',
              start_time: '2021-07-06T09:00:27Z',
              start_price: '16000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktCancelDutchAuctionHandler]);

  expect(events).toStrictEqual([
    // CONTRACT V1
    {
      id: '042ff06f22ae995e0bf0ee0c9086426a',
      type: 'OBJKT_CANCEL_DUTCH_AUCTION',
      opid: 57874781,
      ophash: 'oouRQNsvwwaE1Dvzcb7xi2f54XUe24MzJMxHv6CkzocrKUv5GTR',
      timestamp: '2021-07-01T21:18:18Z',
      level: 1539545,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '144522',
      seller_address: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
      artist_address: 'tz1PuZSxCh63Hj1EfGNq5SZv7e7PhqYRbTPo',
      start_time: '2021-07-01T20:49:20Z',
      end_time: '2021-07-02T20:49:20Z',
      royalties: '220',
      start_price: '10000000',
      end_price: '4000000',
      auction_id: '1',
    },

    // CONTRACT V2
    {
      id: '242830be0396346160c8cdccafedaeeb',
      type: 'OBJKT_CANCEL_DUTCH_AUCTION',
      opid: 58511167,
      ophash: 'oo34bQ3Zy9VwRTWm2KRFPzRkBDdNc5PUtTyMRWzFqS3eTmZVoQ4',
      timestamp: '2021-07-06T11:05:10Z',
      level: 1545282,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '126303',
      seller_address: 'tz1Rm5QmNUnQetDKSVW8srM29hjPRiQCgqJx',
      artist_address: 'tz1ZWje5jpfbWrG5iuxz7qUx7eBLLAS5Tv3z',
      start_time: '2021-07-06T09:00:27Z',
      end_time: '2021-07-06T11:00:27Z',
      royalties: '160',
      start_price: '16000000',
      end_price: '6000000',
      auction_id: '10011',
    },
  ]);
});
