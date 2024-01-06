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
      nonce: null,
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
    {
      id: 170991605,
      level: 2106421,
      timestamp: '2022-02-10T18:39:24Z',
      block: 'BLMaq3CFwvQoPb1gFsGgKfNHq6xXgUQvRg99cwbuTWX41TeKzGy',
      hash: 'opZYkyKKwUdFW9KnU17QMHesHH74DRJEKSKi2PELt8mV4MK6pk6',
      counter: 20552030,
      nonce: null,
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
    {
      id: 542692282990592,
      level: 3433229,
      timestamp: '2023-04-27T15:33:10Z',
      block: 'BLugKQxJTJKByeGKEUthsGdVHiBNNNeFG69TNSTgnLMX3QTzWB2',
      hash: 'onrUHGikmaxrjrG2mKtxMCcAVPsxoFuqGNGF58UqPsDXjviXhCW',
      counter: 14036219,
      sender: {
        address: 'tz1Vn4EjDNpXWhaQhXPiT6w6L5rkEsVLL3Y2',
      },
      target: {
        alias: 'objkt.com Marketplace v2',
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      amount: 0,
      parameter: {
        entrypoint: 'offer',
        value: {
          proxy: null,
          token: {
            address: 'KT1K7BGwGTwJQP1x14avmqEmZU94gKK3frR1',
            token_id: '25',
          },
          amount: '5110000000000',
          shares: [
            {
              amount: '2500',
              recipient: 'tz1eZFuyDDijm6dk77zaUnveUV9SEhR9DN42',
            },
          ],
          target: null,
          currency: {
            fa2: {
              address: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
              token_id: '0',
            },
          },
          expiry_time: '2023-04-28T15:32:37Z',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 103258,
        offers: 103260,
        paused: false,
        big_map: 103261,
        metadata: 103259,
        upgradable: false,
        next_ask_id: '3391701',
        next_offer_id: '1618927',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1DF2c7VUED7W3h5BnqUKdB87Ke7XdCjQiY',
      },
      diffs: [
        {
          bigmap: 103260,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'exprtyy4JHx5z7VpEkMwVnbjKSXPHeV81aqdp4zAVuQH53T2xa7qP8',
            key: '1618926',
            value: {
              token: {
                address: 'KT1K7BGwGTwJQP1x14avmqEmZU94gKK3frR1',
                token_id: '25',
              },
              amount: '5110000000000',
              shares: [
                {
                  amount: '2500',
                  recipient: 'tz1eZFuyDDijm6dk77zaUnveUV9SEhR9DN42',
                },
              ],
              target: null,
              creator: 'tz1Vn4EjDNpXWhaQhXPiT6w6L5rkEsVLL3Y2',
              currency: {
                fa2: {
                  address: 'KT1XRPEPXbZK25r3Htzp2o1x7xdMMmfocKNW',
                  token_id: '0',
                },
              },
              expiry_time: '2023-04-28T15:32:37Z',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 506544210837504,
      level: 3295525,
      timestamp: '2023-04-03T11:10:55Z',
      block: 'BLDa2E1172xMMkYwu41xjwEqivXNQv7FweSJxwsY6jbbhjFLbZ8',
      hash: 'opKg8RZXqj6UtwJGnRJBb4APEJrFa1gkZPmMrApbV216LgCtLk7',
      counter: 49518312,
      nonce: null,
      sender: {
        address: 'tz1QMmx7rdQVM9CT52uUSqBaT1iWCrGJQ9Ej',
      },
      target: {
        alias: 'objkt.com Marketplace v2',
        address: 'KT1WvzYHCNBvDSdwafTHv7nJ1dWmZ8GCYuuC',
      },
      amount: 0,
      parameter: {
        entrypoint: 'offer',
        value: {
          proxy: null,
          token: {
            address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
            token_id: '102434',
          },
          amount: '10000',
          shares: [
            {
              amount: '2000',
              recipient: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
            },
          ],
          target: null,
          currency: {
            tez: {},
          },
          expiry_time: '2023-04-04T11:10:31Z',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 103258,
        offers: 103260,
        paused: false,
        big_map: 103261,
        metadata: 103259,
        upgradable: false,
        next_ask_id: '3299371',
        next_offer_id: '1600028',
        token_registry: 'KT1Pbj1uKjxZJLHyoQ2YUs4kukjvLJdheyfU',
        permission_module: 'KT1DF2c7VUED7W3h5BnqUKdB87Ke7XdCjQiY',
      },
      diffs: [
        {
          bigmap: 103260,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'exprvTHAP7EZ7hCbNE7YcWmY71UKVeXkbQV6aHJoxJcwfJX6boHaNa',
            key: '1600027',
            value: {
              token: {
                address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
                token_id: '102434',
              },
              amount: '10000',
              shares: [
                {
                  amount: '2000',
                  recipient: 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu',
                },
              ],
              target: null,
              creator: 'tz1QMmx7rdQVM9CT52uUSqBaT1iWCrGJQ9Ej',
              currency: {
                fa12: 'KT1Ha4yFVeyzw6KRAdkzq6TxDHB97KG4pZe8',
              },
              expiry_time: '2023-04-04T11:10:31Z',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: '7fe66d5dfe53bb837a5f2ba2e8aa63de',
      type: 'OBJKT_OFFER',
      opid: '170991604',
      ophash: 'opZYkyKKwUdFW9KnU17QMHesHH74DRJEKSKi2PELt8mV4MK6pk6',
      timestamp: '2022-02-10T18:39:24Z',
      level: 2106420,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '667462',
      offer_id: '1000001',
      buyer_address: 'tz2A1H2nqwm2ZYzyRsFs1iWPsCjdmWd4Srmz',
      price: '3000000',
      currency: 'tez',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1imc2GqQMk12cwj4LcQmiSaA9TBA1nn6FF: '1000',
        },
      },
    },
    {
      buyer_address: 'tz1QMmx7rdQVM9CT52uUSqBaT1iWCrGJQ9Ej',
      currency: 'tez',
      end_time: '2023-04-04T11:10:31Z',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      id: '4088ca0e8c29d826f571151016456d08',
      level: 3295525,
      offer_id: '1600027',
      ophash: 'opKg8RZXqj6UtwJGnRJBb4APEJrFa1gkZPmMrApbV216LgCtLk7',
      opid: '506544210837504',
      price: '10000',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu: '2000',
        },
      },
      timestamp: '2023-04-03T11:10:55Z',
      token_id: '102434',
      type: 'OBJKT_OFFER',
    },
  ]);
});
