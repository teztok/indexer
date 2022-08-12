import SetLedgerHandler, { isValidMultiAssetLedgerEntry, extractAddressAndTokenIdFromBigmapDiffKey } from './set_ledger';
import { Transactions } from '../../../types';
import { transactionsToEvents } from '../event-producer';

test('extracts holderAddress and tokenId from bigmap-diff key', () => {
  expect(
    extractAddressAndTokenIdFromBigmapDiffKey({
      owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
      token_id: '2',
    })
  ).toEqual({
    holderAddress: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
    tokenId: '2',
  });

  expect(
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      nat: '152',
    })
  ).toEqual({
    holderAddress: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
    tokenId: '152',
  });

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey(null);
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'foo',
      nat: '152',
    });
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      nat: '152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947152234823947',
    });
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
    });
  }).toThrow();

  expect(() => {
    extractAddressAndTokenIdFromBigmapDiffKey({
      address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      nat: '152',
      baz: 'test',
    });
  }).toThrow();
});

test('checks if a diff entry is a valid multi-asset', () => {
  expect(
    isValidMultiAssetLedgerEntry({
      hash: 'expruZkxjTyNjtSAg9hnGDdEpS6kY6b5gjdaN9aE2xVr9wGrTBqNbP',
      key: {
        owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
        token_id: '2',
      },
      value: '1',
    })
  ).toBe(true);

  expect(
    isValidMultiAssetLedgerEntry({
      hash: 'expruZkxjTyNjtSAg9hnGDdEpS6kY6b5gjdaN9aE2xVr9wGrTBqNbP',
      key: {
        owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
        token_id: '2',
      },
      value: 'foo',
    })
  ).toBe(false);
});

