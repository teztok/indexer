import SetMetadataHandler from './set_metadata';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates SET_METADATA events', async () => {
  const transactions: Transactions = [
    {
      id: 42073252,
      level: 1365467,
      timestamp: '2021-03-01T07:27:27Z',
      block: 'BL9xqjjom8B9wsp6RgMkFjKzNmYKyDqY4nH7Scqvgp9ut4FK1zJ',
      hash: 'opLcz2WHyyiAWQRwBRpggB2kwF9ZyxWJyAEEqV5uRaNtjqP47Sj',
      counter: 4957696,
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
          amount: '2',
          address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
          token_id: '153',
          token_info: {
            '': '697066733a2f2f516d656171524255697734634a694e4b456357326e6f633765674c6435476742714c63484871556861754a41484e',
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
        all_tokens: '154',
        administrator: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
        token_metadata: 514,
      },
      diffs: [
        {
          bigmap: 514,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprvL7MZvPENJyNFDSochCwN4nTLtww9JgVGgxb9CL32LcETnt1Du',
            key: '153',
            value: {
              token_id: '153',
              token_info: {
                '': '697066733a2f2f516d656171524255697734634a694e4b456357326e6f633765674c6435476742714c63484871556861754a41484e',
              },
            },
          },
        },
        {
          bigmap: 514,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprvL7MZvPENJyNFDSochCwN4nTLtww9JgVGgxb9CL32LcETnt1Duc',
            key: '154',
            value: {
              token_id: '154',
              token_info: {
                '': 'invalid',
              },
            },
          },
        },
        {
          bigmap: 511,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprvD1v8DxXvrsCqbx7BA2ZqxYuUk9jXE1QrXuL46i3MWG6o1szUq',
            key: {
              nat: '153',
              address: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
            },
            value: '2',
          },
        },
      ],
    },
    {
      id: 104380647,
      level: 1832253,
      timestamp: '2021-11-03T12:37:12Z',
      block: 'BM4HoT8pyzRi7RErJ3cCMtAV4KBiXmyWb5qATaApaV8RNawua5M',
      hash: 'op6aQByDMQpBKWieNcdCx9MFuxKZEB2kAtViMhXN4H45EXBLKns',
      counter: 34009593,
      sender: {
        address: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
      },
      target: {
        alias: 'FXHASH GENTK',
        address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      },
      parameter: {
        entrypoint: 'assign_metadata',
        value: {
          metadata: {
            '': '697066733a2f2f516d6167475059695450515156316939574d774751327a686744655771486566677462426d5777476b7237746259',
          },
          token_id: '1',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        issuer: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
        ledger: 22785,
        paused: false,
        signer: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
        metadata: 22786,
        operators: 22787,
        all_tokens: '2',
        token_data: 22788,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        token_metadata: 22789,
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 22789,
          path: 'token_metadata',
          action: 'update_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              token_id: '1',
              token_info: {
                '': '697066733a2f2f516d6167475059695450515156316939574d774751327a686744655771486566677462426d5777476b7237746259',
              },
            },
          },
        },
        {
          bigmap: 22788,
          path: 'token_data',
          action: 'update_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              assigned: true,
              issuer_id: '0',
              iteration: '2',
              royalties: '100',
            },
          },
        },
      ],
    },
    {
      id: 73077463,
      level: 1654612,
      timestamp: '2021-08-31T17:59:48Z',
      block: 'BLAtU5Z9LVT7wQfnEzVZqbfvj3vRGgnDmnogz9d74XeujyrAx11',
      hash: 'opG7tkzJknmCJTLzg7pzWsuoLVj24cpe8QRGEZrgcL2PqP3HK8j',
      counter: 23575948,
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
          address: 'tz1biKU3xnysM6WXAYN9Qsp9siv8Ttz5f7UY',
          metadata: {
            '': '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f353136',
          },
          token_id: '516',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'Tezzardz Admin',
        address: 'tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN',
      },
      storage: {
        ledger: 12112,
        paused: false,
        metadata: 12113,
        operators: 12114,
        all_tokens: ['514', '515', '516'],
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
            hash: 'exprvPGWqdaBny643agnaJWUAocLPPVqBQmfQZM5wJ1RjUKwcYeVuN',
            key: '516',
            value: '1',
          },
        },
        {
          bigmap: 12115,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprvPGWqdaBny643agnaJWUAocLPPVqBQmfQZM5wJ1RjUKwcYeVuN',
            key: '516',
            value: {
              token_id: '516',
              token_info: {
                '': '697066733a2f2f7a646a37576b507672784c3756786957626a425035726673685074417a58775a373775765a686653416f484465623369772f353136',
              },
            },
          },
        },
        {
          bigmap: 12112,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruRgSAKFcB6DVUFAmFUYrCnxhRqoaYg27BUhu9brQybEAz99oVV',
            key: {
              nat: '516',
              address: 'tz1biKU3xnysM6WXAYN9Qsp9siv8Ttz5f7UY',
            },
            value: '1',
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [SetMetadataHandler]);

  expect(events).toStrictEqual([
    {
      id: '27851a5ec3ce985ce7322f1a6d7891aa',
      type: 'SET_METADATA',
      opid: 42073252,
      ophash: 'opLcz2WHyyiAWQRwBRpggB2kwF9ZyxWJyAEEqV5uRaNtjqP47Sj',
      timestamp: '2021-03-01T07:27:27Z',
      level: 1365467,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '153',
      metadata_uri: 'ipfs://QmeaqRBUiw4cJiNKEcW2noc7egLd5GgBqLcHHqUhauJAHN',
    },
    {
      id: '9ab130814ff910d4d96303c1b2cf7c7f',
      type: 'SET_METADATA',
      opid: 104380647,
      ophash: 'op6aQByDMQpBKWieNcdCx9MFuxKZEB2kAtViMhXN4H45EXBLKns',
      timestamp: '2021-11-03T12:37:12Z',
      level: 1832253,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '1',
      metadata_uri: 'ipfs://QmagGPYiTPQQV1i9WMwGQ2zhgDeWqHefgtbBmWwGkr7tbY',
    },
    {
      id: '03fa4cee5d21885dd5f4e89ad1b2b9ef',
      type: 'SET_METADATA',
      opid: 73077463,
      ophash: 'opG7tkzJknmCJTLzg7pzWsuoLVj24cpe8QRGEZrgcL2PqP3HK8j',
      timestamp: '2021-08-31T17:59:48Z',
      level: 1654612,
      fa2_address: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
      token_id: '516',
      metadata_uri: 'ipfs://zdj7WkPvrxL7VxiWbjBP5rfshPtAzXwZ77uvZhfSAoHDeb3iw/516',
    },
  ]);
});
