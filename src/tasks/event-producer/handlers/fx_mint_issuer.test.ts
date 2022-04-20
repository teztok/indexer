import FxMintIssuerHandler from './fx_mint_issuer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_MINT_ISSUER events', async () => {
  const transactions: Transactions = [
    {
      id: 104376658,
      level: 1832233,
      timestamp: '2021-11-03T12:26:02Z',
      block: 'BLyxtdvTif7n7yNbjjMqdcFa1Q8cxBvVuhXSMKG748uwgLhbmZ6',
      hash: 'oomBXbqDy1K6EgE21vH3Qq4WESdcHp2nwdDoiGyqypYTF9HQj3h',
      counter: 32520316,
      sender: {
        address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
      },
      target: {
        alias: 'FXHASH Generative Tokens issuer',
        address: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
      },
      parameter: {
        entrypoint: 'mint_issuer',
        value: {
          price: '100000',
          amount: '1000',
          enabled: true,
          metadata: {
            '': '697066733a2f2f516d59326f337a66626e6e7479436a4676473679476f444a674a4b736d6d584c37696d484d4c7265776177374a48',
          },
          royalties: '100',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
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
        all_gentk_tokens: '0',
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
        gentk_void_metadata: '697066733a2f2f516d614168423165577270556461685a5a687457684c707034777a71396734756e686550396f7a3448656e704c51',
      },
      diffs: [
        {
          bigmap: 22784,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              token_id: '0',
              token_info: {
                '': '697066733a2f2f516d59326f337a66626e6e7479436a4676473679476f444a674a4b736d6d584c37696d484d4c7265776177374a48',
              },
            },
          },
        },
        {
          bigmap: 22781,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruu41op9dkTtfka4Dtea5BD7YSFRpe8Yo7Rnn7V1KCsxXR2prdy',
            key: {
              nat: '0',
              address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
            },
            value: {
              price: '100000',
              supply: '1000',
              balance: '1000',
              enabled: true,
              royalties: '100',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxMintIssuerHandler]);

  expect(events).toStrictEqual([
    {
      id: '7bf3c7c5bccc9f34d3b161fe3eaca13f',
      type: 'FX_MINT_ISSUER',
      opid: 104376658,
      ophash: 'oomBXbqDy1K6EgE21vH3Qq4WESdcHp2nwdDoiGyqypYTF9HQj3h',
      timestamp: '2021-11-03T12:26:02Z',
      level: 1832233,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      issuer_id: '0',
      editions: '1000',
      artist_address: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
      royalties: '100',
      price: '100000',
      metadata_uri: 'ipfs://QmY2o3zfbnntyCjFvG6yGoDJgJKsmmXL7imHMLrewaw7JH',
    },
  ]);
});
