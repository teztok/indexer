import KalamintDelistTokenHandler from './kalamint_delist_token';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates KALAMINT_DELIST_TOKEN events', async () => {
  const transactions: Transactions = [
    {
      id: 45861432197120,
      level: 1397496,
      timestamp: '2021-03-23T17:08:46Z',
      block: 'BLhGkYkuBvYQ19MTKUrxUvzAqJaYqqVeFF2qbatmw734A13BjQz',
      hash: 'op7ZTBDag8RR4WuczhxxTCXMaqfRQqoQwvogDfGUKtAKQZB4xQP',
      counter: 10141937,
      sender: {
        alias: 'Teztees',
        address: 'tz1aQbe92zZy6MNeRFtgmgV5dV5R4BNTdqK1',
      },
      target: {
        alias: 'Kalamint Art House',
        address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      },
      amount: 0,
      parameter: {
        entrypoint: 'delist_token',
        value: '165',
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        x: '1',
        ledger: 857,
        paused: false,
        tokens: 861,
        auctions: {},
        metadata: 858,
        operators: 859,
        all_tokens: '186',
        bidding_fee: '4',
        collections: 856,
        max_royalty: '50',
        trading_fee: '25',
        max_editions: '25',
        administrator: 'tz1SotrT1MEeC8bNeGzgBLUb3ryfASsFsdun',
        ipfs_registry: 'KT1QZt5o2eU2ymEpUW8EFhybaLpd9cWfqfUL',
        token_metadata: 860,
        all_collections: '26',
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
            hash: 'exprvP6KwYZaaoT577PBXL9rZ91pbEPpCqmF37najYvWdtSeF1tuXD',
            key: '165',
            value: {
              owner: 'tz1aQbe92zZy6MNeRFtgmgV5dV5R4BNTdqK1',
              price: '1',
              extras: {
                name: 'Red Letter Tezos (S1 Promo) #1',
                symbol: 'NFTzT',
                category: 'art',
                keywords: 'art,card,teztees,collectible,series,promo',
                creator_name: 'teztees',
                collection_name: 'NFTzT Series 1 Promos',
              },
              creator: 'tz1aQbe92zZy6MNeRFtgmgV5dV5R4BNTdqK1',
              on_sale: false,
              decimals: '0',
              editions: '25',
              token_id: '165',
              ipfs_hash: 'ipfs://QmToQR5wpGL9nDBbvYD3gQHjAwAVH4wJqHiQzHbHyaHEXk',
              on_auction: false,
              collection_id: '25',
              edition_number: '8',
              creator_royalty: '20',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [KalamintDelistTokenHandler]);

  expect(events).toStrictEqual([
    {
      id: 'd1af32ed28efdf4acb89fccc3b9a3656',
      type: 'KALAMINT_DELIST_TOKEN',
      opid: '45861432197120',
      ophash: 'op7ZTBDag8RR4WuczhxxTCXMaqfRQqoQwvogDfGUKtAKQZB4xQP',
      timestamp: '2021-03-23T17:08:46Z',
      level: 1397496,
      fa2_address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      seller_address: 'tz1aQbe92zZy6MNeRFtgmgV5dV5R4BNTdqK1',
      token_id: '165',
    },
  ]);
});
