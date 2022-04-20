import HenSwapHandler from './hen_swap_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HEN_SWAP_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 112502455,
      level: 1879135,
      timestamp: '2021-11-20T08:09:52Z',
      block: 'BLy97rwKBbkbJGKyj8geGHBSveDzSRfnnhBx2kGPSRrTafowCU1',
      hash: 'opV4pGWPrYT9cycQeFtccT8wiceefEfvnhJXRLSV1fknXgDRbsk',
      counter: 25615291,
      sender: {
        address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      },
      target: {
        alias: 'hic et nunc Marketplace',
        address: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
      },
      parameter: {
        entrypoint: 'swap',
        value: {
          creator: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
          objkt_id: '545194',
          royalties: '150',
          objkt_amount: '1',
          xtz_per_objkt: '1830000',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '10',
        objkt: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
        swaps: 6072,
        counter: '1626768',
        manager: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
        metadata: 6071,
      },
      diffs: [
        {
          bigmap: 6072,
          path: 'swaps',
          action: 'add_key',
          content: {
            hash: 'exprtauT2WrSJkWJiJCbUCNcmPrfznsMNp8QhhcGRyY4LFxoGnSGCF',
            key: '1626767',
            value: {
              issuer: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
              creator: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
              objkt_id: '545194',
              royalties: '150',
              objkt_amount: '1',
              xtz_per_objkt: '1830000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [HenSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'e209b0de7efae600d9f9ef8d227b60e6',
      type: 'HEN_SWAP_V2',
      opid: 112502455,
      ophash: 'opV4pGWPrYT9cycQeFtccT8wiceefEfvnhJXRLSV1fknXgDRbsk',
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '545194',
      seller_address: 'tz1Q1UgXfAv2sWNCapibCakdBjB68hk6QuoV',
      artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ',
      swap_id: '1626767',
      price: '1830000',
      royalties: '150',
      amount: '1',
    },
  ]);
});
