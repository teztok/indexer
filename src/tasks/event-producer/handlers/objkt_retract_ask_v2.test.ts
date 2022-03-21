import ObjktRetractAskV2Handler from './objkt_retract_ask_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_ASK_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 170780901,
      level: 2105768,
      timestamp: '2022-02-10T13:13:24Z',
      block: 'BL5kmR1eB3BjdPgHCQXa4qwx6RnUYUPZxt7NHmocJkikHzB24D4',
      hash: 'oojWNEJFyjfyu3iN8Ye657zaFFSpcs1ipdKFEgd4LJsPJaWr9vx',
      counter: 15958366,
      sender: {
        alias: 'oktu',
        address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      },
      target: {
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      parameter: {
        entrypoint: 'retract_ask',
        value: '1000001',
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 103258,
        offers: 103260,
        paused: false,
        big_map: 103261,
        metadata: 103259,
        upgradable: true,
        next_ask_id: '1000002',
        next_offer_id: '1000000',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103258,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'expruAYg2AY2tSfvxx7Rf4mxtXZ7Myjd5h2T1feffhrJeRc4vyA61A',
            key: '1000001',
            value: {
              token: {
                address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
                token_id: '2',
              },
              amount: '20000',
              shares: [
                {
                  amount: '500',
                  recipient: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
                },
              ],
              target: null,
              creator: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
              currency: {
                tez: {},
              },
              editions: '10',
              expiry_time: null,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktRetractAskV2Handler]);

  expect(events).toStrictEqual([
    {
      id: 'fe0383a5510b522499102bf7be229feb',
      type: 'OBJKT_RETRACT_ASK_V2',
      opid: 170780901,
      timestamp: '2022-02-10T13:13:24Z',
      level: 2105768,
      fa2_address: 'KT1Q8JB2bdphCHhEBKc1PMsjArLPcAezGBVK',
      token_id: '2',
      seller_address: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
      //artist_address: 'tz1dCmVe2mLsHrt1fmDvs64wpeLtsdJJnbAN', TODO
      ask_id: '1000001',
    },
  ]);
});
