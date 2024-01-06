import ObjktFulfillAskV3Handler from './objkt_fulfill_ask_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_FULFILL_ASK_V3 events', async () => {
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
  ];

  const events = transactionsToEvents(transactions, [ObjktFulfillAskV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '697e1d4640d686a4c25b8819e8c7472a',
      type: 'OBJKT_FULFILL_ASK_V3',
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
  ]);
});
