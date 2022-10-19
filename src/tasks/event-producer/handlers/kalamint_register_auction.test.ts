import KalamintRegisterAuctionHandler from './kalamint_register_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates KALAMINT_REGISTER_AUCTION events', async () => {
  const transactions: Transactions = [
    {
      id: 52056646746112,
      level: 1465875,
      timestamp: '2021-05-10T17:17:06Z',
      block: 'BM3j3Tr24DBZYfaC2ugZvJ7L67QuEdvjMikCTpZ1mgXGryxHh78',
      hash: 'onwJ9rFVGMqKoYQnmuzUpyC1rkdknKEG52DXh918HNQ22iCppJc',
      counter: 11881709,
      sender: {
        alias: 'Kalamint Auction Factory',
        address: 'KT1MiSxkVDFDrAMYCZZXdBEkNrf1NWzfnnRR',
      },
      target: {
        alias: 'Kalamint Art House',
        address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      },
      amount: 0,
      parameter: {
        entrypoint: 'register_auction',
        value: {
          token_id: '8048',
          reserve_price: '550000000',
          auction_contract: 'KT1PBicnhgJbkRcSrfYdDvcsaLkiET5SD8tn',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: {
        address: 'tz1bKM4FRgAsGdDWzXs4o5HZdjBbLMbPBAA1',
      },
      storage: {
        x: '1',
        ledger: 857,
        paused: false,
        tokens: 861,
        auctions: {
          '5939': 'KT1Mqy9suwjpA2a2zuWgGr2niujVrbKN68u9',
          '8048': 'KT1PBicnhgJbkRcSrfYdDvcsaLkiET5SD8tn',
        },
        metadata: 858,
        operators: 859,
        all_tokens: '8055',
        bidding_fee: '4',
        collections: 856,
        max_royalty: '50',
        trading_fee: '25',
        max_editions: '25',
        administrator: 'tz1SotrT1MEeC8bNeGzgBLUb3ryfASsFsdun',
        ipfs_registry: 'KT1QZt5o2eU2ymEpUW8EFhybaLpd9cWfqfUL',
        token_metadata: 860,
        all_collections: '922',
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
            hash: 'expruhJyrro4LaHPphQ6QXqXJa5BL9xy46HXMifM64mGBNEKpadUYw',
            key: '8048',
            value: {
              owner: 'tz1bKM4FRgAsGdDWzXs4o5HZdjBbLMbPBAA1',
              price: '550000000',
              extras: {
                name: 'Block 0012',
                symbol: 'TZTOP',
                category: 'art',
                keywords: 'tezotop, tezotopia, gifgames, gaming',
                creator_name: 'gifdotgames',
                collection_name: 'Tezotop Block',
              },
              creator: 'tz1bKM4FRgAsGdDWzXs4o5HZdjBbLMbPBAA1',
              on_sale: false,
              decimals: '0',
              editions: '1',
              token_id: '8048',
              ipfs_hash: 'ipfs://QmTW2JnTeyqgNuQsZZLkht8YVYwP19iJPZYSksWonz4Svz',
              on_auction: true,
              collection_id: '0',
              edition_number: '1',
              creator_royalty: '10',
            },
          },
        },
      ],
      nonce: 20,
    },
  ];

  const events = transactionsToEvents(transactions, [KalamintRegisterAuctionHandler]);

  expect(events).toStrictEqual([
    {
      id: 'df6a41e8ccacbd4fa5ba56065b212bbe',
      type: 'KALAMINT_REGISTER_AUCTION',
      opid: '52056646746112',
      ophash: 'onwJ9rFVGMqKoYQnmuzUpyC1rkdknKEG52DXh918HNQ22iCppJc',
      timestamp: '2021-05-10T17:17:06Z',
      level: 1465875,
      fa2_address: 'KT1EpGgjQs73QfFJs9z7m1Mxm5MTnpC2tqse',
      token_id: '8048',
    },
  ]);
});
