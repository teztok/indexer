import SetLedgerHandler from './set_ledger';
import { Transactions } from '../../../types';
import { transactionsToEvents } from '../event-producer';

test('creates SET_LEDGER events', async () => {
  const transactions: Transactions = [
    {
      id: 42065345,
      level: 1365242,
      timestamp: '2021-03-01T03:39:21Z',
      block: 'BMPAfxwn8rgQdhgvHJ479aF5sLPQ3uocSTkeZLDpLapf4Wqp34J',
      hash: 'onyoeuGPkxxXdKXYLwdzZ91nyaRFW4qVLKqkfwJv6j8Mt5cWb8C',
      counter: 4957695,
      sender: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
          token_id: '152',
          token_info: {
            '': '697066733a2f2f516d6131316b366168505258475656375267484e754c7577423950715142324d564a55744e4e584a376451654172',
          },
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'hicetnunc2000lab',
        address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      },
      storage: {
        ledger: 511,
        paused: false,
        metadata: 512,
        operators: 513,
        all_tokens: '153',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
      diffs: [
        {
          bigmap: 514,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprusBDEMffQGtgXrHHfUWWWvDGJvSRdt4WBNR5PRsZ5eWqC2nfJ7',
            key: '152',
            value: {
              token_id: '152',
              token_info: {
                '': '697066733a2f2f516d6131316b366168505258475656375267484e754c7577423950715142324d564a55744e4e584a376451654172',
              },
            },
          },
        },
        {
          bigmap: 511,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expru3VKqrBfsG3ZbP9eBTTpWrYWth5Ypp8qhn6JyM4BR3pTB3PGu8',
            key: {
              nat: '152',
              address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
            },
            value: '1',
          },
        },
      ],
    },
    {
      id: 42083287,
      level: 1365705,
      timestamp: '2021-03-01T11:28:07Z',
      block: 'BMedZBvdqk8Sv2anm4JXUjhhX6HnHaYFVdJYWm57xvWtbju8qvA',
      hash: 'ooDEeiWKwk7eL4DgUELErf6qkycYisbehWZsU3R1M2XWA5DKW2P',
      counter: 10511770,
      sender: {
        alias: 'KOSHA',
        address: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
      },
      target: {
        alias: 'hic et nunc NFTs',
        address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      },
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'tz1dfERyYcVRPG4WkZPf8k9TeRvc6i2gqBPx',
                amount: '100',
                token_id: '157',
              },
            ],
            from_: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
          },
        ],
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        ledger: 511,
        paused: false,
        metadata: 512,
        operators: 513,
        all_tokens: '160',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
      diffs: [
        {
          bigmap: 511,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'exprtokC7bqNeRVaLs5L9pE7ZqsBQdCcwuuYLm7mxLvqjATnXkjZ3k',
            key: {
              nat: '157',
              address: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
            },
            value: '0',
          },
        },
        {
          bigmap: 511,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprv6Rz5zhyhds5TdrHJKufekJHpxmMvUpikWYqmmV11JEXTpReiC',
            key: {
              nat: '157',
              address: 'tz1dfERyYcVRPG4WkZPf8k9TeRvc6i2gqBPx',
            },
            value: '100',
          },
        },
      ],
    },
    {
      id: 73113736,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      sender: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      target: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      parameter: {
        entrypoint: 'mint',
        value: '1',
      },
      amount: 15000000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fa2: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
        admin: 'tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN',
        price: '15000000',
        artist: 'tz1LLPWMyZ7gKsp3WnLfemyAYW6CoZoozku5',
        oracle: 'KT1AdbYiPYb5hDuEuVrfxmFehtnBCXv4Np7r',
        max_mint: '10',
        metadata: 12111,
        n_minted: '3167',
        max_supply: '4200',
        mint_index: '3680',
        sale_started: true,
        giveaway_index: '42',
        freeze_metadata: false,
        giveaway_amount: '42',
        provenance_hash: 'ipfs://QmYZPNzf2dgQoek9PMc4ZtPoaGB6hWnibKw95NaLDMGgp5',
        placeholder_ipfs_path:
          '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f',
        oracle_callback_expected: false,
      },
      diffs: null,
    },
    {
      id: 73113737,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      sender: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      target: {
        alias: 'Tezzardz',
        address: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
          metadata: {
            '': '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f33363830',
          },
          token_id: '3680',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      storage: {
        ledger: 12112,
        paused: false,
        metadata: 12113,
        operators: 12114,
        all_tokens: [],
        total_supply: 12116,
        administrator: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
        token_metadata: 12115,
      },
      diffs: [
        {
          bigmap: 12116,
          path: 'total_supply',
          action: 'add_key',
          content: {
            hash: 'exprtmP4hDUAVxxPVGa52AxtbKCYT6cWX75JNTUmymrzxANgKEPaer',
            key: '3680',
            value: '1',
          },
        },
        {
          bigmap: 12115,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprtmP4hDUAVxxPVGa52AxtbKCYT6cWX75JNTUmymrzxANgKEPaer',
            key: '3680',
            value: {
              token_id: '3680',
              token_info: {
                '': '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f33363830',
              },
            },
          },
        },
        {
          bigmap: 12112,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruq4h1cuWJmEtMDCTsiMuHHySc2ZExRprXL4WHPMYGCBi4y7tBY',
            key: {
              nat: '3680',
              address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
            },
            value: '1',
          },
        },
        {
          bigmap: 12112,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruq4h1cuWJmEtMDCTsiMuHHySc2ZExRprXL4WHPMYGCBi4y7tBY2',
            key: {
              nat: '3680',
              address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
            },
            value: '13435345348536458736458734657834658734653874563847563478563487563478563478563487563475836458734658743',
          },
        },
      ],
    },
    {
      id: 73113738,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      sender: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      target: {
        alias: 'Tezzardz Artist',
        address: 'tz1LLPWMyZ7gKsp3WnLfemyAYW6CoZoozku5',
      },
      parameter: null,
      amount: 7500000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 73113739,
      level: 1654751,
      timestamp: '2021-08-31T19:12:48Z',
      block: 'BM3iDeDvCVmwpM2cky9cqRbYzB1e9dt1Et8FNb2h6nxZYpuHxyc',
      hash: 'ooPfj1wFuJgUCkmmFMkgSvsMQCQ6g2uisedy1ktd8u7xys4PjXD',
      counter: 14390193,
      sender: {
        alias: 'Tezzardz Crowdsale',
        address: 'KT1DdxmJujm3u2ZNkYwV24qLBJ6iR7sc58B9',
      },
      target: {
        alias: 'Tezzardz Admin',
        address: 'tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN',
      },
      parameter: null,
      amount: 7500000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 190861006,
      level: 2219948,
      timestamp: '2022-03-23T09:40:44Z',
      block: 'BLoB4JMUUbhNzXLRXkWQkHVh9Zx2HzU6HNwBzT1TuptuuUVUdoZ',
      hash: 'oopLhJLjumQYaA3ryubFKtrkRQoBdewgBsqNwDqEb2zUQjobdGF',
      counter: 11694432,
      sender: {
        address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      },
      target: {
        alias: '8bidou 8x8',
        address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      },
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
                amount: '10',
                token_id: '2213',
              },
            ],
            from_: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
          },
        ],
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'Mark Knol',
        address: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
      },
      storage: {
        rgb: 113218,
        ledger: 113213,
        metadata: 113217,
        operators: 113214,
        token_index: '2219',
        token_metadata: 113216,
        token_total_supply: 113215,
      },
      diffs: [
        {
          bigmap: 113213,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruR1DW4t37iSVtz6SMousHz9BU9NN7dsqdLsZAkmiwt2aPdZ9DS',
            key: {
              nat: '2213',
              address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
            },
            value: '10',
          },
        },
        {
          bigmap: 113213,
          path: 'ledger',
          action: 'remove_key',
          content: {
            hash: 'exprugEenUr6dev2pi4Q246k3AFvyuiG7LAwUmUqKaSoffPia1khJX',
            key: {
              nat: '2213',
              address: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
            },
            value: '10',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [SetLedgerHandler]);

  expect(events).toStrictEqual([
    {
      id: 'bbbf0d6b108216ca4162179aed96f8f0',
      type: 'SET_LEDGER',
      opid: 42065345,
      timestamp: '2021-03-01T03:39:21Z',
      level: 1365242,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '152',
      holder_address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      amount: '1',
      is_mint: true,
      price: '0',
    },
    {
      id: '8f9943d837df16081b5d7cce3f95ca66',
      type: 'SET_LEDGER',
      opid: 42083287,
      timestamp: '2021-03-01T11:28:07Z',
      level: 1365705,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157',
      holder_address: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
      amount: '0',
      is_mint: false,
      price: '0',
    },
    {
      id: '019d7c3e99af0896036d98cfe962ae8d',
      type: 'SET_LEDGER',
      opid: 42083287,
      timestamp: '2021-03-01T11:28:07Z',
      level: 1365705,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157',
      holder_address: 'tz1dfERyYcVRPG4WkZPf8k9TeRvc6i2gqBPx',
      amount: '100',
      is_mint: false,
      price: '0',
    },
    {
      id: '204c4024ff18ea5ec82c81f07cddbb8e',
      type: 'SET_LEDGER',
      opid: 73113737,
      timestamp: '2021-08-31T19:12:48Z',
      level: 1654751,
      fa2_address: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
      token_id: '3680',
      holder_address: 'tz1XBqVe91Rdao2wJFANPH9yAHsuu66GrqB5',
      amount: '1',
      is_mint: true,
      price: '15000000',
    },
    {
      id: '6eb5a65f2838468515dbe5d604a28160',
      type: 'SET_LEDGER',
      opid: 190861006,
      timestamp: '2022-03-23T09:40:44Z',
      level: 2219948,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2213',
      holder_address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      amount: '10',
      is_mint: false,
      price: '0',
    },
    {
      id: '6803f17540f4b8197ef34e5cf354a0f3',
      type: 'SET_LEDGER',
      opid: 190861006,
      timestamp: '2022-03-23T09:40:44Z',
      level: 2219948,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2213',
      holder_address: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
      amount: '0',
      is_mint: false,
      price: '0',
    },
  ]);
});
