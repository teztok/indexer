import EightbidMint8x8ColorHandler from './8bid_8x8_color_mint';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_8X8_COLOR_MINT events', async () => {
  const transactions: Transactions = [
    {
      id: 176116207,
      level: 2133914,
      timestamp: '2022-02-20T12:17:20Z',
      block: 'BMb1SCCau6APoQtRe9QLSZ8PkTvDTiUZZWqkNU3F2JFfYqJaxiD',
      hash: 'oooEQUknW8M7nxiLtY5kc66ic3CPzkonyVj7RK8FJdj3MjYQAZ4',
      counter: 14230109,
      sender: {
        alias: 'HrtkAssh',
        address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      },
      target: {
        alias: '8bidou 8x8',
        address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          rgb: {
            rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
            creater: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
            token_id: '0',
            token_name: '436174303031',
            creater_name: '4872746b',
            token_description: '54686973206973206361742e',
          },
          mint_tx: {
            owner: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
            amount: '9',
            token_id: '0',
          },
          token_meta: {
            token_id: '0',
            token_info: {
              '': '687474703a2f2f6c6f63616c686f73743a393939392f',
            },
          },
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        rgb: 113218,
        ledger: 113213,
        metadata: 113217,
        operators: 113214,
        token_index: '2',
        token_metadata: 113216,
        token_total_supply: 113215,
      },
      diffs: [
        {
          bigmap: 113218,
          path: 'rgb',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
              creater: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
              token_id: '2',
              token_name: '436174303031',
              creater_name: '4872746b',
              token_description: '54686973206973206361742e',
            },
          },
        },
        {
          bigmap: 113216,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              token_id: '2',
              token_info: {
                '': '687474703a2f2f6c6f63616c686f73743a393939392f',
              },
            },
          },
        },
        {
          bigmap: 113215,
          path: 'token_total_supply',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: '9',
          },
        },
        {
          bigmap: 113213,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprtkizmnWBT4GaWujG4tDWoSb8ZgHfP3ojqc51fLjpCTyNUodjNy',
            key: {
              nat: '2',
              address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
            },
            value: '9',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidMint8x8ColorHandler]);

  expect(events).toStrictEqual([
    {
      id: '57590120c122ca58d057632a893f959e',
      type: '8BID_8X8_COLOR_MINT',
      opid: 176116207,
      timestamp: '2022-02-20T12:17:20Z',
      level: 2133914,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '2',

      editions: '9',
      artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      token_name: 'Cat001',
      creator_name: 'Hrtk',
      token_description: 'This is cat.',
      metadata_uri: 'http://localhost:9999/',
      rgb: '639bff639bff639bff639bff639bff639bff639bff639bff639bff222034639bff222034639bff639bff639bff639bff639bff222034222034222034639bff639bff639bff639bff639bff222034222034222034639bff639bff222034639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034222034222034222034639bff639bff639bff639bff222034639bff639bff222034639bff639bff639bff639bff639bff639bff639bff639bff639bff639bff',
    },
  ]);
});
