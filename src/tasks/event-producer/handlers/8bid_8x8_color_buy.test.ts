import EightbidBuy8x8ColorHandler from './8bid_8x8_color_buy';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_8X8_COLOR_BUY events', async () => {
  const transactions: Transactions = [
    {
      id: 176191154,
      level: 2134313,
      timestamp: '2022-02-20T15:38:00Z',
      block: 'BMVHYRUbSodkn5Cv4Ao66oWxt49h1ZNHD4Ezi2Y84LQaZoWDXmp',
      hash: 'ooPh82iDd78ghxcrn1xx2zpiWmPiYY9s57KTJ4cL1xCHfEk25W2',
      counter: 14230119,
      nonce: null,
      sender: {
        alias: 'HrtkAssh',
        address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      },
      target: {
        address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      },
      parameter: {
        entrypoint: 'buy',
        value: {
          swap_id: '4',
          nft_amount: '1',
          token_payment_value: '800000',
        },
      },
      amount: 800000,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        metadata: 113275,
        swap_list: 113273,
        market_fee: '20',
        admin_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
        is_paused_buy: false,
        swap_id_count: '4',
        is_paused_swap: false,
        address_swap_list: 113274,
        permited_nft_contracts: {
          KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp: '1',
        },
      },
      diffs: [
        {
          bigmap: 113273,
          path: 'swap_list',
          action: 'update_key',
          content: {
            hash: 'exprtkcv5vD1Ct4y91FvZFgXVHCxebKhorSVs8hFmXYgmGsEMo4qdp',
            key: '4',
            value: {
              nft_id: '6',
              seller: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
              creator: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
              payment: '800000',
              swap_id: '4',
              royalties: '10',
              nft_amount: '9',
              nft_total_amount: '10',
              nft_contract_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
            },
          },
        },
      ],
    },
    {
      id: 192461580,
      level: 2228994,
      timestamp: '2022-03-26T17:15:04Z',
      block: 'BLBuhysCe7dFZvTTc4ajbutA9kxMsi2x3yRxGZvmkrDDswEX8FF',
      hash: 'ooegL9EKWexJjoUQJ44u1FQKETBPF3ZVTrhc5T7YE89DNRWjVpa',
      counter: 6150458,
      sender: {
        address: 'tz1NATazbFfnypvM7q32nnFP6m7aDXrtCm1g',
      },
      target: {
        alias: '8bidou Marketplace',
        address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      },
      amount: 4000000,
      parameter: {
        entrypoint: 'buy',
        value: {
          swap_id: '7311',
          nft_amount: '2',
          token_payment_value: '4000000',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        metadata: 113275,
        swap_list: 113273,
        market_fee: '20',
        admin_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
        is_paused_buy: false,
        swap_id_count: '7313',
        is_paused_swap: false,
        address_swap_list: 113274,
        permited_nft_contracts: {
          KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp: '1',
        },
      },
      diffs: [
        {
          bigmap: 113273,
          path: 'swap_list',
          action: 'update_key',
          content: {
            hash: 'expruAYAQ9nvhcjjXPphJtxYMmzKV8CNTxMLXj1qiGBv6BmtFQhLWY',
            key: '7311',
            value: {
              nft_id: '5848',
              seller: 'tz1YdVkQjRzX5J6R3bWbf7byByxhKwWLTPwD',
              creator: 'tz1YdVkQjRzX5J6R3bWbf7byByxhKwWLTPwD',
              payment: '2000000',
              swap_id: '7311',
              royalties: '10',
              nft_amount: '1',
              nft_total_amount: '9',
              nft_contract_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidBuy8x8ColorHandler]);

  expect(events).toStrictEqual([
    {
      id: '20f7603ef608888fd5318fda54f923e4',
      type: '8BID_8X8_COLOR_BUY',
      implements: 'SALE',
      opid: '176191154',
      timestamp: '2022-02-20T15:38:00Z',
      level: 2134313,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '6',
      ophash: 'ooPh82iDd78ghxcrn1xx2zpiWmPiYY9s57KTJ4cL1xCHfEk25W2',

      swap_id: '4',
      buyer_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: '800000',
    },
    {
      artist_address: 'tz1YdVkQjRzX5J6R3bWbf7byByxhKwWLTPwD',
      buyer_address: 'tz1NATazbFfnypvM7q32nnFP6m7aDXrtCm1g',
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      id: 'd916c3ce6cab38be2d7a8eeb618d65e2',
      implements: 'SALE',
      level: 2228994,
      ophash: 'ooegL9EKWexJjoUQJ44u1FQKETBPF3ZVTrhc5T7YE89DNRWjVpa',
      opid: '192461580',
      price: '2000000',
      seller_address: 'tz1YdVkQjRzX5J6R3bWbf7byByxhKwWLTPwD',
      swap_id: '7311',
      timestamp: '2022-03-26T17:15:04Z',
      token_id: '5848',
      type: '8BID_8X8_COLOR_BUY',
    },
    {
      artist_address: 'tz1YdVkQjRzX5J6R3bWbf7byByxhKwWLTPwD',
      buyer_address: 'tz1NATazbFfnypvM7q32nnFP6m7aDXrtCm1g',
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      id: 'ca258d96dacd2a89127a4d67b1d70ac3',
      implements: 'SALE',
      level: 2228994,
      ophash: 'ooegL9EKWexJjoUQJ44u1FQKETBPF3ZVTrhc5T7YE89DNRWjVpa',
      opid: '192461580',
      price: '2000000',
      seller_address: 'tz1YdVkQjRzX5J6R3bWbf7byByxhKwWLTPwD',
      swap_id: '7311',
      timestamp: '2022-03-26T17:15:04Z',
      token_id: '5848',
      type: '8BID_8X8_COLOR_BUY',
    },
  ]);
});
