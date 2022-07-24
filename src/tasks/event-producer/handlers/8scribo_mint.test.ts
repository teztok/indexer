import EightscriboMintHandler from './8scribo_mint';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8SCRIBO_MINT events', async () => {
  const transactions: Transactions = [
    {
      id: 289188815,
      level: 2541816,
      timestamp: '2022-07-17T13:43:14Z',
      block: 'BLgqpgsqXjChSfkaXXPonbnJGDM3jxJLHVTP3qstDmj7UHCLki1',
      hash: 'opAVNNkMau3UqAiGPLPUva2yWvZ7QbHpjaUJPXpSgtdEwe4SPSf',
      counter: 27315619,
      sender: {
        alias: 'alijones_alt',
        address: 'tz1VpvqucS7NY8o4z5dsmQi6UA81gbLpUiiu',
      },
      target: {
        address: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_haiku',
        value: {
          haiku: {
            title: '4e65772044617920',
            rowone: '426c616e6b2070616765206f662070726f6d6973652e2e0a',
            rowtwo: '4669727374206d61726b732074686520696e6576697461626c65206a6f75726e65792e0a',
            rowthree: '4c696665206c6f6e6720656e6f7567682c2077726974652e0a',
          },
          params: {
            amount: '1',
            royalties: '100',
            token_metadata: {
              '': '697066733a2f2f516d625941714d70564551384e336a4742454854314c7250424c7a716e576f716a354237515a36636d3555626b32',
            },
          },
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        haikus: 226063,
        ledger: 226064,
        supply: 226067,
        metadata: 226065,
        operators: 226066,
        mint_paused: false,
        administrator: 'tz1ZskdkdyKKXVVfgtKrXaroUux5wsrhBuqr',
        last_token_id: '1',
        token_metadata: 226068,
        token_royalties: 226069,
      },
      diffs: [
        {
          bigmap: 226069,
          path: 'token_royalties',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              minter: 'tz1VpvqucS7NY8o4z5dsmQi6UA81gbLpUiiu',
              royalties: '100',
            },
          },
        },
        {
          bigmap: 226068,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              token_id: '0',
              token_info: {
                '': '697066733a2f2f516d625941714d70564551384e336a4742454854314c7250424c7a716e576f716a354237515a36636d3555626b32',
              },
            },
          },
        },
        {
          bigmap: 226067,
          path: 'supply',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: '1',
          },
        },
        {
          bigmap: 226064,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprvHk4nfgLhMzKbV5pUBm2exqeTH2UsfcogFSeA9UDXUxBCMg9f9',
            key: {
              nat: '0',
              address: 'tz1VpvqucS7NY8o4z5dsmQi6UA81gbLpUiiu',
            },
            value: '1',
          },
        },
        {
          bigmap: 226063,
          path: 'haikus',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              poet: 'tz1VpvqucS7NY8o4z5dsmQi6UA81gbLpUiiu',
              title: '4e65772044617920',
              rowone: '426c616e6b2070616765206f662070726f6d6973652e2e0a',
              rowtwo: '4669727374206d61726b732074686520696e6576697461626c65206a6f75726e65792e0a',
              rowthree: '4c696665206c6f6e6720656e6f7567682c2077726974652e0a',
              token_nr: '0',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [EightscriboMintHandler]);

  expect(events).toStrictEqual([
    {
      id: 'dc711f1a4de3e28ee21690bcf8f978eb',
      type: '8SCRIBO_MINT',
      opid: 289188815,
      ophash: 'opAVNNkMau3UqAiGPLPUva2yWvZ7QbHpjaUJPXpSgtdEwe4SPSf',
      timestamp: '2022-07-17T13:43:14Z',
      level: 2541816,
      fa2_address: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
      token_id: '0',
      editions: '1',
      artist_address: 'tz1VpvqucS7NY8o4z5dsmQi6UA81gbLpUiiu',
      metadata_uri: 'ipfs://QmbYAqMpVEQ8N3jGBEHT1LrPBLzqnWoqj5B7QZ6cm5Ubk2',
      eightscribo_title: 'New Day ',
      eightscribo_rowone: 'Blank page of promise..\n',
      eightscribo_rowtwo: 'First marks the inevitable journey.\n',
      eightscribo_rowthree: 'Life long enough, write.\n',
      royalty_shares: {
        decimals: 3,
        shares: {
          tz1VpvqucS7NY8o4z5dsmQi6UA81gbLpUiiu: '100',
        },
      },
    },
  ]);
});
