import ObjktFulfillOfferV3Handler from './objkt_fulfill_offer_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_FULFILL_OFFER_V3_PRE events', async () => {
  const transactions: Transactions = [
    {
      id: 910989401784320,
      level: 4866747,
      timestamp: '2024-01-04T14:58:17Z',
      block: 'BMacR4hsThuTSKzTJTQ9QsVftdx4HAV1toHxJUKPSe3gS3GjAxQ',
      hash: 'onpq5QsXZUgBDqMQuAKQq5ybb44syyimx57MppvUymDZgSNLv9c',
      counter: 51511243,
      nonce: null,
      sender: {
        address: 'tz1XUtVSyA3Yyf9ojvm37kNDQy2oTDGRHnsb',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 0,
      parameter: {
        entrypoint: 'fulfill_offer',
        value: {
          offer_id: '10000008',
          token_id: null,
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
        next_ask_id: '10000106',
        next_offer_id: '10000010',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574015,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'expruoUmsJYHTsKF69n25XX3MKLfRKnXPJzFkFW5paSkUF39pJjRSF',
            key: '10000008',
            value: {
              token: {
                address: 'KT1WGDVRnff4rmGzJUbdCRAJBmYt12BrPzdD',
                token_id: '1003',
              },
              amount: '101220',
              shares: {
                tz1VyuSwhEcaeqdevUXQNJET9iwThBY2wkTB: '500',
              },
              creator: 'tz1YjEUThMfHRLAzRVnZgzKhjf7Nks5tc8an',
              currency: {
                tez: {},
              },
              condition: null,
              expiry_time: '2024-02-03T14:53:01Z',
              platform_fee: '500',
            },
          },
        },
      ],
    },
    {
      id: 919807211864064,
      level: 4901368,
      timestamp: '2024-01-10T16:55:43Z',
      block: 'BLKqz5crqXkBDYmH7KWaWoFMJ6PnHpRhsiQ673d9QDP2zpRFiLh',
      hash: 'ooTGHQYhcCMvTNuLqq9me5uhSyFW8zcBCm3CL2ZnwDzPF8ZoDa5',
      counter: 124288144,
      nonce: null,
      sender: {
        address: 'tz1bF3vDSxzuhCqbnNSAqpLN3MAswEvLezhr',
      },
      target: {
        address: 'KT1Xjap1TwmDR1d8yEd8ErkraAj2mbdMrPZY',
      },
      amount: 0,
      parameter: {
        entrypoint: 'fulfill_offer',
        value: {
          offer_id: '11000019',
          token_id: '8',
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
        next_ask_id: '11000129',
        next_offer_id: '11000026',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 591026,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'expruvprWHpuL5A5A9YXdDxkwMpcDW8j7wH8s4BX4zaM3NdQQGVBsS',
            key: '11000019',
            value: {
              token: {
                address: 'KT1CLDUuqgyA8CxXQ2XS5YsDYatPZjkF82Ac',
                token_id: '8',
              },
              amount: '3000000',
              shares: {
                tz1bF3vDSxzuhCqbnNSAqpLN3MAswEvLezhr: '1000',
              },
              creator: 'tz2FbVn9hTs5zVe42i1DZtWDnKGqzyJW7UNp',
              currency: {
                tez: {},
              },
              condition: null,
              referrers: {},
              expiry_time: '2024-02-09T16:40:11Z',
              platform_fee: '500',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktFulfillOfferV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '33bd9c12075ebd2c485d7ec2d2c0f2eb',
      type: 'OBJKT_FULFILL_OFFER_V3_PRE',
      implements: 'SALE',
      opid: '910989401784320',
      ophash: 'onpq5QsXZUgBDqMQuAKQq5ybb44syyimx57MppvUymDZgSNLv9c',
      timestamp: '2024-01-04T14:58:17Z',
      level: 4866747,
      price: '101220',
      fa2_address: 'KT1WGDVRnff4rmGzJUbdCRAJBmYt12BrPzdD',
      token_id: '1003',
      offer_id: '10000008',
      seller_address: 'tz1XUtVSyA3Yyf9ojvm37kNDQy2oTDGRHnsb',
      buyer_address: 'tz1YjEUThMfHRLAzRVnZgzKhjf7Nks5tc8an',
    },
    {
      buyer_address: 'tz2FbVn9hTs5zVe42i1DZtWDnKGqzyJW7UNp',
      fa2_address: 'KT1CLDUuqgyA8CxXQ2XS5YsDYatPZjkF82Ac',
      id: '1006fb4610a6b7ec288531bec27bacbd',
      implements: 'SALE',
      level: 4901368,
      offer_id: '11000019',
      ophash: 'ooTGHQYhcCMvTNuLqq9me5uhSyFW8zcBCm3CL2ZnwDzPF8ZoDa5',
      opid: '919807211864064',
      price: '3000000',
      seller_address: 'tz1bF3vDSxzuhCqbnNSAqpLN3MAswEvLezhr',
      timestamp: '2024-01-10T16:55:43Z',
      token_id: '8',
      type: 'OBJKT_FULFILL_OFFER_V3',
    },
  ]);
});
