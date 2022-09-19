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
      nonce: null,
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
    {
      id: 192274302,
      level: 2228335,
      timestamp: '2022-03-26T11:35:04Z',
      block: 'BKtorU3cfQ5SP1sXX7WyLRSUBBWFx8RNrLLFc6wpMb7rZq9e5dG',
      hash: 'opU76dZfuAYp5yuRHt3kDR5q9wgeqpmfafaKfXccZEMjhs1Y8i4',
      counter: 6150420,
      sender: {
        address: 'tz1NATazbFfnypvM7q32nnFP6m7aDXrtCm1g',
      },
      target: {
        alias: '8bidou GIN-EN Monochrome On-chain Marketplace',
        address: 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA',
      },
      amount: 1320000,
      parameter: {
        entrypoint: 'buy',
        value: {
          swap_id: '19',
          nft_amount: '2',
          token_payment_value: '1320000',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        metadata: 128204,
        swap_list: 128202,
        market_fee: '40',
        admin_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
        is_paused_buy: false,
        swap_id_count: '816',
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
            hash: 'exprtuTKafuqW7qHC8HYtRRZvLRZBA5EgxPpJED3ARXg5x47Ze9Wtz',
            key: '19',
            value: {
              nft_id: '15',
              seller: 'tz1Rscy11rcnD6eQzFns4KnKprg8j6Lk6cro',
              creator: 'tz1Rscy11rcnD6eQzFns4KnKprg8j6Lk6cro',
              payment: '660000',
              swap_id: '19',
              royalties: '6',
              nft_amount: '0',
              nft_total_amount: '6',
              nft_contract_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidBuy24x24MonochromeHandler]);

  expect(events).toStrictEqual([
    {
      id: '9520de88d0b2f2733e7cd780ac157e1b',
      type: '8BID_24X24_MONOCHROME_BUY',
      implements: 'SALE',
      opid: '186213124',
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
    },
    {
      id: '6af31911a5fa0753e7acab0ae37f1ed5',
      type: '8BID_24X24_MONOCHROME_BUY',
      implements: 'SALE',
      opid: '192274302',
      ophash: 'opU76dZfuAYp5yuRHt3kDR5q9wgeqpmfafaKfXccZEMjhs1Y8i4',
      timestamp: '2022-03-26T11:35:04Z',
      level: 2228335,
      fa2_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
      token_id: '15',
      swap_id: '19',
      buyer_address: 'tz1NATazbFfnypvM7q32nnFP6m7aDXrtCm1g',
      seller_address: 'tz1Rscy11rcnD6eQzFns4KnKprg8j6Lk6cro',
      artist_address: 'tz1Rscy11rcnD6eQzFns4KnKprg8j6Lk6cro',
      price: '660000',
    },
    {
      id: 'bd66dc7a3a9742dfd992495fbe90b486',
      type: '8BID_24X24_MONOCHROME_BUY',
      implements: 'SALE',
      opid: '192274302',
      ophash: 'opU76dZfuAYp5yuRHt3kDR5q9wgeqpmfafaKfXccZEMjhs1Y8i4',
      timestamp: '2022-03-26T11:35:04Z',
      level: 2228335,
      fa2_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
      token_id: '15',
      swap_id: '19',
      buyer_address: 'tz1NATazbFfnypvM7q32nnFP6m7aDXrtCm1g',
      seller_address: 'tz1Rscy11rcnD6eQzFns4KnKprg8j6Lk6cro',
      artist_address: 'tz1Rscy11rcnD6eQzFns4KnKprg8j6Lk6cro',
      price: '660000',
    },
  ]);
});
