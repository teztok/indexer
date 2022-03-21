import HenSwapHandler from './hen_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HEN_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 43578954,
      level: 1395008,
      timestamp: '2021-03-21T23:31:18Z',
      block: 'BLu4DtSzzv9MM5U4HgBCapBQqc2qWPQ4GyzCy6PsFu7SwKAaNJS',
      hash: 'onhcvyLbwrdZo869rc83zEH9SLVWFjAGUsfVa4p3UzSTVhRTA2Q',
      counter: 10650227,
      sender: {
        alias: 'Sebuh Honarchian',
        address: 'tz1NufWtpqS3nfR8VW1xFyWq4GWqb969keeR',
      },
      target: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      parameter: {
        entrypoint: 'swap',
        value: {
          objkt_id: '10041',
          objkt_amount: '69',
          xtz_per_objkt: '696900',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        hdao: 'KT1AFA2mwNUMNd4SsujE1YYp29vd8BZejyKW',
        size: '0',
        objkt: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
        swaps: 523,
        curate: 'KT1TybhR7XraG75JFYKSrh7KnxukMBT5dor6',
        locked: true,
        genesis: '2021-04-15T02:09:41Z',
        manager: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
        swap_id: '10012',
        metadata: 521,
        objkt_id: '10044',
        royalties: 522,
      },
      diffs: [
        {
          bigmap: 523,
          path: 'swaps',
          action: 'add_key',
          content: {
            hash: 'exprthSQN3Egghq93uQqWFWDE5q66xWwokXhTrAPKXAVTFdi5yuNGM',
            key: '10011',
            value: {
              issuer: 'tz1NufWtpqS3nfR8VW1xFyWq4GWqb969keeR',
              objkt_id: '10041',
              objkt_amount: '69',
              xtz_per_objkt: '696900',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [HenSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'c4e96250646f5ec6e3ca1c93fcd790a3',
      type: 'HEN_SWAP',
      opid: 43578954,
      timestamp: '2021-03-21T23:31:18Z',
      level: 1395008,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '10041',
      seller_address: 'tz1NufWtpqS3nfR8VW1xFyWq4GWqb969keeR',
      swap_id: '10011',
      price: '696900',
      amount: '69',
    },
  ]);
});
