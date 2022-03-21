import HenCancelSwapHandler from './hen_cancel_swap_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HEN_CANCEL_SWAP_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 112502472,
      level: 1879135,
      timestamp: '2021-11-20T08:09:52Z',
      block: 'BLy97rwKBbkbJGKyj8geGHBSveDzSRfnnhBx2kGPSRrTafowCU1',
      hash: 'oo2dz8XoWzdcZgWzK4LVU3vriY4HxXqcVgsvLLG6aCczpPd5mLN',
      counter: 25600752,
      sender: {
        address: 'tz1i1jcNK8N9XDR5NTuNNYJLGX7S568KHYa4',
      },
      target: {
        alias: 'hic et nunc Marketplace',
        address: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
      },
      parameter: {
        entrypoint: 'cancel_swap',
        value: '1612218',
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
          action: 'remove_key',
          content: {
            hash: 'exprtZAvbHKQB4Ra6979h1ukjFcLHCbbFsj7RfAxV5RC3aX3pk2oix',
            key: '1612218',
            value: {
              issuer: 'tz1i1jcNK8N9XDR5NTuNNYJLGX7S568KHYa4',
              creator: 'tz1ZAzUws7fduRQNHRKsaxnq8sKoM1RbdgDq',
              objkt_id: '536500',
              royalties: '250',
              objkt_amount: '1',
              xtz_per_objkt: '4350000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [HenCancelSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: '46bf43b825f7aecc9157db62615b7a38',
      type: 'HEN_CANCEL_SWAP_V2',
      opid: 112502472,
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      seller_address: 'tz1i1jcNK8N9XDR5NTuNNYJLGX7S568KHYa4',
      artist_address: 'tz1ZAzUws7fduRQNHRKsaxnq8sKoM1RbdgDq',
      token_id: '536500',
      swap_id: '1612218',
    },
  ]);
});
