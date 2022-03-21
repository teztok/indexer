import ObjktCreateDutchAuctionHandler from './objkt_create_dutch_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CREATE_DUTCH_AUCTION events', async () => {
  const transactions: Transactions = [
    // CONTRACT V1
    {
      id: 57871184,
      level: 1539521,
      timestamp: '2021-07-01T20:52:58Z',
      block: 'BKkP6eew5H9TSmtsqLUhNt16EfV5Bav853xJJb4szU2PybE59Pq',
      hash: 'ooarNnsqbFSahJSkmq9XbqnJ7WEA79DjBqy9ryYJ7e2k1uPYPDe',
      counter: 15585705,
      sender: {
        address: 'tz1LcDMi4TAPL31ZRvkYDm4fAXFWRugCzxPY',
      },
      target: {
        alias: 'objkt.com Dutch Auctions Old',
        address: 'KT1ET45vnyEFMLS9wX1dYHEs9aCN3twDEiQw',
      },
      parameter: {
        entrypoint: 'create_auction',
        value: {
          fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
          artist: 'tz1PuZSxCh63Hj1EfGNq5SZv7e7PhqYRbTPo',
          end_time: '2021-07-02T20:49:20Z',
          objkt_id: '144522',
          end_price: '4000000',
          royalties: '220',
          start_time: '2021-07-01T20:49:20Z',
          start_price: '10000000',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5907,
        metadata: 5908,
        auction_id: '2',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5907,
          path: 'auctions',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '0',
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
      id: 58421438,
      level: 1544398,
      timestamp: '2021-07-05T19:38:30Z',
      block: 'BLGeQsPpyzMwZp64wbC4DYzbJYTGMauLiJqvtZosoPVUqXNes7j',
      hash: 'onhbqVTvyApfTSEqoKiR2exUK2PyLJr1c2c75ut9WFq9uD7zHFo',
      counter: 11549442,
      sender: {
        alias: 'NFT PROTECTOR',
        address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      },
      target: {
        alias: 'objkt.com Dutch Auctions',
        address: 'KT1QJ71jypKGgyTNtXjkCAYJZNhCKWiHuT2r',
      },
      parameter: {
        entrypoint: 'create_auction',
        value: {
          fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
          artist: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
          end_time: '2021-07-06T19:37:40Z',
          objkt_id: '77565',
          end_price: '100000',
          royalties: '250',
          start_time: '2021-07-05T19:37:40Z',
          start_price: '10000000000',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 6212,
        metadata: 6213,
        auction_id: '10002',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 6212,
          path: 'auctions',
          action: 'add_key',
          content: {
            hash: 'expruRuaKyc8orpZZ8QwHtovjMbLw9MytLc8VRoGnMCGbWAeoUyJ47',
            key: '10001',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '0',
              artist: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
              creator: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
              end_time: '2021-07-06T19:37:40Z',
              objkt_id: '77565',
              end_price: '100000',
              royalties: '250',
              start_time: '2021-07-05T19:37:40Z',
              start_price: '10000000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktCreateDutchAuctionHandler]);

  expect(events).toStrictEqual([
    // CONTRACT V1
    {
      id: '15ac6f54f853cc958998a9384a5327da',
      type: 'OBJKT_CREATE_DUTCH_AUCTION',
      opid: 57871184,
      timestamp: '2021-07-01T20:52:58Z',
      level: 1539521,
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
      id: '53ae4749eb4a0d51e5eacddbc9a9c7b2',
      type: 'OBJKT_CREATE_DUTCH_AUCTION',
      opid: 58421438,
      timestamp: '2021-07-05T19:38:30Z',
      level: 1544398,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '77565',
      seller_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      start_time: '2021-07-05T19:37:40Z',
      end_time: '2021-07-06T19:37:40Z',
      royalties: '250',
      start_price: '10000000000',
      end_price: '100000',
      auction_id: '10001',
    },
  ]);
});
