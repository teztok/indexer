import TypedSwapHandler from './typed_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates TYPED_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 265997926,
      level: 2464662,
      timestamp: '2022-06-19T15:38:29Z',
      block: 'BMEkXrV7npxBPgoSFCpPuK5ePa8FB1g8m93s7g8wz7HuNNUWWBp',
      hash: 'opWmohpRCMZPSLCTFnfmyYzfRpeiyHXxWVE7Y9fSDcM9vrgriXD',
      counter: 27009506,
      sender: {
        address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
      },
      target: {
        alias: 'typed marketplace',
        address: 'KT1VoZeuBMJF6vxtLqEFMoc4no5VDG789D7z',
      },
      amount: 0,
      parameter: {
        entrypoint: 'swap',
        value: {
          fa2: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
          creator: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
          objkt_id: '2',
          royalties: '0',
          objkt_amount: '14',
          xtz_per_objkt: '100000',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '50',
        swaps: 196868,
        counter: '3',
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
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              fa2: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
              issuer: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
              creator: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
              objkt_id: '2',
              royalties: '100',
              objkt_amount: '14',
              xtz_per_objkt: '100000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [TypedSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'bf0ebafffef204c363edcd3a502d90ef',
      type: 'TYPED_SWAP',
      opid: '265997926',
      timestamp: '2022-06-19T15:38:29Z',
      level: 2464662,
      ophash: 'opWmohpRCMZPSLCTFnfmyYzfRpeiyHXxWVE7Y9fSDcM9vrgriXD',
      fa2_address: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
      token_id: '2',
      seller_address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
      artist_address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
      swap_id: '2',
      price: '100000',
      amount: '14',
    },
  ]);
});
