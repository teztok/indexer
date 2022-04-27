import FxMintIssuerHandler from './fx_mint';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT events', async () => {
  const transactions: Transactions = [
    {
      id: 104481628,
      level: 1832759,
      timestamp: '2021-11-03T16:52:32Z',
      block: 'BMGV3iEqNrb51LWVf1yvHUMTVz9pguKmNzCu6jyj8hUc8ghrMLg',
      hash: 'ongfG6YnyQMdZJL4GoGtsEGZYgtSCw7EUX8EZLAAg2F7XMTFfsx',
      counter: 13620447,
      nonce: null,
      sender: {
        alias: 'RallyRolly',
        address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
      },
      target: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          issuer_id: '0',
          issuer_address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        },
      },
      amount: 100000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '50',
        ledger: 22781,
        paused: false,
        metadata: 22783,
        min_price: '100000',
        all_tokens: '1',
        ledger_gentk: 22782,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        objkt_contract: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
        token_metadata: 22784,
        all_gentk_tokens: '3',
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
        gentk_void_metadata: '697066733a2f2f516d614168423165577270556461685a5a687457684c707034777a71396734756e686550396f7a3448656e704c51',
      },
      diffs: [
        {
          bigmap: 22782,
          path: 'ledger_gentk',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              owner: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
              issuer_id: '0',
              iteration: '3',
            },
          },
        },
        {
          bigmap: 22781,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'expruu41op9dkTtfka4Dtea5BD7YSFRpe8Yo7Rnn7V1KCsxXR2prdy',
            key: {
              nat: '0',
              address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
            },
            value: {
              price: '100000',
              supply: '1000',
              balance: '997',
              enabled: true,
              royalties: '100',
            },
          },
        },
      ],
    },
    {
      id: 104481629,
      level: 1832759,
      timestamp: '2021-11-03T16:52:32Z',
      block: 'BMGV3iEqNrb51LWVf1yvHUMTVz9pguKmNzCu6jyj8hUc8ghrMLg',
      hash: 'ongfG6YnyQMdZJL4GoGtsEGZYgtSCw7EUX8EZLAAg2F7XMTFfsx',
      counter: 13620447,
      nonce: 1,
      sender: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
      },
      target: {
        alias: 'FXHASH treasury',
        address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      parameter: null,
      amount: 5000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'RallyRolly',
        address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 104481630,
      level: 1832759,
      timestamp: '2021-11-03T16:52:32Z',
      block: 'BMGV3iEqNrb51LWVf1yvHUMTVz9pguKmNzCu6jyj8hUc8ghrMLg',
      hash: 'ongfG6YnyQMdZJL4GoGtsEGZYgtSCw7EUX8EZLAAg2F7XMTFfsx',
      counter: 13620447,
      nonce: 2,
      sender: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
      },
      target: {
        address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
      },
      parameter: null,
      amount: 95000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'RallyRolly',
        address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 104481631,
      level: 1832759,
      timestamp: '2021-11-03T16:52:32Z',
      block: 'BMGV3iEqNrb51LWVf1yvHUMTVz9pguKmNzCu6jyj8hUc8ghrMLg',
      hash: 'ongfG6YnyQMdZJL4GoGtsEGZYgtSCw7EUX8EZLAAg2F7XMTFfsx',
      counter: 13620447,
      nonce: 3,
      sender: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
      },
      target: {
        alias: 'FXHASH GENTK',
        address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
          metadata: {
            '': '697066733a2f2f516d614168423165577270556461685a5a687457684c707034777a71396734756e686550396f7a3448656e704c51',
          },
          token_id: '2',
          issuer_id: '0',
          iteration: '3',
          royalties: '100',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'RallyRolly',
        address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
      },
      storage: {
        issuer: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
        ledger: 22785,
        paused: false,
        signer: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
        metadata: 22786,
        operators: 22787,
        all_tokens: '3',
        token_data: 22788,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        token_metadata: 22789,
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 22789,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              token_id: '2',
              token_info: {
                '': '697066733a2f2f516d614168423165577270556461685a5a687457684c707034777a71396734756e686550396f7a3448656e704c51',
              },
            },
          },
        },
        {
          bigmap: 22788,
          path: 'token_data',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              assigned: false,
              issuer_id: '0',
              iteration: '3',
              royalties: '100',
            },
          },
        },
        {
          bigmap: 22785,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprtuogFAJNoJ23o5rrFkWRNa1ZanZ5g46gYAoHfJUQrr7obT9sTU',
            key: {
              nat: '2',
              address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
            },
            value: '1',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintIssuerHandler]);

  expect(events).toStrictEqual([
    {
      id: 'bfbb224b73a1b9dcd8e1d792aa26c3b4',
      type: 'FX_MINT',
      implements: 'SALE',
      opid: 104481628,
      ophash: 'ongfG6YnyQMdZJL4GoGtsEGZYgtSCw7EUX8EZLAAg2F7XMTFfsx',
      timestamp: '2021-11-03T16:52:32Z',
      level: 1832759,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '2',
      editions: '1',
      seller_address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
      artist_address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
      buyer_address: 'tz1VP6GUGdHdjCLzVFqRjBwsie3uw5UM4D1p',
      issuer_id: '0',
      iteration: '3',
      royalties: '100',
      price: '100000',
      metadata_uri: 'ipfs://QmaAhB1eWrpUdahZZhtWhLpp4wzq9g4unheP9oz4HenpLQ',
    },
  ]);
});
