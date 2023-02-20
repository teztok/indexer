import ObjktClaimHandler from './objkt_claim';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CLAIM events', async () => {
  const transactions: Transactions = [
    {
      id: 466318366081024,
      level: 3156744,
      timestamp: '2023-02-18T14:15:14Z',
      block: 'BLtNEvYcuce6Sy76KuvXcfH43UqmeXuZ8sF5ruk1LmkFVbkGsUP',
      hash: 'onsw8iM3VeFeTzbyHfHfNKSVDYuAM59NaWrG6geFE8n1JHcWwQU',
      counter: 82936404,
      sender: {
        address: 'tz1fqLvbhDsmZSovBTwtrmz8ZWZZBgN9KBUn',
      },
      target: {
        address: 'KT1SxzFtayYoH7jDRJWmGMQgxPHhM8tHjYCB',
      },
      amount: 1000000,
      parameter: {
        entrypoint: 'claim',
        value: {
          amount: '1',
          token_id: '1',
          proxy_for: null,
          burn_tokens: [],
          condition_extra: null,
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        claims: 389375,
        ledger: 389376,
        locked: 389377,
        supply: 389381,
        claimed: 389374,
        managers: 389378,
        metadata: 389379,
        operators: 389380,
        administrator: 'tz1iwcJdrzc82TToBq84B2ZhobjaM8fpeTJD',
        last_token_id: '1',
        token_metadata: 389382,
      },
      diffs: [
        {
          bigmap: 389381,
          path: 'supply',
          action: 'update_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: '1',
          },
        },
        {
          bigmap: 389377,
          path: 'locked',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              mint: true,
              metadata: false,
            },
          },
        },
        {
          bigmap: 389376,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruBTJfj3MVnzmRm4C2ERH14FprpjMSTbZhARXVW2zse2dKJB2z1',
            key: {
              nat: '1',
              address: 'tz1fqLvbhDsmZSovBTwtrmz8ZWZZBgN9KBUn',
            },
            value: '1',
          },
        },
        {
          bigmap: 389374,
          path: 'claimed',
          action: 'add_key',
          content: {
            hash: 'expruBTJfj3MVnzmRm4C2ERH14FprpjMSTbZhARXVW2zse2dKJB2z1',
            key: {
              nat: '1',
              address: 'tz1fqLvbhDsmZSovBTwtrmz8ZWZZBgN9KBUn',
            },
            value: '1',
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktClaimHandler]);

  expect(events).toStrictEqual([
    {
      id: '5a98fd3cee937d33a3b2a9798f29df94',
      type: 'OBJKT_CLAIM',
      implements: 'SALE',
      opid: '466318366081024',
      ophash: 'onsw8iM3VeFeTzbyHfHfNKSVDYuAM59NaWrG6geFE8n1JHcWwQU',
      timestamp: '2023-02-18T14:15:14Z',
      level: 3156744,
      price: '1000000',
      fa2_address: 'KT1SxzFtayYoH7jDRJWmGMQgxPHhM8tHjYCB',
      token_id: '1',
      seller_address: 'tz1iwcJdrzc82TToBq84B2ZhobjaM8fpeTJD',
      buyer_address: 'tz1fqLvbhDsmZSovBTwtrmz8ZWZZBgN9KBUn',
    },
  ]);
});