test('creates SET_LEDGER events', async () => {
  const transactions: Transactions = [
    {
      id: 42065345,
      level: 1365242,
      timestamp: '2021-03-01T03:39:21Z',
      block: 'BMPAfxwn8rgQdhgvHJ479aF5sLPQ3uocSTkeZLDpLapf4Wqp34J',
      hash: 'onyoeuGPkxxXdKXYLwdzZ91nyaRFW4qVLKqkfwJv6j8Mt5cWb8C',
      counter: 4957695,
      nonce: null,
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
      nonce: null,
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
      nonce: null,
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
      nonce: 1,
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
      nonce: 2,
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
      nonce: 3,
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
      nonce: null,
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
    {
      id: 185310949,
      level: 2187033,
      timestamp: '2022-03-11T10:10:04Z',
      block: 'BMWpcykkEXjfU2W14wUprEU7JrsvXTcBfkrut3BR35qGrxPkmLL',
      hash: 'ootJMtSR9vBpNvsk1hZm63wgBLu5fFY9Mu1riNaxMkWqkjyaSkA',
      counter: 50147075,
      nonce: null,
      sender: {
        address: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
      },
      target: {
        address: 'KT1CzVSa18hndYupV9NcXy3Qj7p8YFDZKVQv',
      },
      amount: 0,
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
                amount: '1',
                token_id: '2',
              },
            ],
            from_: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
          },
        ],
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        admin: 'tz1bWgKiizRZxCyQzJhDtiGmu3jduyaauKmW',
        ledger: 127310,
        minted: 127313,
        metadata: 127315,
        operators: 127311,
        transmuter: 'KT1WvV2rPBQUFUqtCWmnnj8JX2gkmDtMBzQi',
        token_limits: 127314,
        frozen_ledger: 127312,
        token_metadata: 127316,
      },
      diffs: [
        {
          bigmap: 127310,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruZkxjTyNjtSAg9hnGDdEpS6kY6b5gjdaN9aE2xVr9wGrTBqNbP',
            key: {
              owner: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
              token_id: '2',
            },
            value: '1',
          },
        },
        {
          bigmap: 127310,
          path: 'ledger',
          action: 'remove_key',
          content: {
            hash: 'exprvLCwU4re5DnUyjpDCsY8thXVKMT2QfK7Qw2eRwAYYRTvQzdpyf',
            key: {
              owner: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
              token_id: '2',
            },
            value: '1',
          },
        },
      ],
    },
    {
      id: 279128980,
      level: 2509067,
      timestamp: '2022-07-05T22:00:29Z',
      block: 'BLbsPhr8FA2LeFR9fpBbdt7bEuuqXxr4i5cioZbRDWE31sq3ZPn',
      hash: 'op9pYr7Kgvyk381zsL1syWBeLkcR35atQqjL8uHGJmjkrucu1yW',
      counter: 11549458,
      sender: {
        alias: 'Big Foot Mafia Club Admin',
        address: 'KT1SnDiCRx4dgdgozLqodFdpRstuUgQMPhvG',
      },
      target: {
        alias: 'Big Foot Mafia Club',
        address: 'KT1BY2HcwQBx9mwLDvMvrFH7M9M1HHq5xHSn',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1RaGprXFM7iXhV7VtY636FjA6oC9brU2es',
          metadata: {
            '': '697066733a2f2f516d554a3867714e574b5a32684865453669376944644c31385375656d5672695178703358314a64594d645875712f333031322e6a736f6e',
          },
          token_id: '3012',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1RaGprXFM7iXhV7VtY636FjA6oC9brU2es',
      },
      storage: {
        admin: 'KT1SnDiCRx4dgdgozLqodFdpRstuUgQMPhvG',
        assets: {
          ledger: 212660,
          operators: 212661,
          next_token_id: '3013',
          token_metadata: 212662,
          token_total_supply: 212663,
        },
        metadata: 212659,
      },
      diffs: [
        {
          bigmap: 212663,
          path: 'assets.token_total_supply',
          action: 'add_key',
          content: {
            hash: 'exprtyRuvGQ1MJ1tT6yp9QKx1kmvqknnVqq4VqH43WQX6FZpsM1iwG',
            key: '3012',
            value: '1',
          },
        },
        {
          bigmap: 212662,
          path: 'assets.token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprtyRuvGQ1MJ1tT6yp9QKx1kmvqknnVqq4VqH43WQX6FZpsM1iwG',
            key: '3012',
            value: {
              token_id: '3012',
              token_info: {
                '': '697066733a2f2f516d554a3867714e574b5a32684865453669376944644c31385375656d5672695178703358314a64594d645875712f333031322e6a736f6e',
              },
            },
          },
        },
        {
          bigmap: 212660,
          path: 'assets.ledger',
          action: 'add_key',
          content: {
            hash: 'expru2gckHHRZse2ED4AETeAzNsXY3jxMNWdMvrpJz1umu8KaLBSnA',
            key: {
              nat: '3012',
              address: 'tz1RaGprXFM7iXhV7VtY636FjA6oC9brU2es',
            },
            value: '1',
          },
        },
      ],
      nonce: 32,
    },
    {
      id: 124047413,
      level: 1877594,
      timestamp: '2021-11-19T19:07:02Z',
      block: 'BLkXYwv3uT6UzB3KQFCRxgR2jJ1ckWJDa638RsefX8oSkYB2G5c',
      hash: 'opQsBRkFSj3e72tEoQf6B5Nezb9PKNRjiUufcBoC1YKrAt73NVF',
      counter: 26257577,
      sender: {
        alias: 'Cyber Gecko Crowdsale',
        address: 'KT1JTaXMDKxQJ4bDvHGHGz9aoEAvQubC3e29',
      },
      target: {
        alias: 'Cyber Gecko Gang',
        address: 'KT1CwSgYmZewFazZsW348RAQYn1nthiGP3Qa',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1PHNbDbKYVNhNj9CaAzau5GNqRoWfpQw5e',
          metadata: {
            '': '697066733a2f2f516d52394c4d467145353959383778784d355a67365a36684734664368475252434e5172796f36377134366269452f3135352e6a736f6e',
          },
          token_id: '155',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1PHNbDbKYVNhNj9CaAzau5GNqRoWfpQw5e',
      },
      storage: {
        admin: 'KT1JTaXMDKxQJ4bDvHGHGz9aoEAvQubC3e29',
        assets: {
          ledger: 36980,
          operators: 36981,
          next_token_id: '2223',
          token_metadata: 36982,
          token_total_supply: 36983,
        },
        metadata: 36979,
      },
      diffs: [
        {
          bigmap: 36983,
          path: 'assets.token_total_supply',
          action: 'add_key',
          content: {
            hash: 'exprvPGbGdo6Pn6sBPePRvXCkSiKCuNtpHQirkpod7wj2Urp2WaxW8',
            key: '155',
            value: '1',
          },
        },
        {
          bigmap: 36982,
          path: 'assets.token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprvPGbGdo6Pn6sBPePRvXCkSiKCuNtpHQirkpod7wj2Urp2WaxW8',
            key: '155',
            value: {
              token_id: '155',
              token_info: {
                '': '697066733a2f2f516d52394c4d467145353959383778784d355a67365a36684734664368475252434e5172796f36377134366269452f3135352e6a736f6e',
              },
            },
          },
        },
        {
          bigmap: 36980,
          path: 'assets.ledger',
          action: 'add_key',
          content: {
            hash: 'exprv54UvYK9yfxFf9fuf9aMtebSGnrB6n9ALNtTnMgVNmv3ZxpX5q',
            key: {
              nat: '155',
              address: 'tz1PHNbDbKYVNhNj9CaAzau5GNqRoWfpQw5e',
            },
            value: '1',
          },
        },
      ],
      nonce: 5,
    },
    {
      id: 154257835,
      level: 2026426,
      timestamp: '2022-01-13T03:46:20Z',
      block: 'BM3FC7FmYkuJZa1DLhLxq8oiveCuRRZ5fVctnv4Kb6ZRkAFMRPS',
      hash: 'ooKnKEDKj72spm5qwVm4MZPfzjqwsQBAYyhXKzaxus57TYdjbtk',
      counter: 45136621,
      sender: {
        alias: 'GAP NFT Seller',
        address: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
      },
      target: {
        alias: 'GAP Threads Asset Manager',
        address: 'KT1GA6KaLWpURnjvmnxB4wToErzM2EXHqrMo',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: [
          {
            owner: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
            amount: '10000',
            token_info: {
              '': '697066733a2f2f62616679626569656d79706e746c6570736b6b67726163776a7078326c3535626b627832657a686b76687836626367796a796567696f7365716f69',
            },
          },
        ],
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        admin: {
          admin: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
          paused: false,
          pending_admin: null,
        },
        assets: {
          ledger: 77034,
          operators: 77035,
          next_token_id: '2',
          token_metadata: 77036,
          contract_operators: [],
          token_total_supply: 77037,
        },
        metadata: 77038,
      },
      diffs: [
        {
          bigmap: 77037,
          path: 'assets.token_total_supply',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: '10000',
          },
        },
        {
          bigmap: 77036,
          path: 'assets.token_metadata',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              token_id: '1',
              token_info: {
                '': '697066733a2f2f62616679626569656d79706e746c6570736b6b67726163776a7078326c3535626b627832657a686b76687836626367796a796567696f7365716f69',
              },
            },
          },
        },
        {
          bigmap: 77034,
          path: 'assets.ledger',
          action: 'add_key',
          content: {
            hash: 'exprvL5aRGaoP6g8zAXwubhWdF1SapvJXdbeps1Skgs8ECmDupRoAR',
            key: {
              nat: '1',
              address: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
            },
            value: '10000',
          },
        },
      ],
      nonce: null,
    },
    {
      id: 177395668,
      level: 2140752,
      timestamp: '2022-02-22T22:01:20Z',
      block: 'BMbZeVzi4aaaH2Qt76zuZhfMghUQsv8RbHfZev3fJMh2j8mLfEd',
      hash: 'onwYmD9BvfHkZMKPMUsg3incNr9fgmLnMddagCC7SgPKu43FJbX',
      counter: 28626027,
      sender: {
        alias: 'DOGAMÍ NFT Sale',
        address: 'KT1CpMKxKFoHvS7zxSd2M6SHU8BD4gBmtw2N',
      },
      target: {
        alias: 'DOGAMÍ NFTs',
        address: 'KT1NVvPsNDChrLRH5K2cy6Sc9r1uuUwdiZQd',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          to_: 'tz1XqrVXcRKDLeWFNWMuDaxhhvYu6zE7WzZc',
          token_id: '2',
          token_info: {
            name: '446f67616d69202332',
            rights: '28632920444f47414d492e20416c6c205269676874732052657365727665642e',
            formats:
              '5b7b226d696d6554797065223a2022766964656f2f6d7034222c2022757269223a2022697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70227d5d',
            creators: '5b22444f47414d49225d',
            decimals: '30',
            royalties:
              '7b22646563696d616c73223a20322c2022736861726573223a207b22747a31626a394e784b59757073375743466d79746b594a547736727874697a4a5237394b223a20377d7d',
            attributes:
              '0502000000380704010000000a47656e65726174696f6e070703060100000005416c70686107040100000006537461747573070703060100000003426f78',
            displayUri: '697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053',
            artifactUri: '697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337',
            description: '444f47414d492c2041646f70742052616973652c204561726e2e',
            thumbnailUri: '697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70',
            isBooleanAmount: '74727565',
          },
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XqrVXcRKDLeWFNWMuDaxhhvYu6zE7WzZc',
      },
      storage: {
        ledger: 115417,
        metadata: 115418,
        multisig: 'KT1FDSvLCUcFZStQAKo5Fb4igCwtqipRcvMX',
        contracts: ['KT1CpMKxKFoHvS7zxSd2M6SHU8BD4gBmtw2N'],
        operators: 115419,
        burn_paused: true,
        total_supply: '1',
        token_metadata: 115420,
        contract_paused: false,
      },
      diffs: [
        {
          bigmap: 115420,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              token_id: '2',
              token_info: {
                name: '446f67616d69202332',
                rights: '28632920444f47414d492e20416c6c205269676874732052657365727665642e',
                formats:
                  '5b7b226d696d6554797065223a2022766964656f2f6d7034222c2022757269223a2022697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70227d5d',
                creators: '5b22444f47414d49225d',
                decimals: '30',
                royalties:
                  '7b22646563696d616c73223a20322c2022736861726573223a207b22747a31626a394e784b59757073375743466d79746b594a547736727874697a4a5237394b223a20377d7d',
                attributes:
                  '0502000000380704010000000a47656e65726174696f6e070703060100000005416c70686107040100000006537461747573070703060100000003426f78',
                displayUri: '697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053',
                artifactUri: '697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337',
                description: '444f47414d492c2041646f70742052616973652c204561726e2e',
                thumbnailUri: '697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70',
                isBooleanAmount: '74727565',
              },
            },
          },
        },
        {
          bigmap: 115417,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: 'tz1XqrVXcRKDLeWFNWMuDaxhhvYu6zE7WzZc',
          },
        },
      ],
      nonce: 2,
    },
    {
      id: 312568078,
      level: 2615203,
      timestamp: '2022-08-12T09:52:59Z',
      block: 'BL1tud34P1G1Mx3HHJFUegYrLRBHTm4AHFm9ntsgJePoVcLUtsN',
      hash: 'ooN5Y3bWkSfxaxdYefWcV4Yy71axwkKeZx1xaMFnCb3Sn7iuLxh',
      counter: 51823329,
      sender: {
        address: 'KT1HnV6WJFLksLaLZRLck1TX4SbbcTXULX9t',
      },
      target: {
        alias: 'DOGAMÍ NFTs',
        address: 'KT1NVvPsNDChrLRH5K2cy6Sc9r1uuUwdiZQd',
      },
      amount: 0,
      parameter: {
        entrypoint: 'transfer',
        value: [
          {
            txs: [
              {
                to_: 'tz1dgY9H4xCxzJs1pnaSQnXjPefRyBLfEXFq',
                amount: '1',
                token_id: '8479',
              },
            ],
            from_: 'KT1HnV6WJFLksLaLZRLck1TX4SbbcTXULX9t',
          },
        ],
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1dgY9H4xCxzJs1pnaSQnXjPefRyBLfEXFq',
      },
      storage: {
        ledger: 115417,
        metadata: 115418,
        multisig: 'KT1FDSvLCUcFZStQAKo5Fb4igCwtqipRcvMX',
        contracts: ['KT1Ayt8mzj7Ky4gx1HN9DKiSQeV8CZ1B3QTz', 'KT1BSWXPDtdWVEKLcHJicUot647RyMPZ1rBa', 'KT1TjHyHTnL4VMQQyD75pr3ZTemyPvQxRPpA'],
        operators: 115419,
        burn_paused: true,
        total_supply: '12000',
        token_metadata: 115420,
        contract_paused: false,
      },
      diffs: [
        {
          bigmap: 115417,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'exprtaUj2DaSZoMbTyazmNdbweEsUMLZr3bGsU8ABqdAaJ6mzqqeFu',
            key: '8479',
            value: 'tz1dgY9H4xCxzJs1pnaSQnXjPefRyBLfEXFq',
          },
        },
      ],
      nonce: 13,
    },
  ];

  const events = transactionsToEvents(transactions, [SetLedgerHandler]);

  expect(events).toStrictEqual([
    {
      id: '354fb63356b430b339d04250a5fa6e65',
      type: 'SET_LEDGER',
      opid: 42065345,
      ophash: 'onyoeuGPkxxXdKXYLwdzZ91nyaRFW4qVLKqkfwJv6j8Mt5cWb8C',
      timestamp: '2021-03-01T03:39:21Z',
      level: 1365242,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '152',
      holder_address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
      amount: '1',
      is_mint: true,
      ledger_type: 'MULTI_ASSET',
    },
    {
      id: '24fa886117ad30c88583c51eab12711b',
      type: 'SET_LEDGER',
      opid: 42083287,
      ophash: 'ooDEeiWKwk7eL4DgUELErf6qkycYisbehWZsU3R1M2XWA5DKW2P',
      timestamp: '2021-03-01T11:28:07Z',
      level: 1365705,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157',
      holder_address: 'tz1ZdMfzmWLb8mu22jE7rZ8Y3t9iKezM68cq',
      amount: '0',
      is_mint: false,
      ledger_type: 'MULTI_ASSET',
    },
    {
      id: 'f58d89c87461f104631e2015037e30b6',
      type: 'SET_LEDGER',
      opid: 42083287,
      ophash: 'ooDEeiWKwk7eL4DgUELErf6qkycYisbehWZsU3R1M2XWA5DKW2P',
      timestamp: '2021-03-01T11:28:07Z',
      level: 1365705,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157',
      holder_address: 'tz1dfERyYcVRPG4WkZPf8k9TeRvc6i2gqBPx',
      amount: '100',
      is_mint: false,
      ledger_type: 'MULTI_ASSET',
    },
    {
      id: 'cd2f8fc883455aeb42d1bec81f5d00d5',
      type: 'SET_LEDGER',
      opid: 190861006,
      ophash: 'oopLhJLjumQYaA3ryubFKtrkRQoBdewgBsqNwDqEb2zUQjobdGF',
      timestamp: '2022-03-23T09:40:44Z',
      level: 2219948,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2213',
      holder_address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      amount: '10',
      is_mint: false,
      ledger_type: 'MULTI_ASSET',
    },
    {
      id: '1a80d530bace83c7b031d2842557ecdb',
      type: 'SET_LEDGER',
      opid: 190861006,
      ophash: 'oopLhJLjumQYaA3ryubFKtrkRQoBdewgBsqNwDqEb2zUQjobdGF',
      timestamp: '2022-03-23T09:40:44Z',
      level: 2219948,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2213',
      holder_address: 'tz1XrutuvkFRG15HmV2gdon86F38NMMGMAXr',
      amount: '0',
      is_mint: false,
      ledger_type: 'MULTI_ASSET',
    },
    {
      id: 'eb341a14514b840b7c90593aa31b7742',
      type: 'SET_LEDGER',
      opid: 185310949,
      ophash: 'ootJMtSR9vBpNvsk1hZm63wgBLu5fFY9Mu1riNaxMkWqkjyaSkA',
      timestamp: '2022-03-11T10:10:04Z',
      level: 2187033,
      fa2_address: 'KT1CzVSa18hndYupV9NcXy3Qj7p8YFDZKVQv',
      token_id: '2',
      holder_address: 'tz2X2bjEgFbB663WkkqHsHNLx1GzXkqvcxpL',
      amount: '1',
      is_mint: false,
      ledger_type: 'MULTI_ASSET',
    },
    {
      id: '6b7351feda83fa84e6eb8de25eb1af05',
      type: 'SET_LEDGER',
      opid: 185310949,
      ophash: 'ootJMtSR9vBpNvsk1hZm63wgBLu5fFY9Mu1riNaxMkWqkjyaSkA',
      timestamp: '2022-03-11T10:10:04Z',
      level: 2187033,
      fa2_address: 'KT1CzVSa18hndYupV9NcXy3Qj7p8YFDZKVQv',
      token_id: '2',
      holder_address: 'tz2EV1f4dheCSYBDbxqjrx1Jyd6HffisKC8u',
      amount: '0',
      is_mint: false,
      ledger_type: 'MULTI_ASSET',
    },
    {
      id: '6e498a70e1e3c648638a9ade591d135f',
      type: 'SET_LEDGER',
      opid: 279128980,
      ophash: 'op9pYr7Kgvyk381zsL1syWBeLkcR35atQqjL8uHGJmjkrucu1yW',
      timestamp: '2022-07-05T22:00:29Z',
      level: 2509067,
      fa2_address: 'KT1BY2HcwQBx9mwLDvMvrFH7M9M1HHq5xHSn',
      token_id: '3012',
      holder_address: 'tz1RaGprXFM7iXhV7VtY636FjA6oC9brU2es',
      amount: '1',
      is_mint: true,
      ledger_type: 'MULTI_ASSET',
    },
    {
      amount: '1',
      fa2_address: 'KT1CwSgYmZewFazZsW348RAQYn1nthiGP3Qa',
      holder_address: 'tz1PHNbDbKYVNhNj9CaAzau5GNqRoWfpQw5e',
      id: 'b5ff1b74e54410f3c52d92fb295bde74',
      is_mint: true,
      level: 1877594,
      ophash: 'opQsBRkFSj3e72tEoQf6B5Nezb9PKNRjiUufcBoC1YKrAt73NVF',
      opid: 124047413,
      timestamp: '2021-11-19T19:07:02Z',
      token_id: '155',
      type: 'SET_LEDGER',
      ledger_type: 'MULTI_ASSET',
    },
    {
      amount: '10000',
      fa2_address: 'KT1GA6KaLWpURnjvmnxB4wToErzM2EXHqrMo',
      holder_address: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
      id: 'f01ff2c8318102b7f79c327a53a35c38',
      is_mint: true,
      level: 2026426,
      ophash: 'ooKnKEDKj72spm5qwVm4MZPfzjqwsQBAYyhXKzaxus57TYdjbtk',
      opid: 154257835,
      timestamp: '2022-01-13T03:46:20Z',
      token_id: '1',
      type: 'SET_LEDGER',
      ledger_type: 'MULTI_ASSET',
    },
    {
      amount: '1',
      fa2_address: 'KT1NVvPsNDChrLRH5K2cy6Sc9r1uuUwdiZQd',
      holder_address: 'tz1XqrVXcRKDLeWFNWMuDaxhhvYu6zE7WzZc',
      id: 'edf2091f578a5fe3b33b0e87fa3846a0',
      is_mint: true,
      level: 2140752,
      ophash: 'onwYmD9BvfHkZMKPMUsg3incNr9fgmLnMddagCC7SgPKu43FJbX',
      opid: 177395668,
      timestamp: '2022-02-22T22:01:20Z',
      token_id: '2',
      type: 'SET_LEDGER',
      ledger_type: 'NFT_ASSET',
    },
    {
      amount: '1',
      fa2_address: 'KT1NVvPsNDChrLRH5K2cy6Sc9r1uuUwdiZQd',
      holder_address: 'tz1dgY9H4xCxzJs1pnaSQnXjPefRyBLfEXFq',
      id: 'a1dcb2ce024855fa93dc460fb580d586',
      is_mint: false,
      level: 2615203,
      ophash: 'ooN5Y3bWkSfxaxdYefWcV4Yy71axwkKeZx1xaMFnCb3Sn7iuLxh',
      opid: 312568078,
      timestamp: '2022-08-12T09:52:59Z',
      token_id: '8479',
      type: 'SET_LEDGER',
      ledger_type: 'NFT_ASSET',
    },
  ]);
});
