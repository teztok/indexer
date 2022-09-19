import VersumCreateAuctionHandler from './versum_create_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_CREATE_AUCTION events', async () => {
  const transactions: Transactions = [
    {
      id: 138299001,
      level: 2026273,
      timestamp: '2022-01-13T02:29:50Z',
      block: 'BLNPuvqa9jgd1x5BNGS6jNUssMXYeroCzmun4hGSv74Li1g7RbT',
      hash: 'onupngKsa1ZTLSUC3Kf3whsAK482qbJuK3wNw4A4E2UthS45gSt',
      counter: 14611620,
      nonce: null,
      sender: {
        alias: 'Cthulucene',
        address: 'tz1hrPrHQ1WncBaYTfEWta2LZzqGKVgdTukd',
      },
      target: {
        alias: 'Versum Market',
        address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      },
      parameter: {
        entrypoint: 'create_auction',
        value: {
          token: {
            nat: '2',
            address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
          },
          currency: null,
          bid_amount: '200000000',
          token_amount: '1',
          end_timestamp: '2022-01-13T08:29:21Z',
          require_verified: false,
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        swaps: 75634,
        offers: 75633,
        paused: false,
        big_map: 75635,
        max_fee: '45',
        min_fee: '15',
        auctions: 75627,
        extra_db: 75629,
        fa2_fees: 75630,
        identity: 'KT1NUrzs7tiT4VbNPqeTxgAFa4SXeV1f3xe9',
        metadata: 75632,
        deprecated: false,
        swap_counter: '63',
        administrator: 'KT1XumYAxnPCrDiLU4XLNciZncExAzdEJrua',
        offer_counter: '70',
        auction_counter: '2',
        default_fa2_fee: '15',
        default_xtz_fee: '12',
        last_collect_op: {
          level: '2026271',
          source: 'tz1V9ZviaGUWZjGx4U7cGYFEyUGyqpFnVGXx',
        },
        royalty_adapter: 'KT1NffZ1mqqcXrwYY3ZNaAYxhYkyiDvvTZ3C',
        fee_per_platform: 75631,
        contract_registry: 'KT1BMWkNX3zRDH1a6A4PJ1uHjhAm44jhQvrB',
        admin_check_lambda:
          '[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"PUSH","args":[{"prim":"address"},{"bytes":"0002ffffffffffffffffffffffffffffffffffffffff"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"SWAP"},{"prim":"DROP"}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"invalid_view"}]},{"prim":"FAILWITH"}],[]]}]]}],[{"prim":"SWAP"},{"prim":"DROP"}]]}]]}]',
        collected_fa2_fees: 75628,
        collected_xtz_fees: '100412991',
        default_platform_fee: '13',
      },
      diffs: [
        {
          bigmap: 75627,
          path: 'auctions',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              token: {
                nat: '2',
                address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
              },
              bidder: 'tz1hrPrHQ1WncBaYTfEWta2LZzqGKVgdTukd',
              seller: 'tz1hrPrHQ1WncBaYTfEWta2LZzqGKVgdTukd',
              currency: null,
              bid_amount: '200000000',
              token_amount: '1',
              end_timestamp: '2022-01-13T08:29:21Z',
              require_verified: false,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [VersumCreateAuctionHandler]);

  expect(events).toStrictEqual([
    {
      id: '1cb21f2735b9973c948563eb34ccaf6a',
      type: 'VERSUM_CREATE_AUCTION',
      opid: '138299001',
      ophash: 'onupngKsa1ZTLSUC3Kf3whsAK482qbJuK3wNw4A4E2UthS45gSt',
      timestamp: '2022-01-13T02:29:50Z',
      level: 2026273,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '2',
      seller_address: 'tz1hrPrHQ1WncBaYTfEWta2LZzqGKVgdTukd',
      //artist_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      end_time: '2022-01-13T08:29:21Z',
      amount: '1',
      start_price: '200000000',
      auction_id: '1',
    },
  ]);
});
