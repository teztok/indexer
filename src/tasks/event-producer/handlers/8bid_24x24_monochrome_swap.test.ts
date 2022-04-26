import EightbidSwap24x24MonochromeHandler from './8bid_24x24_monochrome_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_24X24_MONOCHROME_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 185961001,
      level: 2190712,
      timestamp: '2022-03-12T17:19:54Z',
      block: 'BM2KGdaEmdgsGJ12ci74nvGWNjePbnYwBR7N7XwtiDXCbiMV9b3',
      hash: 'onfPZkC1uzuEjPCMk41GchS89QLNKvNpNnf8FZmrEQGmuu9PG8D',
      counter: 14230175,
      nonce: null,
      sender: {
        alias: 'HrtkAssh',
        address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      },
      target: {
        address: 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA',
      },
      parameter: {
        entrypoint: 'swap',
        value: {
          nft_id: '2',
          seller: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
          creator: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
          payment: '40000',
          swap_id: '0',
          royalties: '6',
          nft_amount: '2',
          nft_total_amount: '2',
          nft_contract_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        metadata: 128204,
        swap_list: 128202,
        market_fee: '40',
        admin_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
        is_paused_buy: false,
        swap_id_count: '2',
        is_paused_swap: false,
        address_swap_list: 128203,
        permited_nft_contracts: {
          KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf: '1',
        },
      },
      diffs: [
        {
          bigmap: 128203,
          path: 'address_swap_list',
          action: 'update_key',
          content: {
            hash: 'exprudxeoAG3ibHChRxvHtPxp4uwfp19ibapTVRbzusbVai6VG4hU3',
            key: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
            value: ['2', '1'],
          },
        },
        {
          bigmap: 128202,
          path: 'swap_list',
          action: 'add_key',
          content: {
            hash: 'expruDuAZnFKqmLoisJqUGqrNzXTvw7PJM2rYk97JErM5FHCerQqgn',
            key: '2',
            value: {
              nft_id: '2',
              seller: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
              creator: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
              payment: '40000',
              swap_id: '2',
              royalties: '6',
              nft_amount: '2',
              nft_total_amount: '2',
              nft_contract_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidSwap24x24MonochromeHandler]);

  expect(events).toStrictEqual([
    {
      id: 'dee42ba9b65774c800d4c3e02093824c',
      type: '8BID_24X24_MONOCHROME_SWAP',
      opid: 185961001,
      ophash: 'onfPZkC1uzuEjPCMk41GchS89QLNKvNpNnf8FZmrEQGmuu9PG8D',
      timestamp: '2022-03-12T17:19:54Z',
      level: 2190712,
      fa2_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
      token_id: '2',

      seller_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      artist_address: 'tz1c6Uibt7Vjr7MEFEQpohEa2f311KxZyJoZ',
      price: '40000',
      swap_id: '2',
      royalties: '60',
      amount: '2',
    },
  ]);
});
