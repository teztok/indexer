import ObjktRetractOfferHandler from './objkt_retract_offer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 171015759,
      level: 2106547,
      timestamp: '2022-02-10T19:42:54Z',
      block: 'BKqnsyWvmnHx8JLQbpeAyyapZkuLgjFGCQF4RLcJ9CY85UKCwai',
      hash: 'oobCioNDbY7Bin5XvSBZx1E9ddsPuJvbuMA4CBNmkgxSqK5Qroe',
      counter: 43013875,
      sender: {
        address: 'tz1hCvVuMuQgbuii9QUcWRPcZZmdv988odhY',
      },
      target: {
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      parameter: {
        entrypoint: 'retract_offer',
        value: '1000016',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 103258,
        offers: 103260,
        paused: false,
        big_map: 103261,
        metadata: 103259,
        upgradable: true,
        next_ask_id: '1000287',
        next_offer_id: '1000029',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103260,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'expruB1KvZDB2yZBPnhmqXyCjr9Lq3bXHmLUpNN5K3dNLeTuR42k1h',
            key: '1000016',
            value: {
              token: {
                address: 'KT1UJubKkif4y4W8MFFfJ3BNum717n92LmUK',
                token_id: '0',
              },
              amount: '10010000',
              shares: [
                {
                  amount: '1500',
                  recipient: 'tz2PSYEYJff71Vi2qnUd5kUu7efMRzaCEnK2',
                },
              ],
              target: null,
              creator: 'tz1hCvVuMuQgbuii9QUcWRPcZZmdv988odhY',
              currency: {
                tez: {},
              },
              expiry_time: null,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktRetractOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: 'bb47c9392cbb7ddbc34c57daa75ea11c',
      type: 'OBJKT_RETRACT_OFFER',
      opid: 171015759,
      timestamp: '2022-02-10T19:42:54Z',
      level: 2106547,
      fa2_address: 'KT1UJubKkif4y4W8MFFfJ3BNum717n92LmUK',
      token_id: '0',
      buyer_address: 'tz1hCvVuMuQgbuii9QUcWRPcZZmdv988odhY',
      //artist_address: 'tz1dCmVe2mLsHrt1fmDvs64wpeLtsdJJnbAN', TODO
      offer_id: '1000016',
    },
  ]);
});
