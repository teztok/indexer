import FxMintWithTicketHandler from './fx_mint_with_ticket';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT_WITH_TICKET events', async () => {
  const transactions: Transactions = [
    {
      id: 491874595897344,
      level: 3242233,
      timestamp: '2023-03-20T10:51:59Z',
      block: 'BMKUi1bGg6u4yT2rCeBJGBQ8MV8eaaN2qxN9g1j4nVTks623Fi7',
      hash: 'ooMU4SzsYqSjijDSJn9s123xsFtrnq1nKRgnwPQtYMUc7qoCoRr',
      counter: 14257202,
      sender: {
        alias: 'dddc',
        address: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
      },
      target: {
        address: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_with_ticket',
        value: {
          issuer_id: '26057',
          recipient: null,
          ticket_id: '1064',
          input_bytes:
            '0308010140280000000000000201000000000000000002006f0070006e006e0065003500340037006600660034006e006b003100340030007a00790038003600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '50',
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        ledger: 411393,
        paused: false,
        big_map: 411397,
        metadata: 411394,
        addresses: 411389,
        lock_time: '3600',
        all_tokens: '26086',
        locked_eps: false,
        user_actions: 411396,
        codex_entries: 411390,
        reserve_methods: 411395,
        all_gentk_tokens: '433',
        pricing_contracts: {
          '0': {
            address: 'KT1V24J6FVuKPU3xy6gVF6wJ3zdRXBheQhaV',
            enabled: true,
          },
          '1': {
            address: 'KT1MFgHKorMWXeVL6qrpgjZmemirafppSg9q',
            enabled: true,
          },
        },
        codex_entries_count: '38',
        entrypoints_enabled: 411391,
        gentk_void_metadata: '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
        referrer_fees_share: '200',
        issuer_codex_updates: 411392,
      },
      diffs: [
        {
          bigmap: 411396,
          path: 'user_actions',
          action: 'update_key',
          content: {
            hash: 'expruziGWqKzaG89hpkbqQXMF71E7kV8TEwm3vV8zkvSs81fUr7znb',
            key: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
            value: {
              last_minted: ['26057'],
              last_minted_time: '2023-03-20T10:51:59Z',
              last_issuer_minted: '0',
              last_issuer_minted_time: '1970-01-01T00:00:00Z',
            },
          },
        },
        {
          bigmap: 411393,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'exprvExjHfA6nRY9uxgtt3yRsz6Pfydpc2owdYqYZjWSZiKWZdSHtX',
            key: '26057',
            value: {
              tags: [],
              author: 'tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV', // author
              supply: '1000',
              balance: '573',
              enabled: true,
              codex_id: '9',
              metadata: '697066733a2f2f516d567a663558785a437a6e726b316248444e4a357250736d7736314c7351363174586d4d376665744b32395350',
              reserves: [],
              royalties: '100',
              pricing_id: '0',
              has_tickets: true,
              open_editions: null,
              primary_split: [
                {
                  pct: '1000',
                  address: 'tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV',
                },
              ],
              locked_seconds: '0',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV',
                },
              ],
              input_bytes_size: '151',
              iterations_count: '225',
              timestamp_minted: '2023-03-19T23:46:59Z',
              lock_price_for_reserves: false,
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 491874596945920,
      level: 3242233,
      timestamp: '2023-03-20T10:51:59Z',
      block: 'BMKUi1bGg6u4yT2rCeBJGBQ8MV8eaaN2qxN9g1j4nVTks623Fi7',
      hash: 'ooMU4SzsYqSjijDSJn9s123xsFtrnq1nKRgnwPQtYMUc7qoCoRr',
      counter: 14257202,
      sender: {
        address: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
      },
      target: {
        address: 'KT19etLCjCCzTLFFAxsxLFsVYMRPetr2bTD5',
      },
      amount: 0,
      parameter: {
        entrypoint: 'consume',
        value: {
          owner: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
          token_id: '1064',
          project_id: '26057',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'dddc',
        address: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
      },
      storage: {
        fees: '0',
        issuer: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
        ledger: 411409,
        big_map: 411414,
        metadata: 411410,
        min_price: '100000',
        locked_eps: false,
        token_data: 411412,
        project_data: 411411,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        last_token_id: '1065',
        token_metadata: 411413,
        available_balance: '0',
      },
      diffs: [
        {
          bigmap: 411413,
          path: 'token_metadata',
          action: 'remove_key',
          content: {
            hash: 'expru7HucJ8ieffMGrGyYpJmhReG24fmNJCv7YsFSDebgPcFuwSN57',
            key: '1064',
            value: {
              token_id: '1064',
              token_info: {
                '': '697066733a2f2f516d5a61537564637044565a694e6177526e7258664d5844513464486b3345616250314b43345a554a4d63327a39',
              },
            },
          },
        },
        {
          bigmap: 411412,
          path: 'token_data',
          action: 'remove_key',
          content: {
            hash: 'expru7HucJ8ieffMGrGyYpJmhReG24fmNJCv7YsFSDebgPcFuwSN57',
            key: '1064',
            value: {
              price: '10000000',
              minter: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
              created_at: '2023-03-20T10:48:59Z',
              project_id: '26057',
              taxation_start: '2023-03-27T10:48:59Z',
              taxation_locked: '0',
            },
          },
        },
        {
          bigmap: 411409,
          path: 'ledger',
          action: 'remove_key',
          content: {
            hash: 'expru7HucJ8ieffMGrGyYpJmhReG24fmNJCv7YsFSDebgPcFuwSN57',
            key: '1064',
            value: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
          },
        },
      ],
      nonce: 1,
    },
    {
      id: 491874597994496,
      level: 3242233,
      timestamp: '2023-03-20T10:51:59Z',
      block: 'BMKUi1bGg6u4yT2rCeBJGBQ8MV8eaaN2qxN9g1j4nVTks623Fi7',
      hash: 'ooMU4SzsYqSjijDSJn9s123xsFtrnq1nKRgnwPQtYMUc7qoCoRr',
      counter: 14257202,
      sender: {
        address: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
      },
      target: {
        address: 'KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          address: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
          metadata: {
            '': '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
          },
          token_id: '432',
          issuer_id: '26057',
          iteration: '225',
          royalties: '100',
          input_bytes:
            '0308010140280000000000000201000000000000000002006f0070006e006e0065003500340037006600660034006e006b003100340030007a00790038003600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
          royalties_split: [
            {
              pct: '1000',
              address: 'tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV',
            },
          ],
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'dddc',
        address: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
      },
      storage: {
        issuer: 'KT1Xpmp15KfqoePNW9HczFmqaGNHwadV2a3b',
        ledger: 411398,
        paused: false,
        signer: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
        metadata: 411399,
        operators: 411400,
        all_tokens: '433',
        token_data: 411401,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        token_metadata: 411402,
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 411402,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruh3toKwBS2dqsVAUfHoYWwTft1hXP7fJQ5aUtqRnkA1oSr99XU',
            key: '432',
            value: {
              token_id: '432',
              token_info: {
                '': '697066733a2f2f516d5a5a56424b617044673277587a77704478646d4c39416836363568395a7a654a3967596462545a3447427a66',
              },
            },
          },
        },
        {
          bigmap: 411401,
          path: 'token_data',
          action: 'add_key',
          content: {
            hash: 'expruh3toKwBS2dqsVAUfHoYWwTft1hXP7fJQ5aUtqRnkA1oSr99XU',
            key: '432',
            value: {
              minter: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
              assigned: false,
              issuer_id: '26057',
              iteration: '225',
              royalties: '100',
              input_bytes:
                '0308010140280000000000000201000000000000000002006f0070006e006e0065003500340037006600660034006e006b003100340030007a00790038003600000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV',
                },
              ],
            },
          },
        },
        {
          bigmap: 411398,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruqji6m7eVXKc2Z7L2xbsv8mkVtzQwAnbqgk3WrdqXhWdi18sxw',
            key: {
              nat: '432',
              address: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
            },
            value: '1',
          },
        },
      ],
      nonce: 2,
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintWithTicketHandler]);

  expect(events).toStrictEqual([
    {
      id: '2c974f8ed9ae49aefb985b3f7b39d5c8',
      type: 'FX_MINT_WITH_TICKET',
      implements: 'SALE',
      opid: '491874595897344',
      ophash: 'ooMU4SzsYqSjijDSJn9s123xsFtrnq1nKRgnwPQtYMUc7qoCoRr',
      timestamp: '2023-03-20T10:51:59Z',
      level: 3242233,
      fa2_address: 'KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr',
      token_id: '432',
      editions: '1',
      seller_address: 'tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV',
      artist_address: 'tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV',
      buyer_address: 'tz1MbT8XyxN3F6wPDWn1KMxTpFst6UJgw2pj',
      is_verified_artist: false,
      issuer_id: '26057',
      royalties: '100',
      iteration: '225',
      price: '10000000',
      metadata_uri: 'ipfs://QmZZVBKapDg2wXzwpDxdmL9Ah665h9ZzeJ9gYdbTZ4GBzf',
      royalty_shares: {
        decimals: 6,
        shares: {
          tz1WBfByKVzmEEJJCqgK4Dcz6W4DCCkgtNfV: '100000',
        },
      },
    },
  ]);
});
