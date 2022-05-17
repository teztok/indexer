import FxMintIssuerV3Handler from './fx_mint_issuer_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT_ISSUER_V3 events', async () => {
  const transactions: Transactions = [
    {
      id: 207513245,
      level: 2285819,
      timestamp: '2022-04-16T12:00:29Z',
      block: 'BMUZ2NUyjSsFPpq493oGqjjLDrEGy2E8uK7SPH8Gv7yhYJyBY1U',
      hash: 'opUQ56JxEcM2g4Ck6knppX5TvbgjKkaw1EhWq6zLgFm1xwiP7eD',
      counter: 52460506,
      sender: {
        address: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
      },
      target: {
        alias: 'FXHASH Generative Tokens v2',
        address: 'KT1BJC12dG17CVvPKJ1VYaNnaT5mzfnUTwXv',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_issuer',
        value: {
          tags: [],
          amount: '256',
          enabled: true,
          pricing: {
            details: '05070703060080ade204',
            pricing_id: '0',
          },
          metadata: '697066733a2f2f516d545372455a594b714358636a34394d766766436f36595670746a4666724a35476a685258706e37726f707a5a',
          reserves: [],
          royalties: '150',
          primary_split: [
            {
              pct: '1000',
              address: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
            },
          ],
          royalties_split: [
            {
              pct: '1000',
              address: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
            },
          ],
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
        all_tokens: '10966',
        locked_eps: false,
        user_actions: 149779,
        reserve_methods: 149778,
        all_gentk_tokens: '589146',
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
            hash: 'expru7UeYj7YPqWE638tJbtsCm98S59tQ7YCMbESoAT4t71ixcY565',
            key: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
            value: {
              last_minted: [],
              last_minted_time: '1970-01-01T00:00:00Z',
              last_issuer_minted: '10965',
              last_issuer_minted_time: '2022-04-16T12:00:29Z',
            },
          },
        },
        {
          bigmap: 149776,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprv8ZuUBqecqjiVjwJCgmT4SpvBsbdEveZh64d1EzaRmW8iTXPxK',
            key: '10965',
            value: {
              tags: [],
              author: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
              supply: '256',
              balance: '256',
              enabled: true,
              metadata: '697066733a2f2f516d545372455a594b714358636a34394d766766436f36595670746a4666724a35476a685258706e37726f707a5a',
              reserves: [],
              royalties: '150',
              pricing_id: '0',
              primary_split: [
                {
                  pct: '1000',
                  address: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
                },
              ],
              locked_seconds: '10800',
              original_supply: '256',
              royalties_split: [
                {
                  pct: '1000',
                  address: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
                },
              ],
              timestamp_minted: '2022-04-16T12:00:29Z',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintIssuerV3Handler]);

  expect(events).toStrictEqual([
    {
      id: 'c1a8e0b02d26a836c2847dc088b361d6',
      type: 'FX_MINT_ISSUER_V3',
      opid: 207513245,
      ophash: 'opUQ56JxEcM2g4Ck6knppX5TvbgjKkaw1EhWq6zLgFm1xwiP7eD',
      timestamp: '2022-04-16T12:00:29Z',
      level: 2285819,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      issuer_id: '10965',
      editions: '256',
      artist_address: 'tz1a2aHDQayeSEsbDRm5igEiLYH4cxcNnKyz',
      royalties: '150',
      metadata_uri: 'ipfs://QmTSrEZYKqCXcj49MvgfCo6YVptjFfrJ5GjhRXpn7ropzZ',
    },
  ]);
});
