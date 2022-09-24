import VersumSwapHandler from './versum_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 137968317,
      level: 2024493,
      timestamp: '2022-01-12T11:31:40Z',
      block: 'BKn23i8Jgk74iqMSdzcS5MYhXh3SSTWjCwLaBgqXGXsWFJmfXLB',
      hash: 'oohAGvd43tRkbn29GT8CCJhoudi5h1yfoGg8XjTs5NYiT5JmoxV',
      counter: 11859811,
      nonce: null,
      sender: {
        alias: 'Chris Randall',
        address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      },
      target: {
        alias: 'Versum Market',
        address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      },
      parameter: {
        entrypoint: 'create_swap',
        value: {
          token: {
            nat: '2',
            address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
          },
          currency: null,
          burn_on_end: false,
          ending_time: '2022-01-13T11:31:40Z',
          token_amount: '19',
          require_verified: false,
          collect_max_per_tx: '0',
          ending_price_in_nat: '5000000',
          starting_price_in_nat: '5000000',
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
        swap_counter: '1',
        administrator: 'KT1XumYAxnPCrDiLU4XLNciZncExAzdEJrua',
        offer_counter: '0',
        auction_counter: '0',
        default_fa2_fee: '15',
        default_xtz_fee: '12',
        last_collect_op: {
          level: '0',
          source: 'tz1burnburnburnburnburnburnburjAYjjX',
        },
        royalty_adapter: 'KT1NffZ1mqqcXrwYY3ZNaAYxhYkyiDvvTZ3C',
        fee_per_platform: 75631,
        contract_registry: 'KT1BMWkNX3zRDH1a6A4PJ1uHjhAm44jhQvrB',
        admin_check_lambda:
          '[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"PUSH","args":[{"prim":"address"},{"bytes":"0002ffffffffffffffffffffffffffffffffffffffff"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"SWAP"},{"prim":"DROP"}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"invalid_view"}]},{"prim":"FAILWITH"}],[]]}]]}],[{"prim":"SWAP"},{"prim":"DROP"}]]}]]}]',
        collected_fa2_fees: 75628,
        collected_xtz_fees: '0',
        default_platform_fee: '13',
      },
      diffs: [
        {
          bigmap: 75634,
          path: 'swaps',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              token: {
                nat: '2',
                address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
              },
              seller: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
              currency: null,
              burn_on_end: false,
              ending_time: '2022-01-13T11:31:40Z',
              require_verified: false,
              token_left_amount: '19',
              collect_max_per_tx: '0',
              token_start_amount: '19',
              ending_price_in_nat: '5000000',
              starting_price_in_nat: '5000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [VersumSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: '64c3bf2a54911d5f7c5e204df7b84aa5',
      type: 'VERSUM_SWAP',
      opid: '137968317',
      ophash: 'oohAGvd43tRkbn29GT8CCJhoudi5h1yfoGg8XjTs5NYiT5JmoxV',
      timestamp: '2022-01-12T11:31:40Z',
      level: 2024493,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '2',
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      //artist_address: 'tz1c8riGC9WHnrncStfM5jwKyhUwwRfb31hQ', // TODO: add this
      swap_id: '0',
      start_price: '5000000',
      end_price: '5000000',
      amount: '19',
      end_time: '2022-01-13T11:31:40Z',
      burn_on_end: false,
    },
  ]);
});
