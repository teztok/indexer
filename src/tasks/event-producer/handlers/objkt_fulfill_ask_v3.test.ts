import ObjktFulfillAskV3Handler from './objkt_fulfill_ask_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_FULFILL_ASK_V3_PRE events', async () => {
  const transactions: Transactions = [
    {
      id: 911995125628928,
      level: 4870770,
      timestamp: '2024-01-05T07:59:00Z',
      block: 'BMAzb7p1ttRVArJvNNoLHHiMqnURRgk6w8HpFT6GMKMpfnPMLKJ',
      hash: 'ooVWjKFtUnXe77HcvA3N2ZTjaGEse47Pn9zJCSoGJArah879r7W',
      counter: 80788738,
      nonce: null,
      sender: {
        address: 'tz2MdcJs5yGqGN8xnUhJ6X3Xgzf29cWbLDmZ',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 4000000,
      parameter: {
        entrypoint: 'fulfill_ask',
        value: {
          amount: '1',
          ask_id: '10002458',
          proxy_for: null,
          referrers: {},
          condition_extra: null,
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 574013,
        offers: 574015,
        metadata: 574014,
        next_ask_id: '10002514',
        next_offer_id: '10000181',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574013,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'expru5eZjSw5pwkuRaoBZTxc7ULgsgEtK2VNcjkFVh7S2DtdmXsUne',
            key: '10002458',
            value: {
              token: {
                address: 'KT1V6tmo3J2fUr5cnh7K9Q7eaDq3e8i9ucwy',
                token_id: '133',
              },
              amount: '4000000',
              shares: {
                tz1Qtpj9fLrfunNwiE4pRjV3mxiR7uJN2Yid: '1000',
              },
              creator: 'tz1Qtpj9fLrfunNwiE4pRjV3mxiR7uJN2Yid',
              currency: {
                tez: {},
              },
              editions: '1',
              condition: null,
              expiry_time: null,
              platform_fee: '500',
              referral_bonus: '500',
            },
          },
        },
      ],
    },
    {
      id: 911995125628929,
      level: 4870771,
      timestamp: '2024-01-03T07:59:00Z',
      block: 'BMAzb7p1ttRVArJvNNoLHHiMqnURRgk6w8HpFT6GMKMpfnPMLKJ',
      hash: 'ooVWjKFtUnXe77HcvA3N2ZTjaGEse47Pn9zJCSoGJArah879r7W',
      counter: 80788738,
      nonce: null,
      sender: {
        address: 'tz2MdcJs5yGqGN8xnUhJ6X3Xgzf29cWbLDmZ',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 4000000,
      parameter: {
        entrypoint: 'fulfill_ask',
        value: {
          amount: '2',
          ask_id: '10002458',
          proxy_for: null,
          referrers: {},
          condition_extra: null,
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 574013,
        offers: 574015,
        metadata: 574014,
        next_ask_id: '10002514',
        next_offer_id: '10000181',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574013,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'expru5eZjSw5pwkuRaoBZTxc7ULgsgEtK2VNcjkFVh7S2DtdmXsUne',
            key: '10002458',
            value: {
              token: {
                address: 'KT1V6tmo3J2fUr5cnh7K9Q7eaDq3e8i9ucwy',
                token_id: '133',
              },
              amount: '4000000',
              shares: {
                tz1Qtpj9fLrfunNwiE4pRjV3mxiR7uJN2Yid: '1000',
              },
              creator: 'tz1Qtpj9fLrfunNwiE4pRjV3mxiR7uJN2Yid',
              currency: {
                tez: {},
              },
              editions: '1',
              condition: null,
              expiry_time: null,
              platform_fee: '500',
              referral_bonus: '500',
            },
          },
        },
      ],
    },
    {
      id: 919837291315200,
      level: 4901489,
      timestamp: '2024-01-10T17:25:58Z',
      block: 'BKrqccFyR9v7R41X69Ln1P6vbXY92whvXorY6M5E2V6jGLx288W',
      hash: 'oo6CcVT2suUa8QxGmkzGZ6zsW8cVPL2JshL9cUwVvQNSqDbgfzx',
      counter: 38804506,
      nonce: null,
      sender: {
        address: 'tz1LVUrnCK1DpB4YDhz2JGZcq5RxJDvdTnzh',
      },
      target: {
        address: 'KT1Xjap1TwmDR1d8yEd8ErkraAj2mbdMrPZY',
      },
      amount: 5000000,
      parameter: {
        entrypoint: 'fulfill_ask',
        value: {
          amount: '1',
          ask_id: '11000162',
          proxy_for: null,
          referrers: {},
          condition_extra: null,
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 591024,
        offers: 591026,
        metadata: 591025,
        next_ask_id: '11000187',
        next_offer_id: '11000040',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 591024,
          path: 'asks',
          action: 'update_key',
          content: {
            hash: 'expruqkbb7juzni93U7xTyg9bmuN7PuqHZUNpbZrSNG8r1MYbArsbB',
            key: '11000162',
            value: {
              token: {
                address: 'KT1Fu3StRtQF7Cff1fdvA2L2dJXquxA83bQU',
                token_id: '56',
              },
              amount: '5000000',
              shares: {
                tz1d45wFbpZLqS4SPoMRnEbhLopFt7zBhW3g: '1500',
              },
              creator: 'tz1d45wFbpZLqS4SPoMRnEbhLopFt7zBhW3g',
              currency: {
                tez: {},
              },
              editions: '9',
              condition: null,
              expiry_time: null,
              platform_fee: '500',
              referral_bonus: '500',
            },
          },
        },
      ],
    },
    {
      id: 1416974317912064,
      level: 7046266,
      timestamp: '2024-11-06T13:33:05Z',
      block: 'BKyeBaeNtBvbTKVfWvVYJBbj75gUw88V5YsFd8pmpiHAtDMVfGA',
      hash: 'oo2D6sb554QYXnhnpDEsmbAosYEu2UV2pHTy6Vm8asGCbqCsJs4',
      counter: 17288899,
      nonce: null,
      sender: {
        address: 'tz1WsREwyfd53rBUfd2tTyMDUxefokXzKpyP',
      },
      target: {
        address: 'KT1SwbTqhSKF6Pdokiu1K4Fpi17ahPPzmt1X',
      },
      amount: 1600000,
      parameter: {
        entrypoint: 'fulfill_ask',
        value: {
          amount: '1',
          ask_id: '12000002',
          proxy_for: null,
          referrers: {},
          condition_extra: null,
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 684371,
        offers: 684373,
        metadata: 684372,
        next_ask_id: '12000005',
        next_offer_id: '12000001',
        gallery_factory: 'KT1Ksc2gAP4mpt7fzwoF9Miwp6qFdavpS25u',
        permission_module: 'KT1N5x6wZXLqigVqGVHm3N2kHvyR6YWAD2Ta',
        fee_sharing_registry: 'KT1KmfuowNSgq66T1kpqPEpp6rat89QnixvD',
      },
      diffs: [
        {
          bigmap: 684371,
          path: 'asks',
          action: 'update_key',
          content: {
            hash: 'exprvHK26kvZRVeEydA7ogPCHWp4578XXp9zFUt9qfA1QAg9YwBsfz',
            key: '12000002',
            value: {
              token: {
                address: 'KT1WJ46bKE9mTh5JCi9MkF7yvnc2Bn7Xdx6u',
                token_id: '17',
              },
              amount: '1600000',
              shares: {
                tz1LKZUsxAe5U3YgfJ7pnMdCmazRn9AWnUk1: '2000',
              },
              creator: 'tz1LKZUsxAe5U3YgfJ7pnMdCmazRn9AWnUk1',
              currency: {
                tez: {},
              },
              editions: '9',
              condition: null,
              start_time: '2024-11-06T13:24:15Z',
              expiry_time: null,
              platform_fee: '500',
              exhibition_id: null,
              referral_bonus: '500',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktFulfillAskV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '697e1d4640d686a4c25b8819e8c7472a',
      type: 'OBJKT_FULFILL_ASK_V3_PRE',
      implements: 'SALE',
      opid: '911995125628928',
      ophash: 'ooVWjKFtUnXe77HcvA3N2ZTjaGEse47Pn9zJCSoGJArah879r7W',
      timestamp: '2024-01-05T07:59:00Z',
      level: 4870770,
      price: '4000000',
      fa2_address: 'KT1V6tmo3J2fUr5cnh7K9Q7eaDq3e8i9ucwy',
      token_id: '133',
      ask_id: '10002458',
      seller_address: 'tz1Qtpj9fLrfunNwiE4pRjV3mxiR7uJN2Yid',
      buyer_address: 'tz2MdcJs5yGqGN8xnUhJ6X3Xgzf29cWbLDmZ',
    },
    {
      ask_id: '11000162',
      buyer_address: 'tz1LVUrnCK1DpB4YDhz2JGZcq5RxJDvdTnzh',
      fa2_address: 'KT1Fu3StRtQF7Cff1fdvA2L2dJXquxA83bQU',
      id: 'ece74d8c38994c14316674c3e9678a18',
      implements: 'SALE',
      level: 4901489,
      ophash: 'oo6CcVT2suUa8QxGmkzGZ6zsW8cVPL2JshL9cUwVvQNSqDbgfzx',
      opid: '919837291315200',
      price: '5000000',
      seller_address: 'tz1d45wFbpZLqS4SPoMRnEbhLopFt7zBhW3g',
      timestamp: '2024-01-10T17:25:58Z',
      token_id: '56',
      type: 'OBJKT_FULFILL_ASK_V3',
    },
    {
      ask_id: '12000002',
      buyer_address: 'tz1WsREwyfd53rBUfd2tTyMDUxefokXzKpyP',
      fa2_address: 'KT1WJ46bKE9mTh5JCi9MkF7yvnc2Bn7Xdx6u',
      id: '7da29ac2dd848c5c5ec2dea025a2eb34',
      implements: 'SALE',
      level: 7046266,
      ophash: 'oo2D6sb554QYXnhnpDEsmbAosYEu2UV2pHTy6Vm8asGCbqCsJs4',
      opid: '1416974317912064',
      price: '1600000',
      seller_address: 'tz1LKZUsxAe5U3YgfJ7pnMdCmazRn9AWnUk1',
      timestamp: '2024-11-06T13:33:05Z',
      token_id: '17',
      type: 'OBJKT_FULFILL_ASK_V3_2',
    },
  ]);
});
