import ObjktOfferV3Handler from './objkt_offer_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_OFFER_V3_PRE events', async () => {
  const transactions: Transactions = [
    {
      id: 911993245532160,
      level: 4870762,
      timestamp: '2024-01-05T07:56:44Z',
      block: 'BMLuw7TvV7mpox8rYTd5HVzJfuBVy1wZHrRsbzMp48wvx7wwiyc',
      hash: 'ooJ2MTpynbVdXiDwbEBWs6xQDQ41WxEptkeyDH9esauuKLqodf9',
      counter: 61089124,
      nonce: null,
      sender: {
        address: 'tz1c7zSkZF4rJg6xtjhVJ49WQYFpRpGxWkJV',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 1800000000,
      parameter: {
        entrypoint: 'offer',
        value: {
          token: {
            address: 'KT1FRjrFbRbAcJYuXiwJxmQC5sYpHgXbLQ4S',
            token_id: '39',
          },
          amount: '1800000000',
          shares: {
            tz1c3hFmjFSwunjLHECnYyjr42KRt5YiHrGX: '1000',
          },
          currency: {
            tez: {},
          },
          condition: null,
          proxy_for: null,
          expiry_time: '2024-02-04T07:56:09Z',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 574013,
        offers: 574015,
        metadata: 574014,
        next_ask_id: '10002509',
        next_offer_id: '10000181',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574015,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'expru2yoBqLnQm66tyAwAxSRUV2Mu4iAFMYcpsrz5Lrsyj9rHSkz94',
            key: '10000180',
            value: {
              token: {
                address: 'KT1FRjrFbRbAcJYuXiwJxmQC5sYpHgXbLQ4S',
                token_id: '39',
              },
              amount: '1800000000',
              shares: {
                tz1c3hFmjFSwunjLHECnYyjr42KRt5YiHrGX: '1000',
              },
              creator: 'tz1c7zSkZF4rJg6xtjhVJ49WQYFpRpGxWkJV',
              currency: {
                tez: {},
              },
              condition: null,
              expiry_time: '2024-02-04T07:56:09Z',
              platform_fee: '500',
            },
          },
        },
      ],
    },
    {
      id: 911980199149568,
      level: 4870708,
      timestamp: '2024-01-05T07:42:13Z',
      block: 'BM92RCAfx6tryKjxYxdXDopZS273KmxydzFK1tzcGvbyqk9Noiw',
      hash: 'onxGmPjNBn3Zv7c3AwkBYqgkN52rjdUVaWeBSnxdQQUVDbVNBkN',
      counter: 71766555,
      nonce: null,
      sender: {
        address: 'tz1dgHT8i6EmSTQJnSZ9fDHJbPfNmsGY15gW',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 1000000,
      parameter: {
        entrypoint: 'offer',
        value: {
          token: {
            address: 'KT19xG9xEDnKWd8gto3eDJNgQwKdyXopAgkM',
            token_id: '29',
          },
          amount: '1000000',
          shares: {
            tz2EYCz5KRiwfzTu5ixc9EKbTJSQQzVr6gEj: '2500',
          },
          currency: {
            tez: {},
          },
          condition: null,
          proxy_for: null,
          expiry_time: null,
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 574013,
        offers: 574015,
        metadata: 574014,
        next_ask_id: '10002480',
        next_offer_id: '10000179',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574015,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'exprv47yfaqk7ZniXg3wwsSFiXcM1oxyUzSQs5Mc4zPGauVdEyEqMZ',
            key: '10000178',
            value: {
              token: {
                address: 'KT19xG9xEDnKWd8gto3eDJNgQwKdyXopAgkM',
                token_id: '29',
              },
              amount: '1000000',
              shares: {
                tz2EYCz5KRiwfzTu5ixc9EKbTJSQQzVr6gEj: '2500',
              },
              creator: 'tz1dgHT8i6EmSTQJnSZ9fDHJbPfNmsGY15gW',
              currency: {
                tez: {},
              },
              condition: null,
              expiry_time: null,
              platform_fee: '500',
            },
          },
        },
      ],
    },
    {
      id: 919755391238144,
      level: 4901160,
      timestamp: '2024-01-10T16:03:20Z',
      block: 'BKmrsG3hkq7XN51u5BGZVbEAjmt9v6vtKW2smEo9G4uiAyCyrom',
      hash: 'onn7jHL4TcYNUbMUgx6UBttt75Mn1wkCEoFwLYQ112Y9LWNjxYZ',
      counter: 107524053,
      nonce: null,
      sender: {
        address: 'tz1ZcK7NzwDq8ReeVkFwfvPDBFA6URHLHStz',
      },
      target: {
        address: 'KT1Xjap1TwmDR1d8yEd8ErkraAj2mbdMrPZY',
      },
      amount: 10000000,
      parameter: {
        entrypoint: 'offer',
        value: {
          token: {
            address: 'KT1Gi3ppc2XTtka87E3C31tCzewMZ2oUM5Zw',
            token_id: '9',
          },
          amount: '10000000',
          shares: {
            tz1NJpwQKW56sEqeiAyz8rh7GChvxJeSJqX6: '1000',
          },
          currency: {
            tez: {},
          },
          condition: null,
          proxy_for: null,
          referrers: {},
          expiry_time: '2024-02-09T16:02:37Z',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 591024,
        offers: 591026,
        metadata: 591025,
        next_ask_id: '11000014',
        next_offer_id: '11000002',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 591026,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'exprubikeA93UAVMh5ff6wR1gUG6SMpHUB4kbLG8cn8V7yMGNnUuAQ',
            key: '11000001',
            value: {
              token: {
                address: 'KT1Gi3ppc2XTtka87E3C31tCzewMZ2oUM5Zw',
                token_id: '9',
              },
              amount: '10000000',
              shares: {
                tz1NJpwQKW56sEqeiAyz8rh7GChvxJeSJqX6: '1000',
              },
              creator: 'tz1ZcK7NzwDq8ReeVkFwfvPDBFA6URHLHStz',
              currency: {
                tez: {},
              },
              condition: null,
              referrers: {},
              expiry_time: '2024-02-09T16:02:37Z',
              platform_fee: '500',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktOfferV3Handler]);

  expect(events).toStrictEqual([
    {
      id: 'c1a0e0950d6dab661e75c6dc65f2a1da',
      type: 'OBJKT_OFFER_V3_PRE',
      opid: '911993245532160',
      ophash: 'ooJ2MTpynbVdXiDwbEBWs6xQDQ41WxEptkeyDH9esauuKLqodf9',
      timestamp: '2024-01-05T07:56:44Z',
      level: 4870762,
      fa2_address: 'KT1FRjrFbRbAcJYuXiwJxmQC5sYpHgXbLQ4S',
      end_time: '2024-02-04T07:56:09Z',
      token_id: '39',
      offer_id: '10000180',
      buyer_address: 'tz1c7zSkZF4rJg6xtjhVJ49WQYFpRpGxWkJV',
      price: '1800000000',
      currency: 'tez',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1c3hFmjFSwunjLHECnYyjr42KRt5YiHrGX: '1000',
        },
      },
    },
    {
      buyer_address: 'tz1dgHT8i6EmSTQJnSZ9fDHJbPfNmsGY15gW',
      currency: 'tez',
      fa2_address: 'KT19xG9xEDnKWd8gto3eDJNgQwKdyXopAgkM',
      id: '876cb01459628979d496bd7fa0d171ad',
      level: 4870708,
      offer_id: '10000178',
      ophash: 'onxGmPjNBn3Zv7c3AwkBYqgkN52rjdUVaWeBSnxdQQUVDbVNBkN',
      opid: '911980199149568',
      price: '1000000',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz2EYCz5KRiwfzTu5ixc9EKbTJSQQzVr6gEj: '2500',
        },
      },
      timestamp: '2024-01-05T07:42:13Z',
      token_id: '29',
      type: 'OBJKT_OFFER_V3_PRE',
    },
    {
      buyer_address: 'tz1ZcK7NzwDq8ReeVkFwfvPDBFA6URHLHStz',
      currency: 'tez',
      end_time: '2024-02-09T16:02:37Z',
      fa2_address: 'KT1Gi3ppc2XTtka87E3C31tCzewMZ2oUM5Zw',
      id: '1c904b94b210982b99d30d37a0efc497',
      level: 4901160,
      offer_id: '11000001',
      ophash: 'onn7jHL4TcYNUbMUgx6UBttt75Mn1wkCEoFwLYQ112Y9LWNjxYZ',
      opid: '919755391238144',
      price: '10000000',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1NJpwQKW56sEqeiAyz8rh7GChvxJeSJqX6: '1000',
        },
      },
      timestamp: '2024-01-10T16:03:20Z',
      token_id: '9',
      type: 'OBJKT_OFFER_V3',
    },
  ]);
});
