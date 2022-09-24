import VersumMakeOfferHandler from './versum_make_offer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates VERSUM_MAKE_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 138091385,
      level: 2025153,
      timestamp: '2022-01-12T17:02:50Z',
      block: 'BKuLBG4Q4kyAqyuYHcvarAFW8HuwU5tj3Xy83Ma3d2tFDcjxhxR',
      hash: 'ooyFgRmoJ2SpuNAnF64KsLvrchaSX1G41zfxroJsLhEjw1TqFsA',
      counter: 32739436,
      nonce: null,
      sender: {
        address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
      },
      target: {
        alias: 'Versum Market',
        address: 'KT1GyRAJNdizF1nojQz62uGYkx8WFRUJm9X5',
      },
      parameter: {
        entrypoint: 'make_offer',
        value: {
          token: {
            nat: '0',
            address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
          },
          currency: null,
          price_in_nat: '0',
          token_amount: '1',
          require_verified: false,
        },
      },
      amount: 1000000,
      status: 'applied',
      hasInternals: false,
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
        swap_counter: '30',
        administrator: 'KT1XumYAxnPCrDiLU4XLNciZncExAzdEJrua',
        offer_counter: '2',
        auction_counter: '0',
        default_fa2_fee: '15',
        default_xtz_fee: '12',
        last_collect_op: {
          level: '2025106',
          source: 'tz1M7n1FpvfKhByTPhW3pwbQv67Ka5YV17BC',
        },
        royalty_adapter: 'KT1NffZ1mqqcXrwYY3ZNaAYxhYkyiDvvTZ3C',
        fee_per_platform: 75631,
        contract_registry: 'KT1BMWkNX3zRDH1a6A4PJ1uHjhAm44jhQvrB',
        admin_check_lambda:
          '[{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"False"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"EQ"},{"prim":"IF","args":[[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"PUSH","args":[{"prim":"bool"},{"prim":"True"}]}],[{"prim":"PUSH","args":[{"prim":"address"},{"bytes":"0002ffffffffffffffffffffffffffffffffffffffff"}]},{"prim":"DUP","args":[{"int":"3"}]},{"prim":"GET","args":[{"int":"4"}]},{"prim":"COMPARE"},{"prim":"GT"},{"prim":"IF","args":[[{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"DUG","args":[{"int":"5"}]},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"SWAP"},{"prim":"DROP"}],[{"prim":"DROP","args":[{"int":"2"}]},{"prim":"DUP"},{"prim":"GET","args":[{"int":"4"}]},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"CAR"},{"prim":"CDR"},{"prim":"SWAP"},{"prim":"DUP"},{"prim":"GET","args":[{"int":"3"}]},{"prim":"SWAP"},{"prim":"CAR"},{"prim":"CAR"},{"prim":"PAIR","args":[{"int":"3"}]},{"prim":"VIEW","args":[{"string":"is_admin_for"},{"prim":"bool"}]},{"prim":"IF_NONE","args":[[{"prim":"PUSH","args":[{"prim":"string"},{"string":"invalid_view"}]},{"prim":"FAILWITH"}],[]]}]]}],[{"prim":"SWAP"},{"prim":"DROP"}]]}]]}]',
        collected_fa2_fees: 75628,
        collected_xtz_fees: '20327023',
        default_platform_fee: '13',
      },
      diffs: [
        {
          bigmap: 75633,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              buyer: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
              token: {
                nat: '0',
                address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
              },
              currency: null,
              price_in_nat: '1000000',
              token_amount: '1',
              require_verified: false,
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [VersumMakeOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: '2ef9f4a190ec7f78b67d2e5d3e9d3cf0',
      type: 'VERSUM_MAKE_OFFER',
      opid: '138091385',
      ophash: 'ooyFgRmoJ2SpuNAnF64KsLvrchaSX1G41zfxroJsLhEjw1TqFsA',
      timestamp: '2022-01-12T17:02:50Z',
      level: 2025153,
      fa2_address: 'KT1LjmAdYQCLBjwv4S2oFkEzyHVkomAf5MrW',
      token_id: '0',
      offer_id: '1',
      buyer_address: 'tz1NBAh46Vyz7CdNLpnZ68jpN6nBFH4LSboy',
      //artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      //royalties: '200',
      price: '1000000',
      amount: '1',
    },
  ]);
});
