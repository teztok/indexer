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
      nonce: null,
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
      nonce: null,
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
      nonce: null,
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
    {
      id: 279128980,
      level: 2509067,
      timestamp: '2022-07-05T22:00:29Z',
      block: 'BLbsPhr8FA2LeFR9fpBbdt7bEuuqXxr4i5cioZbRDWE31sq3ZPn',
      hash: 'op9pYr7Kgvyk381zsL1syWBeLkcR35atQqjL8uHGJmjkrucu1yW',
      counter: 11549458,
      sender: {
        alias: 'Big Foot Mafia Club Admin',
        address: 'KT1SnDiCRx4dgdgozLqodFdpRstuUgQMPhvG',
      },
      target: {
        alias: 'Big Foot Mafia Club',
        address: 'KT1BY2HcwQBx9mwLDvMvrFH7M9M1HHq5xHSn',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1RaGprXFM7iXhV7VtY636FjA6oC9brU2es',
          metadata: {
            '': '697066733a2f2f516d554a3867714e574b5a32684865453669376944644c31385375656d5672695178703358314a64594d645875712f333031322e6a736f6e',
          },
          token_id: '3012',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1RaGprXFM7iXhV7VtY636FjA6oC9brU2es',
      },
      storage: {
        admin: 'KT1SnDiCRx4dgdgozLqodFdpRstuUgQMPhvG',
        assets: {
          ledger: 212660,
          operators: 212661,
          next_token_id: '3013',
          token_metadata: 212662,
          token_total_supply: 212663,
        },
        metadata: 212659,
      },
      diffs: [
        {
          bigmap: 212663,
          path: 'assets.token_total_supply',
          action: 'add_key',
          content: {
            hash: 'exprtyRuvGQ1MJ1tT6yp9QKx1kmvqknnVqq4VqH43WQX6FZpsM1iwG',
            key: '3012',
            value: '1',
          },
        },
        {
          bigmap: 212662,
          path: 'assets.token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprtyRuvGQ1MJ1tT6yp9QKx1kmvqknnVqq4VqH43WQX6FZpsM1iwG',
            key: '3012',
            value: {
              token_id: '3012',
              token_info: {
                '': '697066733a2f2f516d554a3867714e574b5a32684865453669376944644c31385375656d5672695178703358314a64594d645875712f333031322e6a736f6e',
              },
            },
          },
        },
        {
          bigmap: 212660,
          path: 'assets.ledger',
          action: 'add_key',
          content: {
            hash: 'expru2gckHHRZse2ED4AETeAzNsXY3jxMNWdMvrpJz1umu8KaLBSnA',
            key: {
              nat: '3012',
              address: 'tz1RaGprXFM7iXhV7VtY636FjA6oC9brU2es',
            },
            value: '1',
          },
        },
      ],
      nonce: 32,
    },
    {
      id: 124047413,
      level: 1877594,
      timestamp: '2021-11-19T19:07:02Z',
      block: 'BLkXYwv3uT6UzB3KQFCRxgR2jJ1ckWJDa638RsefX8oSkYB2G5c',
      hash: 'opQsBRkFSj3e72tEoQf6B5Nezb9PKNRjiUufcBoC1YKrAt73NVF',
      counter: 26257577,
      sender: {
        alias: 'Cyber Gecko Crowdsale',
        address: 'KT1JTaXMDKxQJ4bDvHGHGz9aoEAvQubC3e29',
      },
      target: {
        alias: 'Cyber Gecko Gang',
        address: 'KT1CwSgYmZewFazZsW348RAQYn1nthiGP3Qa',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '1',
          address: 'tz1PHNbDbKYVNhNj9CaAzau5GNqRoWfpQw5e',
          metadata: {
            '': '697066733a2f2f516d52394c4d467145353959383778784d355a67365a36684734664368475252434e5172796f36377134366269452f3135352e6a736f6e',
          },
          token_id: '155',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1PHNbDbKYVNhNj9CaAzau5GNqRoWfpQw5e',
      },
      storage: {
        admin: 'KT1JTaXMDKxQJ4bDvHGHGz9aoEAvQubC3e29',
        assets: {
          ledger: 36980,
          operators: 36981,
          next_token_id: '2223',
          token_metadata: 36982,
          token_total_supply: 36983,
        },
        metadata: 36979,
      },
      diffs: [
        {
          bigmap: 36983,
          path: 'assets.token_total_supply',
          action: 'add_key',
          content: {
            hash: 'exprvPGbGdo6Pn6sBPePRvXCkSiKCuNtpHQirkpod7wj2Urp2WaxW8',
            key: '155',
            value: '1',
          },
        },
        {
          bigmap: 36982,
          path: 'assets.token_metadata',
          action: 'add_key',
          content: {
            hash: 'exprvPGbGdo6Pn6sBPePRvXCkSiKCuNtpHQirkpod7wj2Urp2WaxW8',
            key: '155',
            value: {
              token_id: '155',
              token_info: {
                '': '697066733a2f2f516d52394c4d467145353959383778784d355a67365a36684734664368475252434e5172796f36377134366269452f3135352e6a736f6e',
              },
            },
          },
        },
        {
          bigmap: 36980,
          path: 'assets.ledger',
          action: 'add_key',
          content: {
            hash: 'exprv54UvYK9yfxFf9fuf9aMtebSGnrB6n9ALNtTnMgVNmv3ZxpX5q',
            key: {
              nat: '155',
              address: 'tz1PHNbDbKYVNhNj9CaAzau5GNqRoWfpQw5e',
            },
            value: '1',
          },
        },
      ],
      nonce: 5,
    },
    {
      id: 154257835,
      level: 2026426,
      timestamp: '2022-01-13T03:46:20Z',
      block: 'BM3FC7FmYkuJZa1DLhLxq8oiveCuRRZ5fVctnv4Kb6ZRkAFMRPS',
      hash: 'ooKnKEDKj72spm5qwVm4MZPfzjqwsQBAYyhXKzaxus57TYdjbtk',
      counter: 45136621,
      sender: {
        alias: 'GAP NFT Seller',
        address: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
      },
      target: {
        alias: 'GAP Threads Asset Manager',
        address: 'KT1GA6KaLWpURnjvmnxB4wToErzM2EXHqrMo',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: [
          {
            owner: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
            amount: '10000',
            token_info: {
              '': '697066733a2f2f62616679626569656d79706e746c6570736b6b67726163776a7078326c3535626b627832657a686b76687836626367796a796567696f7365716f69',
            },
          },
        ],
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        admin: {
          admin: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
          paused: false,
          pending_admin: null,
        },
        assets: {
          ledger: 77034,
          operators: 77035,
          next_token_id: '2',
          token_metadata: 77036,
          contract_operators: [],
          token_total_supply: 77037,
        },
        metadata: 77038,
      },
      diffs: [
        {
          bigmap: 77037,
          path: 'assets.token_total_supply',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: '10000',
          },
        },
        {
          bigmap: 77036,
          path: 'assets.token_metadata',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              token_id: '1',
              token_info: {
                '': '697066733a2f2f62616679626569656d79706e746c6570736b6b67726163776a7078326c3535626b627832657a686b76687836626367796a796567696f7365716f69',
              },
            },
          },
        },
        {
          bigmap: 77034,
          path: 'assets.ledger',
          action: 'add_key',
          content: {
            hash: 'exprvL5aRGaoP6g8zAXwubhWdF1SapvJXdbeps1Skgs8ECmDupRoAR',
            key: {
              nat: '1',
              address: 'tz1U7xSdkqfv2Q4WHp9x6e1kv8FoE31kgimv',
            },
            value: '10000',
          },
        },
      ],
      nonce: null,
    },
    {
      id: 177395668,
      level: 2140752,
      timestamp: '2022-02-22T22:01:20Z',
      block: 'BMbZeVzi4aaaH2Qt76zuZhfMghUQsv8RbHfZev3fJMh2j8mLfEd',
      hash: 'onwYmD9BvfHkZMKPMUsg3incNr9fgmLnMddagCC7SgPKu43FJbX',
      counter: 28626027,
      sender: {
        alias: 'DOGAMÍ NFT Sale',
        address: 'KT1CpMKxKFoHvS7zxSd2M6SHU8BD4gBmtw2N',
      },
      target: {
        alias: 'DOGAMÍ NFTs',
        address: 'KT1NVvPsNDChrLRH5K2cy6Sc9r1uuUwdiZQd',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          to_: 'tz1XqrVXcRKDLeWFNWMuDaxhhvYu6zE7WzZc',
          token_id: '2',
          token_info: {
            name: '446f67616d69202332',
            rights: '28632920444f47414d492e20416c6c205269676874732052657365727665642e',
            formats:
              '5b7b226d696d6554797065223a2022766964656f2f6d7034222c2022757269223a2022697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70227d5d',
            creators: '5b22444f47414d49225d',
            decimals: '30',
            royalties:
              '7b22646563696d616c73223a20322c2022736861726573223a207b22747a31626a394e784b59757073375743466d79746b594a547736727874697a4a5237394b223a20377d7d',
            attributes:
              '0502000000380704010000000a47656e65726174696f6e070703060100000005416c70686107040100000006537461747573070703060100000003426f78',
            displayUri: '697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053',
            artifactUri: '697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337',
            description: '444f47414d492c2041646f70742052616973652c204561726e2e',
            thumbnailUri: '697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70',
            isBooleanAmount: '74727565',
          },
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1XqrVXcRKDLeWFNWMuDaxhhvYu6zE7WzZc',
      },
      storage: {
        ledger: 115417,
        metadata: 115418,
        multisig: 'KT1FDSvLCUcFZStQAKo5Fb4igCwtqipRcvMX',
        contracts: ['KT1CpMKxKFoHvS7zxSd2M6SHU8BD4gBmtw2N'],
        operators: 115419,
        burn_paused: true,
        total_supply: '1',
        token_metadata: 115420,
        contract_paused: false,
      },
      diffs: [
        {
          bigmap: 115420,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              token_id: '2',
              token_info: {
                name: '446f67616d69202332',
                rights: '28632920444f47414d492e20416c6c205269676874732052657365727665642e',
                formats:
                  '5b7b226d696d6554797065223a2022766964656f2f6d7034222c2022757269223a2022697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053227d2c207b226d696d6554797065223a2022696d6167652f706e67222c2022757269223a2022697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70227d5d',
                creators: '5b22444f47414d49225d',
                decimals: '30',
                royalties:
                  '7b22646563696d616c73223a20322c2022736861726573223a207b22747a31626a394e784b59757073375743466d79746b594a547736727874697a4a5237394b223a20377d7d',
                displayUri: '697066733a2f2f516d533751654d64437733394c45663774455734346f77755375574e5243506a47514b6a4671364b755a78435053',
                artifactUri: '697066733a2f2f516d6258627165563644545658594635554474313543457638524d4c737557554547736a4638383551587a6e3337',
                description: '444f47414d492c2041646f70742052616973652c204561726e2e',
                thumbnailUri: '697066733a2f2f516d584a3966615339366b515644536475386f737a37544a764b67333679576969527a6d6b6239583142476d7a70',
                isBooleanAmount: '74727565',
              },
            },
          },
        },
        {
          bigmap: 115417,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: 'tz1XqrVXcRKDLeWFNWMuDaxhhvYu6zE7WzZc',
          },
        },
      ],
      nonce: 2,
    },
    {
      id: 313428874,
      level: 2618132,
      timestamp: '2022-08-13T10:32:29Z',
      block: 'BLhjdJwtyVqqbN864MnPYCegXxboC72LaTL5yhHXff5r1FEmoTQ',
      hash: 'ooRcx4cQDWh1LnT84og9a8zmt4Hh9Yi8JTBRSCZJ7fpDH7Q4GY9',
      counter: 43670265,
      sender: {
        alias: 'Mehraab Moqadamii',
        address: 'tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW',
      },
      target: {
        alias: 'Rarible',
        address: 'KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          iowner: 'tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW',
          iamount: '1',
          itokenid: '78891',
          iroyalties: [
            {
              partValue: '1000',
              partAccount: 'tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW',
            },
          ],
          itokenMetadata: {
            '': '697066733a2f2f6261666b726569657034337375636b76756b37677966627837786e35757a6168723775736f777062636e3666326d6c62657a376a67696b62717679',
          },
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        owner: 'tz1PyW1EznU9ADpocaauSi41NCPynBuqf1Kc',
        ledger: 55542,
        paused: false,
        permits: 55545,
        metadata: 55547,
        operator: 55543,
        royalties: 55541,
        default_expiry: '31556952',
        token_metadata: 55544,
        owner_candidate: null,
        operator_for_all: 55546,
      },
      diffs: [
        {
          bigmap: 55544,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruRSSdLKBPqirAawjiYpX3ebcHCdpp5MN466eLgKRv9fXBnVZVA',
            key: '78891',
            value: {
              token_id: '78891',
              token_info: {
                '': '697066733a2f2f6261666b726569657034337375636b76756b37677966627837786e35757a6168723775736f777062636e3666326d6c62657a376a67696b62717679',
              },
            },
          },
        },
        {
          bigmap: 55542,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprvDYv4RegLFgS2y5sTBkkCK5oyW2PR7GEQcmR79fRxP3WroQdBL',
            key: {
              nat: '78891',
              address: 'tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW',
            },
            value: '1',
          },
        },
        {
          bigmap: 55541,
          path: 'royalties',
          action: 'add_key',
          content: {
            hash: 'expruRSSdLKBPqirAawjiYpX3ebcHCdpp5MN466eLgKRv9fXBnVZVA',
            key: '78891',
            value: [
              {
                partValue: '1000',
                partAccount: 'tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW',
              },
            ],
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [SetMetadataHandler]);

  expect(events).toStrictEqual([
    {
      id: '3e6fc37df1c97531849c5cdd89710dc5',
      type: 'SET_METADATA',
      opid: '42073252',
      ophash: 'opLcz2WHyyiAWQRwBRpggB2kwF9ZyxWJyAEEqV5uRaNtjqP47Sj',
      timestamp: '2021-03-01T07:27:27Z',
      level: 1365467,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '153',
      metadata_uri: 'ipfs://QmeaqRBUiw4cJiNKEcW2noc7egLd5GgBqLcHHqUhauJAHN',
    },
    {
      id: 'a3f7cbc80432eef9aa3ce326b78574d9',
      type: 'SET_METADATA',
      opid: '104380647',
      ophash: 'op6aQByDMQpBKWieNcdCx9MFuxKZEB2kAtViMhXN4H45EXBLKns',
      timestamp: '2021-11-03T12:37:12Z',
      level: 1832253,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '1',
      metadata_uri: 'ipfs://QmagGPYiTPQQV1i9WMwGQ2zhgDeWqHefgtbBmWwGkr7tbY',
    },
    {
      id: 'd3a299bf58d318ba1c31e5203ae90eb5',
      type: 'SET_METADATA',
      opid: '73077463',
      ophash: 'opG7tkzJknmCJTLzg7pzWsuoLVj24cpe8QRGEZrgcL2PqP3HK8j',
      timestamp: '2021-08-31T17:59:48Z',
      level: 1654612,
      fa2_address: 'KT1LHHLso8zQWQWg1HUukajdxxbkGfNoHjh6',
      token_id: '516',
      metadata_uri: 'ipfs://zdj7WkPvrxL7VxiWbjBP5rfshPtAzXwZ77uvZhfSAoHDeb3iw/516',
    },
    {
      fa2_address: 'KT1BY2HcwQBx9mwLDvMvrFH7M9M1HHq5xHSn',
      id: '6fd810eaab30ef950e0f61e0d7e736b6',
      level: 2509067,
      metadata_uri: 'ipfs://QmUJ8gqNWKZ2hHeE6i7iDdL18SuemVriQxp3X1JdYMdXuq/3012.json',
      ophash: 'op9pYr7Kgvyk381zsL1syWBeLkcR35atQqjL8uHGJmjkrucu1yW',
      opid: '279128980',
      timestamp: '2022-07-05T22:00:29Z',
      token_id: '3012',
      type: 'SET_METADATA',
    },
    {
      fa2_address: 'KT1CwSgYmZewFazZsW348RAQYn1nthiGP3Qa',
      id: '4c39cd7bcde5d340604c9d8e8f518cfd',
      level: 1877594,
      metadata_uri: 'ipfs://QmR9LMFqE59Y87xxM5Zg6Z6hG4fChGRRCNQryo67q46biE/155.json',
      ophash: 'opQsBRkFSj3e72tEoQf6B5Nezb9PKNRjiUufcBoC1YKrAt73NVF',
      opid: '124047413',
      timestamp: '2021-11-19T19:07:02Z',
      token_id: '155',
      type: 'SET_METADATA',
    },
    {
      fa2_address: 'KT1GA6KaLWpURnjvmnxB4wToErzM2EXHqrMo',
      id: 'f25cb7edcf41acea56dc53504ce1bfc9',
      level: 2026426,
      metadata_uri: 'ipfs://bafybeiemypntlepskkgracwjpx2l55bkbx2ezhkvhx6bcgyjyegioseqoi',
      ophash: 'ooKnKEDKj72spm5qwVm4MZPfzjqwsQBAYyhXKzaxus57TYdjbtk',
      opid: '154257835',
      timestamp: '2022-01-13T03:46:20Z',
      token_id: '1',
      type: 'SET_METADATA',
    },
    {
      fa2_address: 'KT1NVvPsNDChrLRH5K2cy6Sc9r1uuUwdiZQd',
      id: '0848b3e4b444de99501e6eb848ef5be5',
      level: 2140752,
      ophash: 'onwYmD9BvfHkZMKPMUsg3incNr9fgmLnMddagCC7SgPKu43FJbX',
      opid: '177395668',
      timestamp: '2022-02-22T22:01:20Z',
      token_id: '2',
      type: 'SET_METADATA',
      metadata: {
        artifactUri: 'ipfs://QmbXbqeV6DTVXYF5UDt15CEv8RMLsuWUEGsjF885QXzn37',
        creators: ['DOGAMI'],
        decimals: 0,
        description: 'DOGAMI, Adopt Raise, Earn.',
        displayUri: 'ipfs://QmS7QeMdCw39LEf7tEW44owuSuWNRCPjGQKjFq6KuZxCPS',
        formats: [
          { mimeType: 'video/mp4', uri: 'ipfs://QmbXbqeV6DTVXYF5UDt15CEv8RMLsuWUEGsjF885QXzn37' },
          { mimeType: 'image/png', uri: 'ipfs://QmS7QeMdCw39LEf7tEW44owuSuWNRCPjGQKjFq6KuZxCPS' },
          { mimeType: 'image/png', uri: 'ipfs://QmXJ9faS96kQVDSdu8osz7TJvKg36yWiiRzmkb9X1BGmzp' },
        ],
        isBooleanAmount: true,
        name: 'Dogami #2',
        rights: '(c) DOGAMI. All Rights Reserved.',
        royalties: { decimals: 2, shares: { tz1bj9NxKYups7WCFmytkYJTw6rxtizJR79K: 7 } },
        thumbnailUri: 'ipfs://QmXJ9faS96kQVDSdu8osz7TJvKg36yWiiRzmkb9X1BGmzp',
      },
    },
    {
      fa2_address: 'KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS',
      id: 'cbd23bbc895b1f038137465b325108d3',
      level: 2618132,
      metadata_uri: 'ipfs://bafkreiep43suckvuk7gyfbx7xn5uzahr7usowpbcn6f2mlbez7jgikbqvy',
      ophash: 'ooRcx4cQDWh1LnT84og9a8zmt4Hh9Yi8JTBRSCZJ7fpDH7Q4GY9',
      opid: '313428874',
      timestamp: '2022-08-13T10:32:29Z',
      token_id: '78891',
      type: 'SET_METADATA',
    },
  ]);
});
