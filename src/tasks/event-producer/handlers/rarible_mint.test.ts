import RaribleMintHandler from './rarible_mint';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates RARIBLE_MINT events', async () => {
  const transactions: Transactions = [
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
    {
      id: 137710864,
      level: 1947766,
      timestamp: '2021-12-15T16:27:06Z',
      block: 'BMFHUfsTbydEi9Wk99chhN6wGatFtQ4n9tMJdtEdN1YA5aoor6W',
      hash: 'oocHVnB84Rr8TXZUjSryfcULGSyqNN9YGd3Egp4qVNewxF19yKg',
      counter: 11739224,
      sender: {
        alias: 'ganbrood',
        address: 'tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd',
      },
      target: {
        alias: 'Rarible',
        address: 'KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          iowner: 'tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd',
          iamount: '200',
          itokenid: '274',
          iroyalties: [
            {
              partValue: '1200',
              partAccount: 'tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd',
            },
          ],
          itokenMetadata: {
            '': '697066733a2f2f697066732f516d6466467361416d574146513442646a4b6b725347674364455276685537353278623965715847695937394258',
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
            hash: 'exprv9kSh4E2nbxUrkRGW4apMF7KYXbuFt8VvpaoBFdoeWpjuZ3N7f',
            key: '274',
            value: {
              token_id: '274',
              token_info: {
                '': '697066733a2f2f697066732f516d6466467361416d574146513442646a4b6b725347674364455276685537353278623965715847695937394258',
              },
            },
          },
        },
        {
          bigmap: 55542,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprvEmYoT4mFAHmcEr5iajakAZueVzCyMKAGJDoAcwugRmMJ9bqR8',
            key: {
              nat: '274',
              address: 'tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd',
            },
            value: '200',
          },
        },
        {
          bigmap: 55541,
          path: 'royalties',
          action: 'add_key',
          content: {
            hash: 'exprv9kSh4E2nbxUrkRGW4apMF7KYXbuFt8VvpaoBFdoeWpjuZ3N7f',
            key: '274',
            value: [
              {
                partValue: '1200',
                partAccount: 'tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd',
              },
            ],
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [RaribleMintHandler]);

  expect(events).toStrictEqual([
    {
      id: '45facd14842bda14160aa1390b055c1e',
      type: 'RARIBLE_MINT',
      opid: 313428874,
      ophash: 'ooRcx4cQDWh1LnT84og9a8zmt4Hh9Yi8JTBRSCZJ7fpDH7Q4GY9',
      timestamp: '2022-08-13T10:32:29Z',
      level: 2618132,
      fa2_address: 'KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS',
      token_id: '78891',
      editions: '1',
      artist_address: 'tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW',
      is_verified_artist: true,
      metadata_uri: 'ipfs://bafkreiep43suckvuk7gyfbx7xn5uzahr7usowpbcn6f2mlbez7jgikbqvy',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW: '1000',
        },
      },
    },
    {
      artist_address: 'tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd',
      is_verified_artist: true,
      editions: '200',
      fa2_address: 'KT18pVpRXKPY2c4U2yFEGSH3ZnhB2kL8kwXS',
      id: 'd10ee493284f639045f67d80af617f44',
      level: 1947766,
      metadata_uri: 'ipfs://QmdfFsaAmWAFQ4BdjKkrSGgCdERvhU752xb9eqXGiY79BX',
      ophash: 'oocHVnB84Rr8TXZUjSryfcULGSyqNN9YGd3Egp4qVNewxF19yKg',
      opid: 137710864,
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1eZ8amacCvSQsFM8wampwWXJFWsmGVRQFd: '1200',
        },
      },
      timestamp: '2021-12-15T16:27:06Z',
      token_id: '274',
      type: 'RARIBLE_MINT',
    },
  ]);
});
