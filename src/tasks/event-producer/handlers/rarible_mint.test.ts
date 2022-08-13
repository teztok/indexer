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
      metadata_uri: 'ipfs://bafkreiep43suckvuk7gyfbx7xn5uzahr7usowpbcn6f2mlbez7jgikbqvy',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1fxvZGU1vR7FtNoyMwkHiMPkCyagpbF4NW: '1000',
        },
      },
    },
  ]);
});
