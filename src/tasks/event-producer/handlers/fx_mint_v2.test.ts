import FxMintV2Handler from './fx_mint_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 134087297,
      level: 2004105,
      timestamp: '2022-01-05T01:21:30Z',
      block: 'BLXQThovdfacizRtfHydtXnGtoMcu8ANs7B6RxLnb3wENk6nxps',
      hash: 'onwRTp6PfiVEbxG5sXsSYXh8apc4waWZrkC4Wv5hveoVsGaZQ1i',
      counter: 29011077,
      nonce: null,
      sender: {
        address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
      },
      target: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr',
      },
      parameter: {
        entrypoint: 'mint',
        value: '5352',
      },
      amount: 1200000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '25',
        ledger: 70072,
        paused: false,
        metadata: 70073,
        lock_time: '3600',
        min_price: '100000',
        seed_mode: true,
        all_tokens: '5482',
        user_actions: 70074,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        objkt_contract: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
        all_gentk_tokens: '282141',
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
        gentk_void_metadata: '697066733a2f2f516d614168423165577270556461685a5a687457684c707034777a71396734756e686550396f7a3448656e704c51',
        allowed_mint_contract: 'KT1CoTar9iUbmTyaKPApm5xtTPbQs6SjybXQ',
        user_moderation_contract: 'KT1TWWQ6FtLoosVfZgTKV2q68TMZaENhGm54',
        allowed_mint_issuer_contract: 'KT1HvjUwFHoYpiEjeiaifFh9e2HmovLpahqK',
      },
      diffs: [
        {
          bigmap: 70074,
          path: 'user_actions',
          action: 'add_key',
          content: {
            hash: 'expruybBpp8LVdyfbEXjgaBmC1kaHo2kmCSgDP5vwXjQ5YyTx2WDBP',
            key: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
            value: {
              last_minted: ['282140'],
              last_minted_time: '2022-01-05T01:20:20Z',
              last_issuer_minted: '0',
              last_issuer_minted_time: '1970-01-01T00:00:00Z',
            },
          },
        },
        {
          bigmap: 70072,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'exprthMU269fM1DpWt8cMRrztNAeznGDLXgqZKeypJ17ZLNT7fAnhC',
            key: '5352',
            value: {
              price: '1200000',
              author: 'tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL',
              supply: '144',
              balance: '16',
              enabled: true,
              metadata: '697066733a2f2f516d55744156484372347a443367723554594248383138757a4b73637651584c3431717037314c33465644416b54',
              royalties: '200',
              locked_seconds: '0',
              original_supply: '144',
              timestamp_minted: '2021-12-29T07:55:20Z',
            },
          },
        },
      ],
    },
    {
      id: 134087298,
      level: 2004105,
      timestamp: '2022-01-05T01:21:30Z',
      block: 'BLXQThovdfacizRtfHydtXnGtoMcu8ANs7B6RxLnb3wENk6nxps',
      hash: 'onwRTp6PfiVEbxG5sXsSYXh8apc4waWZrkC4Wv5hveoVsGaZQ1i',
      counter: 29011077,
      nonce: 1,
      sender: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr',
      },
      target: {
        alias: 'FXHASH treasury',
        address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      parameter: null,
      amount: 30000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 134087299,
      level: 2004105,
      timestamp: '2022-01-05T01:21:30Z',
      block: 'BLXQThovdfacizRtfHydtXnGtoMcu8ANs7B6RxLnb3wENk6nxps',
      hash: 'onwRTp6PfiVEbxG5sXsSYXh8apc4waWZrkC4Wv5hveoVsGaZQ1i',
      counter: 29011077,
      nonce: 2,
      sender: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr',
      },
      target: {
        alias: 'Quentin Hocdé',
        address: 'tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL',
      },
      parameter: null,
      amount: 1170000,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
      },
      storage: null,
      diffs: null,
    },
    {
      id: 134087300,
      level: 2004105,
      timestamp: '2022-01-05T01:21:30Z',
      block: 'BLXQThovdfacizRtfHydtXnGtoMcu8ANs7B6RxLnb3wENk6nxps',
      hash: 'onwRTp6PfiVEbxG5sXsSYXh8apc4waWZrkC4Wv5hveoVsGaZQ1i',
      counter: 29011077,
      nonce: 3,
      sender: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr',
      },
      target: {
        alias: 'FXHASH GENTK',
        address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
          metadata: {
            '': '697066733a2f2f516d614168423165577270556461685a5a687457684c707034777a71396734756e686550396f7a3448656e704c51',
          },
          token_id: '282140',
          issuer_id: '5352',
          iteration: '128',
          royalties: '200',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
      },
      storage: {
        issuer: 'KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr',
        ledger: 22785,
        paused: false,
        signer: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
        metadata: 22786,
        operators: 22787,
        all_tokens: '282141',
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
            hash: 'exprtsBRUiLnnvdHQ8CZb3m8a9rb3brWsVQEgcgyGZUJ4qcSdydpSb',
            key: '282140',
            value: {
              token_id: '282140',
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
            hash: 'exprtsBRUiLnnvdHQ8CZb3m8a9rb3brWsVQEgcgyGZUJ4qcSdydpSb',
            key: '282140',
            value: {
              assigned: false,
              issuer_id: '5352',
              iteration: '128',
              royalties: '200',
            },
          },
        },
        {
          bigmap: 22785,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprtdzVuKxfpoEbWwrkkYhMgs9jSFY4yLNVd1ekQP3h98J8Lncoqr',
            key: {
              nat: '282140',
              address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
            },
            value: '1',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintV2Handler]);

  expect(events).toStrictEqual([
    {
      id: 'e1f5c01fe170db2713ec0341dbb52c32',
      type: 'FX_MINT_V2',
      implements: 'SALE',
      opid: 134087297,
      ophash: 'onwRTp6PfiVEbxG5sXsSYXh8apc4waWZrkC4Wv5hveoVsGaZQ1i',
      timestamp: '2022-01-05T01:21:30Z',
      level: 2004105,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '282140',
      editions: '1',
      seller_address: 'tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL',
      artist_address: 'tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL',
      buyer_address: 'tz1fyPAaCtU5nQ8SAW6QLnCHjSarXzNKjFd6',
      is_verified_artist: false,
      issuer_id: '5352',
      iteration: '128',
      royalties: '200',
      price: '1200000',
      metadata_uri: 'ipfs://QmaAhB1eWrpUdahZZhtWhLpp4wzq9g4unheP9oz4HenpLQ',
      royalty_shares: {
        decimals: 3,
        shares: {
          tz1g2ZxQbaePfmpSwPQNRVNaF5aJdVmZWZgL: '200',
        },
      },
    },
  ]);
});
