import FxMintIssuerV2Handler from './fx_mint_issuer_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT_ISSUER_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 134127011,
      level: 2004367,
      timestamp: '2022-01-05T03:43:00Z',
      block: 'BL36YkiiTMUKFUiAsCzWM6ke77i6FwwBBLgV1GJ4cfXBVEYZWrG',
      hash: 'op6hVzzcNYBQy1uaWrCjvigAyLyjSEysyruJZovvzEXMgtU4v9G',
      counter: 42417551,
      nonce: null,
      sender: {
        address: 'tz1d4N1HZBv77gWA5sLzP4mrVoW88zSqL3iK',
      },
      target: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1XCoGnfupWk7Sp8536EfrxcP73LmT68Nyr',
      },
      parameter: {
        entrypoint: 'mint_issuer',
        value: {
          price: '3000000',
          amount: '50',
          enabled: false,
          metadata: '697066733a2f2f516d556947474c79785065713141775a466244646936767a57647057343369417570373361345241596d4357434a',
          royalties: '150',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        fees: '25',
        ledger: 70072,
        paused: false,
        metadata: 70073,
        lock_time: '3600',
        min_price: '100000',
        seed_mode: true,
        all_tokens: '5484',
        user_actions: 70074,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        objkt_contract: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
        all_gentk_tokens: '282164',
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
            hash: 'expru7jCm2gAP8HTx9WufG8ZsC5aiyAmhrQfGKGWPkLbHGxPv69jQe',
            key: 'tz1d4N1HZBv77gWA5sLzP4mrVoW88zSqL3iK',
            value: {
              last_minted: [],
              last_minted_time: '1970-01-01T00:00:00Z',
              last_issuer_minted: '5483',
              last_issuer_minted_time: '2022-01-05T03:43:00Z',
            },
          },
        },
        {
          bigmap: 70072,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprv7ZUaQh9sLnAWyTSs91rUpPG47T5HRJSAonVDsWxSg32cZAbVX',
            key: '5483',
            value: {
              price: '3000000',
              author: 'tz1d4N1HZBv77gWA5sLzP4mrVoW88zSqL3iK',
              supply: '50',
              balance: '50',
              enabled: false,
              metadata: '697066733a2f2f516d556947474c79785065713141775a466244646936767a57647057343369417570373361345241596d4357434a',
              royalties: '150',
              locked_seconds: '3600',
              original_supply: '50',
              timestamp_minted: '2022-01-05T03:43:00Z',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintIssuerV2Handler]);

  expect(events).toStrictEqual([
    {
      id: 'dfc5399abd6cf6d22ba0c725da618f6e',
      type: 'FX_MINT_ISSUER_V2',
      opid: '134127011',
      ophash: 'op6hVzzcNYBQy1uaWrCjvigAyLyjSEysyruJZovvzEXMgtU4v9G',
      timestamp: '2022-01-05T03:43:00Z',
      level: 2004367,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      issuer_id: '5483',
      editions: '50',
      artist_address: 'tz1d4N1HZBv77gWA5sLzP4mrVoW88zSqL3iK',
      is_verified_artist: true,
      royalties: '150',
      price: '3000000',
      metadata_uri: 'ipfs://QmUiGGLyxPeq1AwZFbDdi6vzWdpW43iAup73a4RAYmCWCJ',
    },
  ]);
});
