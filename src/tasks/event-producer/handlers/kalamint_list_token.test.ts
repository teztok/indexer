import KalamintListTokenHandler from './kalamint_list_token';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates KALAMINT_LIST_TOKEN events', async () => {
  const transactions: Transactions = [
    {
      id: 45879809540096,
      level: 1397769,
      timestamp: '2021-03-23T21:45:06Z',
      block: 'BMSKHtYMbgRLdS9nPZemyESjDcMRyQoy7h5X7No8iAhEDz5sDFk',
      hash: 'ooknuHBot1w1HCrTSFFQnwe2R14Db5Sx9sBVSRaJ9Gh1Eh5PrNx',
      counter: 11963247,
      sender: {
        address: 'tz1eEDYry3BP1Kaaui7qmKo5XeDUnk6BeyzM',
      },
      target: {
        alias: 'Kalamint Art House',
        address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      },
      amount: 0,
      parameter: {
        entrypoint: 'list_token',
        value: {
          price: '120000000',
          token_id: '204',
        },
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
        all_tokens: '281',
        bidding_fee: '4',
        collections: 856,
        max_royalty: '50',
        trading_fee: '25',
        max_editions: '25',
        administrator: 'tz1SotrT1MEeC8bNeGzgBLUb3ryfASsFsdun',
        ipfs_registry: 'KT1QZt5o2eU2ymEpUW8EFhybaLpd9cWfqfUL',
        token_metadata: 860,
        all_collections: '38',
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
            hash: 'exprtm96F1yEgddG768cshZshfekXy6wzyRjcZbVgVwm9dVcqePQQi',
            key: '204',
            value: {
              owner: 'tz1eEDYry3BP1Kaaui7qmKo5XeDUnk6BeyzM',
              price: '120000000',
              extras: {
                name: 'odE to Edo',
                symbol: 'Q0002',
                category: 'art',
                keywords: 'watercolor, original, Edo, Tezos, Protocols',
                creator_name: 'qartsi',
                collection_name: 'Origins',
              },
              creator: 'tz1PYqfNnkpZydtSY2Tn3Rv8mjkgUpHJpFXC',
              on_sale: true,
              decimals: '0',
              editions: '3',
              token_id: '204',
              ipfs_hash: 'ipfs://QmWTJqA9FZpjXtprfXDD4X8GmBTPPrQCzNNbHywMoadtkk',
              on_auction: false,
              collection_id: '30',
              edition_number: '2',
              creator_royalty: '15',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [KalamintListTokenHandler]);

  expect(events).toStrictEqual([
    {
      id: 'b795829bde3901f9d5c8b5ad13c90ee0',
      type: 'KALAMINT_LIST_TOKEN',
      opid: '45879809540096',
      ophash: 'ooknuHBot1w1HCrTSFFQnwe2R14Db5Sx9sBVSRaJ9Gh1Eh5PrNx',
      timestamp: '2021-03-23T21:45:06Z',
      level: 1397769,
      fa2_address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      token_id: '204',
      seller_address: 'tz1eEDYry3BP1Kaaui7qmKo5XeDUnk6BeyzM',
      price: '120000000',
    },
  ]);
});
