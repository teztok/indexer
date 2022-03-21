import VersumCancelSwapHandler from './versum_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 137968798,
      level: 2024496,
      timestamp: '2022-01-12T11:33:10Z',
      block: 'BKqNtXmQR4MjCYiGiC5eJv7BN6VgLeZ1bHCahoP7WDekfKmZo87',
      hash: 'oovMV5TDcmGX98NDHP9EC96VyQNhvb75s9SYjhk6YXFXpgCzZrV',
      counter: 11859812,
      sender: {
        alias: 'Chris Randall',
        address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      },
      target: {
        alias: 'Versum Market',
        address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      },
      parameter: {
        entrypoint: 'cancel_swap',
        value: '0',
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
          action: 'remove_key',
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
              ending_time: null,
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

  const events = transactionsToEvents(transactions, [VersumCancelSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: '574dc83f1eee4120ac0318be9b88f53f',
      type: 'VERSUM_CANCEL_SWAP',
      opid: 137968798,
      timestamp: '2022-01-12T11:33:10Z',
      level: 2024496,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      //artist_address: 'tz1ZAzUws7fduRQNHRKsaxnq8sKoM1RbdgDq',
      token_id: '2',
      swap_id: '0',
    },
  ]);
});
