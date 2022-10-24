import KalamintBuyHandler from './kalamint_buy';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates KALAMINT_BUY events', async () => {
  const transactions: Transactions = [
    {
      id: 45856910737408,
      level: 1397425,
      timestamp: '2021-03-23T15:57:46Z',
      block: 'BMJ3o8zWTpUYnFw51S9V6k3GehA2phBb4PWb5xWd6DzDXiDkVKX',
      hash: 'oneNf7H7gj8bJkJR1NpfTutZ1PeCsjuVaiP312Ju7xyeU3dVrNn',
      counter: 11884965,
      sender: {
        alias: 'Pronoia',
        address: 'tz1hyNv7RBzNPGLpKfdwHRc6NhLW6VbzXP3N',
      },
      target: {
        alias: 'Kalamint Art House',
        address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      },
      amount: 10000000,
      parameter: {
        entrypoint: 'buy',
        value: '40',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        x: '7',
        ledger: 857,
        paused: false,
        tokens: 861,
        auctions: {},
        metadata: 858,
        operators: 859,
        all_tokens: '60',
        bidding_fee: '4',
        collections: 856,
        max_royalty: '50',
        trading_fee: '25',
        max_editions: '25',
        administrator: 'tz1SotrT1MEeC8bNeGzgBLUb3ryfASsFsdun',
        ipfs_registry: 'KT1QZt5o2eU2ymEpUW8EFhybaLpd9cWfqfUL',
        token_metadata: 860,
        all_collections: '11',
        auction_factory: 'KT1MiSxkVDFDrAMYCZZXdBEkNrf1NWzfnnRR',
        metadata_string: {},
        id_max_increment: '100',
        trading_fee_collector: 'tz1ijy2Z7sSmmxPqsZ6iGRn1ZHrCtpwR7XNm',
      },
      diffs: [
        {
          bigmap: 861,
          path: 'tokens',
          action: 'update_key',
          content: {
            hash: 'exprvTHEWNUSkauLiNM7jYXa2hBbHLjWFLcRJzdX9xcmNFd4AiUosN',
            key: '40',
            value: {
              owner: 'tz1hyNv7RBzNPGLpKfdwHRc6NhLW6VbzXP3N',
              price: '10000000',
              extras: {
                name: 'Habitat 0',
                symbol: 'HAB00',
                category: 'art',
                keywords: 'processing, creative coding, generative geometry',
                creator_name: 'wblut',
                collection_name: 'ISO',
              },
              creator: 'tz1TSWEDs9wcBx2KiRzVzyzECsNpRiZaLJ1D',
              on_sale: false,
              decimals: '0',
              editions: '10',
              token_id: '40',
              ipfs_hash: 'ipfs://QmcTjpvKFAkXhwK4Cjvx6nVR2W4mnVDKswZcf39d8UQAGD',
              on_auction: false,
              collection_id: '8',
              edition_number: '1',
              creator_royalty: '10',
            },
          },
        },
        {
          bigmap: 857,
          path: 'ledger',
          action: 'update_key',
          content: {
            hash: 'expruqmuoY2a84ekJRpSWJ5wAVgCu8y2B5dmBhyW91cXyv6NcsCtj7',
            key: {
              nat: '40',
              address: 'tz1TSWEDs9wcBx2KiRzVzyzECsNpRiZaLJ1D',
            },
            value: '0',
          },
        },
        {
          bigmap: 857,
          path: 'ledger',
          action: 'add_key',
          content: {
            hash: 'exprv2Zphh5Z1qm7fbub3TpALP2HYsKVSv4z4gCattxn4truwvFMdv',
            key: {
              nat: '40',
              address: 'tz1hyNv7RBzNPGLpKfdwHRc6NhLW6VbzXP3N',
            },
            value: '1',
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [KalamintBuyHandler]);

  expect(events).toStrictEqual([
    {
      id: '19ea3e47a82183b5db18d029c2c67b3d',
      type: 'KALAMINT_BUY',
      implements: 'SALE',
      opid: '45856910737408',
      ophash: 'oneNf7H7gj8bJkJR1NpfTutZ1PeCsjuVaiP312Ju7xyeU3dVrNn',
      timestamp: '2021-03-23T15:57:46Z',
      level: 1397425,
      fa2_address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      token_id: '40',
      buyer_address: 'tz1hyNv7RBzNPGLpKfdwHRc6NhLW6VbzXP3N',
      seller_address: 'tz1TSWEDs9wcBx2KiRzVzyzECsNpRiZaLJ1D',
      price: '10000000',
    },
  ]);
});
