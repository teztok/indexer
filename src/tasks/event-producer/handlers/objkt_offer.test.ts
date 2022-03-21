import ObjktOfferHandler from './objkt_offer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 170991604,
      level: 2106420,
      timestamp: '2022-02-10T18:39:24Z',
      block: 'BLMaq3CFwvQoPb1gFsGgKfNHq6xXgUQvRg99cwbuTWX41TeKzGy',
      hash: 'opZYkyKKwUdFW9KnU17QMHesHH74DRJEKSKi2PELt8mV4MK6pk6',
      counter: 20552030,
      sender: {
        address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
      },
      target: {
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      parameter: {
        entrypoint: 'offer',
        value: {
          proxy: null,
          token: {
            address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
            token_id: '667462',
          },
          amount: '3000000',
          shares: [
            {
              amount: '1000',
              recipient: 'tz1imc2GqQMk12cwj4LcQmiSaA9TBA1nn6FF',
            },
          ],
          target: null,
          currency: {
            tez: {},
          },
          expiry_time: null,
        },
      },
      amount: 3000000,
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
        next_ask_id: '1000015',
        next_offer_id: '1000002',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1R8i4sXujWN69bRQFdtZ56wXcbc3qxhkTX',
      },
      diffs: [
        {
          bigmap: 103260,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'expruAYg2AY2tSfvxx7Rf4mxtXZ7Myjd5h2T1feffhrJeRc4vyA61A',
            key: '1000001',
            value: {
              token: {
                address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
                token_id: '667462',
              },
              amount: '3000000',
              shares: [
                {
                  amount: '1000',
                  recipient: 'tz1imc2GqQMk12cwj4LcQmiSaA9TBA1nn6FF',
                },
              ],
              target: null,
              creator: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
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

  const events = transactionsToEvents(transactions, [ObjktOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: '20d0768554f43551632182f124a1dcc3',
      type: 'OBJKT_OFFER',
      opid: 170991604,
      timestamp: '2022-02-10T18:39:24Z',
      level: 2106420,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '667462',
      offer_id: '1000001',
      buyer_address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
      //artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      //royalties: '200',
      price: '3000000',
      currency: 'tez',
    },
  ]);
});
