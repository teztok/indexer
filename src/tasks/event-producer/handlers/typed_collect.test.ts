import TypedCollectHandler from './typed_collect';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates TYPED_COLLECT events', async () => {
  const transactions: Transactions = [
    {
      id: 266019660,
      level: 2464714,
      timestamp: '2022-06-19T16:04:29Z',
      block: 'BLvacW5L4auscFNARKk9erSY3i4XMJuBZywDoFdCSbvWkZnqsoe',
      hash: 'onvtWzLQ19FeYJE11qZC4kYTABXmHoA8tauTk9ex4NFSBYqc1Ly',
      counter: 25359420,
      sender: {
        address: 'tz1drgoKdfdFMwATQLJEKd4UufrXkqsMuHE6',
      },
      target: {
        alias: 'typed marketplace',
        address: 'KT1VoZeuBMJF6vxtLqEFMoc4no5VDG789D7z',
      },
      amount: 100000,
      parameter: {
        entrypoint: 'collect',
        value: '5',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '50',
        swaps: 196868,
        counter: '7',
        manager: 'tz1aqMiWgnFddGZSTsEMSe8qbXkVGn7C4cg5',
        metadata: 196867,
        royalties: '100',
        allowed_fa2s: 196866,
        swaps_paused: false,
        fee_recipient: 'tz1aqMiWgnFddGZSTsEMSe8qbXkVGn7C4cg5',
        collects_paused: false,
      },
      diffs: [
        {
          bigmap: 196868,
          path: 'swaps',
          action: 'update_key',
          content: {
            hash: 'exprtqoNj2hRg8PsPMaXLcy3dXjMM3B7nHKrRNqpfjbYpMbULbRj8k',
            key: '5',
            value: {
              fa2: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
              issuer: 'tz1gjbrnGnBBbQxwVXvcN8e2JzW1QXEL4N2z',
              creator: 'tz1gjbrnGnBBbQxwVXvcN8e2JzW1QXEL4N2z',
              objkt_id: '6',
              royalties: '100',
              objkt_amount: '19',
              xtz_per_objkt: '100000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [TypedCollectHandler]);

  expect(events).toStrictEqual([
    {
      id: '46dcf25069542a7c649c5e53bfa3b199',
      type: 'TYPED_COLLECT',
      implements: 'SALE',
      opid: 266019660,
      ophash: 'onvtWzLQ19FeYJE11qZC4kYTABXmHoA8tauTk9ex4NFSBYqc1Ly',
      timestamp: '2022-06-19T16:04:29Z',
      level: 2464714,
      fa2_address: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
      token_id: '6',
      swap_id: '5',
      buyer_address: 'tz1drgoKdfdFMwATQLJEKd4UufrXkqsMuHE6',
      seller_address: 'tz1gjbrnGnBBbQxwVXvcN8e2JzW1QXEL4N2z',
      artist_address: 'tz1gjbrnGnBBbQxwVXvcN8e2JzW1QXEL4N2z',
      price: '100000',
    },
  ]);
});
