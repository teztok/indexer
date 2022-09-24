import FxMintV3Handler from './fx_mint_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT_V3 events', async () => {
  const transactions: Transactions = [
    {
      id: 207515122,
      level: 2285825,
      timestamp: '2022-04-16T12:03:29Z',
      block: 'BMWzhWE4pSb3gcaZagQbkVHPQRPYYcSHscT7zQxfE6L9Sk2MbwR',
      hash: 'opCMWDeQkyFBeNGVMTb3AtPVzDqpM15WmNRPp7GdojVVvyBFpVU',
      counter: 30635919,
      nonce: null,
      sender: {
        alias: 'zoari',
        address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      },
      target: {
        address: 'KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv',
      },
      amount: 250000,
      parameter: {
        entrypoint: 'mint',
        value: {
          referrer: 'tz1iha4zmcLUieCtxHCCowQgXmvazJg6hz6A',
          issuer_id: '10966',
          reserve_input: null,
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '50',
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        ledger: 149776,
        paused: false,
        big_map: 149780,
        metadata: 149816,
        addresses: 149773,
        lock_time: '10800',
        seed_mode: true,
        all_tokens: '10967',
        locked_eps: false,
        user_actions: 149779,
        reserve_methods: 149778,
        all_gentk_tokens: '589149',
        extended_storage: 149775,
        pricing_contracts: {
          '0': {
            address: 'KT1FHzHxuMaNLYG8LdniY45M6RCfkF3AoXFh',
            enabled: true,
          },
          '1': {
            address: 'KT1EzLrXRCXij42pKfbZPn48PuxrnVki1aYY',
            enabled: true,
          },
        },
        entrypoints_enabled: 149774,
        gentk_void_metadata: '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
        referrer_fees_share: '200',
      },
      diffs: [
        {
          bigmap: 149779,
          path: 'user_actions',
          action: 'add_key',
          content: {
            hash: 'expruLLLGu7fS5GjZ58A3oJaMr5UF15qTUW8cyQgMfa6UVmtzYUjED',
            key: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
            value: {
              last_minted: ['589148'],
              last_minted_time: '2022-04-16T12:03:29Z',
              last_issuer_minted: '0',
              last_issuer_minted_time: '1970-01-01T00:00:00Z',
            },
          },
        },
        {
          bigmap: 149776,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'expruDHauyFQNnQsN1K7U51Fg3bt82sqgHPCWPLBnDxgJHg8jnn1rz',
            key: '10966',
            value: {
              tags: [],
              author: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
              supply: '128',
              balance: '125',
              enabled: true,
              metadata: '697066733a2f2f516d53516a7232584443733833627751544d676b43787a7a776a38704678354b6353384c72416b4e3677414c3869',
              reserves: [],
              royalties: '130',
              pricing_id: '0',
              primary_split: [
                {
                  pct: '1000',
                  address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
                },
              ],
              locked_seconds: '0',
              original_supply: '128',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
                },
              ],
              timestamp_minted: '2022-04-16T12:02:59Z',
            },
          },
        },
      ],
    },
    {
      id: 207515123,
      level: 2285825,
      timestamp: '2022-04-16T12:03:29Z',
      block: 'BMWzhWE4pSb3gcaZagQbkVHPQRPYYcSHscT7zQxfE6L9Sk2MbwR',
      hash: 'opCMWDeQkyFBeNGVMTb3AtPVzDqpM15WmNRPp7GdojVVvyBFpVU',
      counter: 30635919,
      nonce: 1,
      sender: {
        address: 'KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv',
      },
      target: {
        address: 'tz1iha4zmcLUieCtxHCCowQgXmvazJg6hz6A',
      },
      amount: 2500,
      parameter: null,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'zoari',
        address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 207515124,
      level: 2285825,
      timestamp: '2022-04-16T12:03:29Z',
      block: 'BMWzhWE4pSb3gcaZagQbkVHPQRPYYcSHscT7zQxfE6L9Sk2MbwR',
      hash: 'opCMWDeQkyFBeNGVMTb3AtPVzDqpM15WmNRPp7GdojVVvyBFpVU',
      counter: 30635919,
      nonce: 2,
      sender: {
        address: 'KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv',
      },
      target: {
        address: 'KT1P2BXYb894MekrCcSrnidzQYPVqitLoVLc',
      },
      amount: 10000,
      parameter: null,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'zoari',
        address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      },
      storage: {
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        splits: [
          {
            pct: '1000',
            address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
          },
        ],
        metadata: 149814,
        fxh_treasury: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: null,
    },
    {
      id: 207515125,
      level: 2285825,
      timestamp: '2022-04-16T12:03:29Z',
      block: 'BMWzhWE4pSb3gcaZagQbkVHPQRPYYcSHscT7zQxfE6L9Sk2MbwR',
      hash: 'opCMWDeQkyFBeNGVMTb3AtPVzDqpM15WmNRPp7GdojVVvyBFpVU',
      counter: 30635919,
      nonce: 3,
      sender: {
        address: 'KT1P2BXYb894MekrCcSrnidzQYPVqitLoVLc',
      },
      target: {
        alias: 'FXHASH treasury',
        address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      amount: 10000,
      parameter: null,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'zoari',
        address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 207515126,
      level: 2285825,
      timestamp: '2022-04-16T12:03:29Z',
      block: 'BMWzhWE4pSb3gcaZagQbkVHPQRPYYcSHscT7zQxfE6L9Sk2MbwR',
      hash: 'opCMWDeQkyFBeNGVMTb3AtPVzDqpM15WmNRPp7GdojVVvyBFpVU',
      counter: 30635919,
      nonce: 4,
      sender: {
        address: 'KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv',
      },
      target: {
        alias: 'spectrolize',
        address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
      },
      amount: 237500,
      parameter: null,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'zoari',
        address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 207515127,
      level: 2285825,
      timestamp: '2022-04-16T12:03:29Z',
      block: 'BMWzhWE4pSb3gcaZagQbkVHPQRPYYcSHscT7zQxfE6L9Sk2MbwR',
      hash: 'opCMWDeQkyFBeNGVMTb3AtPVzDqpM15WmNRPp7GdojVVvyBFpVU',
      counter: 30635919,
      nonce: 5,
      sender: {
        address: 'KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv',
      },
      target: {
        address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
          metadata: {
            '': '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
          },
          token_id: '589148',
          issuer_id: '10966',
          iteration: '3',
          royalties: '130',
          royalties_split: [
            {
              pct: '1000',
              address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
            },
          ],
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'zoari',
        address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      },
      storage: {
        issuer: 'KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv',
        ledger: 149768,
        paused: false,
        signer: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
        metadata: 149817,
        operators: 149770,
        all_tokens: '3',
        token_data: 149771,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        token_metadata: 149772,
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 149772,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruMJvG8yJ36UdSNfdmb6cDYdfAy7LkxH9oDoyFcnPKDhH1DdBBt',
            key: '589148',
            value: {
              token_id: '589148',
              token_info: {
                '': '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
              },
            },
          },
        },
        {
          bigmap: 149771,
          path: 'token_data',
          action: 'add_key',
          content: {
            hash: 'expruMJvG8yJ36UdSNfdmb6cDYdfAy7LkxH9oDoyFcnPKDhH1DdBBt',
            key: '589148',
            value: {
              minter: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
              assigned: false,
              issuer_id: '10966',
              iteration: '3',
              royalties: '130',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
                },
              ],
            },
          },
        },
        {
          bigmap: 149768,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruEC7mUaMt655rZ2jZzhkqwmdc8gp6NFWNqnThQMsJ9LygGVuWu',
            key: {
              nat: '589148',
              address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
            },
            value: '1',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintV3Handler]);

  expect(events).toStrictEqual([
    {
      id: 'e25c712bf09b5051784cd7d88499a726',
      type: 'FX_MINT_V3',
      implements: 'SALE',
      opid: '207515122',
      ophash: 'opCMWDeQkyFBeNGVMTb3AtPVzDqpM15WmNRPp7GdojVVvyBFpVU',
      timestamp: '2022-04-16T12:03:29Z',
      level: 2285825,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '589148',
      editions: '1',
      seller_address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
      artist_address: 'tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW',
      buyer_address: 'tz1KfjPNG5riJC972A6vZXaDyzqqBxXCCmec',
      is_verified_artist: false,
      issuer_id: '10966',
      iteration: '3',
      royalties: '130',
      price: '250000',
      metadata_uri: 'ipfs://QmZZVBKapDg2wXzwpDxdmL9Ah665h9ZzeJ9gYdbTZ4GBzf',
      royalty_shares: {
        decimals: 6,
        shares: {
          tz1MBrwe8EgiZJ5kgVEDnL5emVM294J5RiaW: '130000',
        },
      },
    },
  ]);
});
