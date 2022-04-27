import VersumCancelOfferHandler from './versum_cancel_offer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_CANCEL_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 138283703,
      level: 2026173,
      timestamp: '2022-01-13T01:39:50Z',
      block: 'BKiYvTsApxH8AYwWVfuojAFKAUMdmeEeirjyec8BEh5DNoT4W9K',
      hash: 'opTywBtgtkXmwtaA6Upxg3FCd4Bt1myYQruo3dk31qshH11kmJ4',
      counter: 12783162,
      nonce: null,
      sender: {
        alias: 'chriswallace',
        address: 'tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU',
      },
      target: {
        alias: 'Versum Market',
        address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      },
      parameter: {
        entrypoint: 'cancel_offer',
        value: '23',
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
        swap_counter: '43',
        administrator: 'KT1XumYAxnPCrDiLU4XLNciZncExAzdEJrua',
        offer_counter: '32',
        auction_counter: '0',
        default_fa2_fee: '15',
        default_xtz_fee: '12',
        last_collect_op: {
          level: '2026172',
          source: 'tz1gmrBAebCWi253y8ivoEZrGAiBmDTv6mn6',
        },
        royalty_adapter: 'KT1NffZ1mqqcXrwYY3ZNaAYxhYkyiDvvTZ3C',
        fee_per_platform: 75631,
        contract_registry: 'KT1BMWkNX3zRDH1a6A4PJ1uHjhAm44jhQvrB',
        admin_check_lambda:
          '[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"PUSH","args":[{"prim":"address"},{"bytes":"0002ffffffffffffffffffffffffffffffffffffffff"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"SWAP"},{"prim":"DROP"}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"invalid_view"}]},{"prim":"FAILWITH"}],[]]}]]}],[{"prim":"SWAP"},{"prim":"DROP"}]]}]]}]',
        collected_fa2_fees: 75628,
        collected_xtz_fees: '55416491',
        default_platform_fee: '13',
      },
      diffs: [
        {
          bigmap: 75633,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'expruoaYeEtaYFbYVBP37vVp4BxHpVkqrAP6r4fJ8oUQEkzDxyC4wA',
            key: '23',
            value: {
              buyer: 'tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU',
              token: {
                nat: '18',
                address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
              },
              currency: null,
              price_in_nat: '50000000',
              token_amount: '1',
              require_verified: false,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [VersumCancelOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: 'd58e1176b647844d9ddccc6b0e6bbced',
      type: 'VERSUM_CANCEL_OFFER',
      opid: 138283703,
      ophash: 'opTywBtgtkXmwtaA6Upxg3FCd4Bt1myYQruo3dk31qshH11kmJ4',
      timestamp: '2022-01-13T01:39:50Z',
      level: 2026173,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '18',
      offer_id: '23',
      buyer_address: 'tz1Ym9Ued9v2N2wwsrtQ52HRGGn7qDmzuUZU',
      //seller_address: 'tz1ibTknNagJCgQPgcbPvJhpSyS5vxgdyFt4',
      //artist_address: 'tz2TG7nYDasJzWPrLgbk7f3D4uyHo2ADdWgB',
      price: '50000000',
      amount: '1',
    },
  ]);
});
