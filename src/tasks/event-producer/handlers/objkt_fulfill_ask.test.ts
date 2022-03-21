import ObjktFulfillAskHandler from './objkt_fulfill_ask';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_FULFILL_ASK events', async () => {
  const transactions: Transactions = [
    {
      id: 112502358,
      level: 1879134,
      timestamp: '2021-11-20T08:09:22Z',
      block: 'BLjkrXDZxqQosF7gBzcq61yoqhuFjfB9TpY3Af4p2aNEi1cU6j2',
      hash: 'oo2yJpe2TEt46sogwpB6BzX9uAaACUm3r32e8MqXudKCtW5vvU4',
      counter: 36171881,
      sender: {
        address: 'tz2BGeJJpQGg2FL3nB5fjMVT2gSdtC9i7ges',
      },
      target: {
        alias: 'objkt.com Marketplace',
        address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      },
      parameter: {
        entrypoint: 'fulfill_ask',
        value: '176775',
      },
      amount: 9800000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 5909,
        bids: 5910,
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        ask_id: '177702',
        bid_id: '41553',
        metadata: 5911,
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5909,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'exprthxWTJnHSVRCjhfnecrjo6QPdXxzfgtJmWK6z1vee7DPRuFGcF',
            key: '176775',
            value: {
              fa2: 'KT1HZVd9Cjc2CMe3sQvXgbxhpJkdena21pih',
              amount: '1',
              artist: 'tz1iZ2TPEShFC8TqHsXLA9RXdV7tSv8E3aLe',
              issuer: 'tz1Rt9yfmdBLYfKaeMHmBPzyvkE2z1DLB3u1',
              objkt_id: '5316132153291338729114003403703461984451389570964248862853059705989684212944',
              royalties: '50',
              xtz_per_objkt: '9800000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktFulfillAskHandler]);

  expect(events).toStrictEqual([
    {
      id: 'e8c44ce566ba34356dc0c06586721b7e',
      type: 'OBJKT_FULFILL_ASK',
      implements: 'SALE',
      opid: 112502358,
      timestamp: '2021-11-20T08:09:22Z',
      level: 1879134,
      price: '9800000',
      fa2_address: 'KT1HZVd9Cjc2CMe3sQvXgbxhpJkdena21pih',
      token_id: '5316132153291338729114003403703461984451389570964248862853059705989684212944',
      ask_id: '176775',
      seller_address: 'tz1Rt9yfmdBLYfKaeMHmBPzyvkE2z1DLB3u1',
      buyer_address: 'tz2BGeJJpQGg2FL3nB5fjMVT2gSdtC9i7ges',
      artist_address: 'tz1iZ2TPEShFC8TqHsXLA9RXdV7tSv8E3aLe',
    },
  ]);
});
