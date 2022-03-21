import VersumAcceptOfferHandler from './versum_accept_offer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_ACCEPT_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 138277717,
      level: 2026133,
      timestamp: '2022-01-13T01:19:50Z',
      block: 'BMXjvS7DJnbpHWWygNkS4agJmKj1VasvQaFv6EwptiADfABPctg',
      hash: 'opAhBB1X3yqK8F77GxatkxY2ghEbQXpZrutcf3jHxaaR1zf5XbG',
      counter: 11372518,
      sender: {
        alias: 'mumu the stan',
        address: 'tz1cALmpTf7EeeSBXHAX2rcnR4WAP8tSWkt6',
      },
      target: {
        alias: 'Versum Market',
        address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      },
      parameter: {
        entrypoint: 'accept_offer',
        value: '8',
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
        swap_counter: '42',
        administrator: 'KT1XumYAxnPCrDiLU4XLNciZncExAzdEJrua',
        offer_counter: '12',
        auction_counter: '0',
        default_fa2_fee: '15',
        default_xtz_fee: '12',
        last_collect_op: {
          level: '2026132',
          source: 'tz1XeEyDyk3EKLBg128NNMpTXB4bur5YMjnD',
        },
        royalty_adapter: 'KT1NffZ1mqqcXrwYY3ZNaAYxhYkyiDvvTZ3C',
        fee_per_platform: 75631,
        contract_registry: 'KT1BMWkNX3zRDH1a6A4PJ1uHjhAm44jhQvrB',
        admin_check_lambda:
          '[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"PUSH","args":[{"prim":"address"},{"bytes":"0002ffffffffffffffffffffffffffffffffffffffff"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"SWAP"},{"prim":"DROP"}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"invalid_view"}]},{"prim":"FAILWITH"}],[]]}]]}],[{"prim":"SWAP"},{"prim":"DROP"}]]}]]}]',
        collected_fa2_fees: 75628,
        collected_xtz_fees: '31993746',
        default_platform_fee: '13',
      },
      diffs: [
        {
          bigmap: 75633,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'exprtweQBK1emmeg9Q84E7YwE9c8AQrvn88c8SrG2JgjBCYkC1AWx5',
            key: '8',
            value: {
              buyer: 'tz1YinhT4JT3ngF9pMYBySNVrWDYhLNEfsYE',
              token: {
                nat: '8',
                address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
              },
              currency: null,
              price_in_nat: '15000000',
              token_amount: '1',
              require_verified: false,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [VersumAcceptOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: '802cd42c75cea1519d22232fe1bd27f0',
      type: 'VERSUM_ACCEPT_OFFER',
      implements: 'SALE',
      opid: 138277717,
      timestamp: '2022-01-13T01:19:50Z',
      level: 2026133,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '8',
      offer_id: '8',
      buyer_address: 'tz1YinhT4JT3ngF9pMYBySNVrWDYhLNEfsYE',
      seller_address: 'tz1cALmpTf7EeeSBXHAX2rcnR4WAP8tSWkt6',
      price: '15000000',
      amount: '1',
    },
  ]);
});
