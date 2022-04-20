import EightbidBuy24x24MonochromeHandler from './8bid_24x24_monochrome_buy';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_24X24_MONOCHROME_BUY events', async () => {
  const transactions: Transactions = [
    {
      id: 186213124,
      level: 2192305,
      timestamp: '2022-03-13T06:49:14Z',
      block: 'BM9wRvR9DekWUj7SayxZ1rKNUCedxD7bCvQ1RCaeGBJHXkjmS98',
      hash: 'ooVGg25ubei68nVR3MyR9qcuHfGy1mpb2xmZgFkW8Z1YqBhyzgC',
      counter: 14230187,
      sender: {
        alias: 'HrtkAssh',
        address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      },
      target: {
        address: 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA',
      },
      parameter: {
        entrypoint: 'buy',
        value: {
          swap_id: '5',
          nft_amount: '1',
          token_payment_value: '10000',
        },
      },
      amount: 10000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        metadata: 128204,
        swap_list: 128202,
        market_fee: '40',
        admin_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
        is_paused_buy: false,
        swap_id_count: '6',
        is_paused_swap: false,
        address_swap_list: 128203,
        permited_nft_contracts: {
          KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf: '1',
        },
      },
      diffs: [
        {
          bigmap: 128202,
          path: 'swap_list',
          action: 'update_key',
          content: {
            hash: 'exprtqoNj2hRg8PsPMaXLcy3dXjMM3B7nHKrRNqpfjbYpMbULbRj8k',
            key: '5',
            value: {
              nft_id: '4',
              seller: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
              creator: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
              payment: '10000',
              swap_id: '5',
              royalties: '6',
              nft_amount: '0',
              nft_total_amount: '1',
              nft_contract_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidBuy24x24MonochromeHandler]);

  expect(events).toStrictEqual([
    {
      id: '1e75eb32fcf32be7661130f5bdf9ff1a',
      type: '8BID_24X24_MONOCHROME_BUY',
      implements: 'SALE',
      opid: 186213124,
      ophash: 'ooVGg25ubei68nVR3MyR9qcuHfGy1mpb2xmZgFkW8Z1YqBhyzgC',
      timestamp: '2022-03-13T06:49:14Z',
      level: 2192305,
      fa2_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
      token_id: '4',

      swap_id: '5',
      buyer_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      seller_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      artist_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
      price: '10000',
      total_price: '10000',
      amount: '1',
    },
  ]);
});
