import TypedMintHandler from './typed_mint';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates TYPED_MINT events', async () => {
  const transactions: Transactions = [
    {
      id: 265995610,
      level: 2464655,
      timestamp: '2022-06-19T15:34:59Z',
      block: 'BLXyRBDCbPtH1i4YSZp8o8VHs56sX9nPXkjjq8XwyJa4TpTYDem',
      hash: 'onpjJRAe3FE7jhNQnaem3rZnZD3dCic2NHWroEC54nENZB3HerU',
      counter: 27009504,
      sender: {
        address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
      },
      target: {
        alias: 'typed minter',
        address: 'KT1CK9RnWZGnejBeT6gJfgvf4p7f1NwhP9wS',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint_TYPED',
        value: {
          amount: '20',
          metadata: '697066733a2f2f516d596b6f5239686b684c35316b66546a776d5a356137525761744644586463664a52756747474b7a65657a5643',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        objkt: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
        royal: '100',
        manager: 'tz1aqMiWgnFddGZSTsEMSe8qbXkVGn7C4cg5',
        metadata: 196861,
        objkt_id: '3',
        royalties: 196862,
        mint_paused: false,
      },
      diffs: [
        {
          bigmap: 196862,
          path: 'royalties',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              issuer: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
              royalties: '100',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 265995611,
      level: 2464655,
      timestamp: '2022-06-19T15:34:59Z',
      block: 'BLXyRBDCbPtH1i4YSZp8o8VHs56sX9nPXkjjq8XwyJa4TpTYDem',
      hash: 'onpjJRAe3FE7jhNQnaem3rZnZD3dCic2NHWroEC54nENZB3HerU',
      counter: 27009504,
      sender: {
        alias: 'typed minter',
        address: 'KT1CK9RnWZGnejBeT6gJfgvf4p7f1NwhP9wS',
      },
      target: {
        alias: 'typed fa2',
        address: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
      },
      amount: 0,
      parameter: {
        entrypoint: 'mint',
        value: {
          amount: '20',
          address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
          token_id: '2',
          token_info: {
            '': '697066733a2f2f516d596b6f5239686b684c35316b66546a776d5a356137525761744644586463664a52756747474b7a65657a5643',
          },
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
      },
      storage: {
        ledger: 196857,
        paused: false,
        payout: 'tz1aqMiWgnFddGZSTsEMSe8qbXkVGn7C4cg5',
        metadata: 196858,
        operators: 196859,
        all_tokens: '3',
        administrator: 'KT1CK9RnWZGnejBeT6gJfgvf4p7f1NwhP9wS',
        token_metadata: 196860,
      },
      diffs: [
        {
          bigmap: 196860,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              token_id: '2',
              token_info: {
                '': '697066733a2f2f516d596b6f5239686b684c35316b66546a776d5a356137525761744644586463664a52756747474b7a65657a5643',
              },
            },
          },
        },
        {
          bigmap: 196857,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprvPGNCNdQZGt2vD56PfAaM4VPM1LEANdMh48S9NhCUQchN78Puk',
            key: {
              nat: '2',
              address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
            },
            value: '20',
          },
        },
      ],
      nonce: 1,
    },
  ];

  const events = transactionsToEvents(transactions, [TypedMintHandler]);

  expect(events).toStrictEqual([
    {
      id: '49215181ab9a8466c62c05d2257bb759',
      type: 'TYPED_MINT',
      opid: 265995610,
      ophash: 'onpjJRAe3FE7jhNQnaem3rZnZD3dCic2NHWroEC54nENZB3HerU',
      timestamp: '2022-06-19T15:34:59Z',
      level: 2464655,
      fa2_address: 'KT1J6NY5AU61GzUX51n59wwiZcGJ9DrNTwbK',
      token_id: '2',
      editions: '20',
      artist_address: 'tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku',
      is_verified_artist: true,
      metadata_uri: 'ipfs://QmYkoR9hkhL51kfTjwmZ5a7RWatFDXdcfJRugGGKzeezVC',
      royalty_shares: {
        decimals: 3,
        shares: {
          tz1Z5WiUAYnvqBfSwcLeB6rEeSsyh1F1gtku: '100',
        },
      },
    },
  ]);
});
