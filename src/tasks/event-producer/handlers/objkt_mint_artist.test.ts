import ObjktMintArtistHandler from './objkt_mint_artist';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_MINT_ARTIST events', async () => {
  const transactions: Transactions = [
    {
      id: 114017578,
      level: 1888131,
      timestamp: '2021-11-23T14:31:52Z',
      block: 'BKy3PaADCcGUS9qwoAf672gsRECFdz619GLcc6PuPRXkhkTeuRd',
      hash: 'ooCVLqTMQATVgMgLUjzjr8qEPtaymbfqb6RYjxL3GgbsFtj9P6K',
      counter: 33152955,
      nonce: null,
      sender: {
        alias: 'GhoulishGroom',
        address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
      },
      target: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      parameter: {
        entrypoint: 'mint_artist',
        value: {
          target: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
          editions: '15',
          metadata_cid: '697066733a2f2f516d634877485877344a4c46486d6967556a5078715772445876726f4d44444e7970756a4c614b3375764b786438',
          collection_id: '2437',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
    },
    {
      id: 114017579,
      level: 1888131,
      timestamp: '2021-11-23T14:31:52Z',
      block: 'BKy3PaADCcGUS9qwoAf672gsRECFdz619GLcc6PuPRXkhkTeuRd',
      hash: 'ooCVLqTMQATVgMgLUjzjr8qEPtaymbfqb6RYjxL3GgbsFtj9P6K',
      counter: 33152955,
      nonce: 1,
      sender: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      target: {
        address: 'KT1NYs2KnP8ckRWbhDDBLC5u7TLNG9zRVCv6',
      },
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '15',
          address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
          metadata: {
            '': '697066733a2f2f516d634877485877344a4c46486d6967556a5078715772445876726f4d44444e7970756a4c614b3375764b786438',
          },
          token_id: '18',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'GhoulishGroom',
        address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
      },
    },
    {
      id: 268538197,
      level: 2472497,
      timestamp: '2022-06-22T11:27:59Z',
      block: 'BLDhjRZbBcWZd6eKbACBLZd9zH9Ump3F9ue67BkkGXqKh7enY9b',
      hash: 'onnwsS2HHFyGXJm3PSNSagYZthHsu931L1TLGLY37BrqQd17HK4',
      counter: 11787893,
      sender: {
        alias: 'Beppe',
        address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
      },
      target: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_artist',
        value: {
          target: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
          editions: '1',
          metadata_cid: '697066733a2f2f516d4e6f356d67415174694a59546f5a7441446274335263457242434c546d78555a47627866633470557a64394e',
          collection_id: '27238',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        mods: ['tz1LKpeN8ZSSFNyTWiBNaE4u4sjaq7J1Vz2z', 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4', 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu'],
        admin: 'tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN',
        big_map: 24161,
        metadata: 24160,
        collaborators: 24158,
        artist_collections: 24157,
        global_collections: 24159,
        artist_collection_id: '27241',
        global_collection_id: '0',
      },
      diffs: [
        {
          bigmap: 24157,
          path: 'artist_collections',
          action: 'update_key',
          content: {
            hash: 'exprtfNuTzvU7rDaNwLNQcQ2PLwxj1yWiXtQjhxjs1Y9faR6SBUGjV',
            key: '27238',
            value: {
              creator: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
              contract: 'KT1VBNQfUQcmZ9okyWCmvKwdLMmiA5SLjYmv',
              token_id: '27',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 268538198,
      level: 2472497,
      timestamp: '2022-06-22T11:27:59Z',
      block: 'BLDhjRZbBcWZd6eKbACBLZd9zH9Ump3F9ue67BkkGXqKh7enY9b',
      hash: 'onnwsS2HHFyGXJm3PSNSagYZthHsu931L1TLGLY37BrqQd17HK4',
      counter: 11787893,
      sender: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      target: {
        address: 'KT1VBNQfUQcmZ9okyWCmvKwdLMmiA5SLjYmv',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
          metadata: {
            '': '697066733a2f2f516d4e6f356d67415174694a59546f5a7441446274335263457242434c546d78555a47627866633470557a64394e',
          },
          token_id: '26',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'Beppe',
        address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
      },
      storage: {
        ledger: 198821,
        paused: false,
        metadata: 198822,
        operators: 198823,
        all_tokens: '27',
        total_supply: 198825,
        administrator: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
        token_metadata: 198824,
      },
      diffs: [
        {
          bigmap: 198825,
          path: 'total_supply',
          action: 'add_key',
          content: {
            hash: 'expru2fGiuEkLMH8doXKdnCurNPSKLsuMn8qcTEr1cvev9qQfQq4Tv',
            key: '26',
            value: '1',
          },
        },
        {
          bigmap: 198824,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expru2fGiuEkLMH8doXKdnCurNPSKLsuMn8qcTEr1cvev9qQfQq4Tv',
            key: '26',
            value: {
              token_id: '26',
              token_info: {
                '': '697066733a2f2f516d4e6f356d67415174694a59546f5a7441446274335263457242434c546d78555a47627866633470557a64394e',
              },
            },
          },
        },
        {
          bigmap: 198821,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprthiYWiHibxMcxuZSgPF39zLTfXQi9WDca1i6zS6woxQsQat7TF',
            key: {
              nat: '26',
              address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
            },
            value: '1',
          },
        },
      ],
      nonce: 39,
    },
    {
      id: 268538199,
      level: 2472497,
      timestamp: '2022-06-22T11:27:59Z',
      block: 'BLDhjRZbBcWZd6eKbACBLZd9zH9Ump3F9ue67BkkGXqKh7enY9b',
      hash: 'onnwsS2HHFyGXJm3PSNSagYZthHsu931L1TLGLY37BrqQd17HK4',
      counter: 11787894,
      sender: {
        alias: 'Beppe',
        address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
      },
      target: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_artist',
        value: {
          target: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
          editions: '1',
          metadata_cid: '697066733a2f2f516d634c775432485567524e3679354b71414a6d676e7a365146457475637435344a44396467437a504769775278',
          collection_id: '27238',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        mods: ['tz1LKpeN8ZSSFNyTWiBNaE4u4sjaq7J1Vz2z', 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4', 'tz1XHhjLXQuG9rf9n7o1VbgegMkiggy1oktu'],
        admin: 'tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN',
        big_map: 24161,
        metadata: 24160,
        collaborators: 24158,
        artist_collections: 24157,
        global_collections: 24159,
        artist_collection_id: '27241',
        global_collection_id: '0',
      },
      diffs: [
        {
          bigmap: 24157,
          path: 'artist_collections',
          action: 'update_key',
          content: {
            hash: 'exprtfNuTzvU7rDaNwLNQcQ2PLwxj1yWiXtQjhxjs1Y9faR6SBUGjV',
            key: '27238',
            value: {
              creator: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
              contract: 'KT1VBNQfUQcmZ9okyWCmvKwdLMmiA5SLjYmv',
              token_id: '28',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 268538200,
      level: 2472497,
      timestamp: '2022-06-22T11:27:59Z',
      block: 'BLDhjRZbBcWZd6eKbACBLZd9zH9Ump3F9ue67BkkGXqKh7enY9b',
      hash: 'onnwsS2HHFyGXJm3PSNSagYZthHsu931L1TLGLY37BrqQd17HK4',
      counter: 11787894,
      sender: {
        alias: 'objkt.com Minting Factory',
        address: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
      },
      target: {
        address: 'KT1VBNQfUQcmZ9okyWCmvKwdLMmiA5SLjYmv',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
          metadata: {
            '': '697066733a2f2f516d634c775432485567524e3679354b71414a6d676e7a365146457475637435344a44396467437a504769775278',
          },
          token_id: '27',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        alias: 'Beppe',
        address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
      },
      storage: {
        ledger: 198821,
        paused: false,
        metadata: 198822,
        operators: 198823,
        all_tokens: '28',
        total_supply: 198825,
        administrator: 'KT1Aq4wWmVanpQhq4TTfjZXB5AjFpx15iQMM',
        token_metadata: 198824,
      },
      diffs: [
        {
          bigmap: 198825,
          path: 'total_supply',
          action: 'add_key',
          content: {
            hash: 'exprubLEsh8heX4o7EQUiaodrScEurez7ZLvvtenXMszkvfYwmEpN2',
            key: '27',
            value: '1',
          },
        },
        {
          bigmap: 198824,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprubLEsh8heX4o7EQUiaodrScEurez7ZLvvtenXMszkvfYwmEpN2',
            key: '27',
            value: {
              token_id: '27',
              token_info: {
                '': '697066733a2f2f516d634c775432485567524e3679354b71414a6d676e7a365146457475637435344a44396467437a504769775278',
              },
            },
          },
        },
        {
          bigmap: 198821,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprtivMaTU2eR1CBvJs6tgu9X6hbkuB8HHxqXeqV5RScZ9VgkJjjY',
            key: {
              nat: '27',
              address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
            },
            value: '1',
          },
        },
      ],
      nonce: 40,
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktMintArtistHandler]);

  expect(events).toStrictEqual([
    {
      id: '52c6d9b475119edd31fe2ed8c2df2822',
      type: 'OBJKT_MINT_ARTIST',
      opid: 114017578,
      ophash: 'ooCVLqTMQATVgMgLUjzjr8qEPtaymbfqb6RYjxL3GgbsFtj9P6K',
      timestamp: '2021-11-23T14:31:52Z',
      level: 1888131,
      fa2_address: 'KT1NYs2KnP8ckRWbhDDBLC5u7TLNG9zRVCv6',
      artist_address: 'tz1UxW1chiPvekzf23ze4L17JY26jTUtHsMF',
      collection_id: '2437',
      token_id: '18',
      editions: '15',
      metadata_uri: 'ipfs://QmcHwHXw4JLFHmigUjPxqWrDXvroMDDNypujLaK3uvKxd8',
    },
    {
      artist_address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
      collection_id: '27238',
      editions: '1',
      fa2_address: 'KT1VBNQfUQcmZ9okyWCmvKwdLMmiA5SLjYmv',
      id: '75c1e4b33fbe53f8794d8acc20fa50e6',
      level: 2472497,
      metadata_uri: 'ipfs://QmNo5mgAQtiJYToZtADbt3RcErBCLTmxUZGbxfc4pUzd9N',
      ophash: 'onnwsS2HHFyGXJm3PSNSagYZthHsu931L1TLGLY37BrqQd17HK4',
      opid: 268538197,
      timestamp: '2022-06-22T11:27:59Z',
      token_id: '26',
      type: 'OBJKT_MINT_ARTIST',
    },
    {
      artist_address: 'tz1TRo6E7mkWVXXbr6bqadKozg3yV3FhnbL2',
      collection_id: '27238',
      editions: '1',
      fa2_address: 'KT1VBNQfUQcmZ9okyWCmvKwdLMmiA5SLjYmv',
      id: '921002900d9b6325514f6e67e5854bc9',
      level: 2472497,
      metadata_uri: 'ipfs://QmcLwT2HUgRN6y5KqAJmgnz6QFEtuct54JD9dgCzPGiwRx',
      ophash: 'onnwsS2HHFyGXJm3PSNSagYZthHsu931L1TLGLY37BrqQd17HK4',
      opid: 268538199,
      timestamp: '2022-06-22T11:27:59Z',
      token_id: '27',
      type: 'OBJKT_MINT_ARTIST',
    },
  ]);
});
