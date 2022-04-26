import VersumCollectSwapHandler from './versum_collect_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_COLLECT_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 137973176,
      level: 2024523,
      timestamp: '2022-01-12T11:46:40Z',
      block: 'BLeEnaeDZhBxXpmeAjL624sLA4RNuKbvQf3V4aHQdTYGeQZfzNC',
      hash: 'opLGZbDreaAqJFCSxsxh8FiyEJK9h4ymhPWBbitydF3Qxgr2Bbr',
      counter: 11841070,
      nonce: null,
      sender: {
        alias: 'bors__nft',
        address: 'tz1fb6jz7rh4H7AojLShvhiXKaSNDyvkH7sM',
      },
      target: {
        alias: 'Versum Market',
        address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      },
      parameter: {
        entrypoint: 'collect_swap',
        value: {
          amount: '1',
          swap_id: '1',
        },
      },
      amount: 10000000,
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
        swap_counter: '4',
        administrator: 'KT1XumYAxnPCrDiLU4XLNciZncExAzdEJrua',
        offer_counter: '0',
        auction_counter: '0',
        default_fa2_fee: '15',
        default_xtz_fee: '12',
        last_collect_op: {
          level: '2024523',
          source: 'tz1fb6jz7rh4H7AojLShvhiXKaSNDyvkH7sM',
        },
        royalty_adapter: 'KT1NffZ1mqqcXrwYY3ZNaAYxhYkyiDvvTZ3C',
        fee_per_platform: 75631,
        contract_registry: 'KT1BMWkNX3zRDH1a6A4PJ1uHjhAm44jhQvrB',
        admin_check_lambda:
          '[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"PUSH","args":[{"prim":"address"},{"bytes":"0002ffffffffffffffffffffffffffffffffffffffff"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"SWAP"},{"prim":"DROP"}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"invalid_view"}]},{"prim":"FAILWITH"}],[]]}]]}],[{"prim":"SWAP"},{"prim":"DROP"}]]}]]}]',
        collected_fa2_fees: 75628,
        collected_xtz_fees: '500000',
        default_platform_fee: '13',
      },
      diffs: [
        {
          bigmap: 75634,
          path: 'swaps',
          action: 'update_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              token: {
                nat: '2',
                address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
              },
              seller: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
              currency: null,
              burn_on_end: false,
              ending_time: null,
              require_verified: false,
              token_left_amount: '18',
              collect_max_per_tx: '0',
              token_start_amount: '20',
              ending_price_in_nat: '10000000',
              starting_price_in_nat: '10000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [VersumCollectSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'c699bdec549bc6624565d0e80d894b5a',
      type: 'VERSUM_COLLECT_SWAP',
      implements: 'SALE',
      opid: 137973176,
      ophash: 'opLGZbDreaAqJFCSxsxh8FiyEJK9h4ymhPWBbitydF3Qxgr2Bbr',
      timestamp: '2022-01-12T11:46:40Z',
      level: 2024523,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '2',
      swap_id: '1',
      buyer_address: 'tz1fb6jz7rh4H7AojLShvhiXKaSNDyvkH7sM',
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      //artist_address: 'tz2TG7nYDasJzWPrLgbk7f3D4uyHo2ADdWgB',
      price: '10000000',
      amount: '1',
    },
  ]);
});
