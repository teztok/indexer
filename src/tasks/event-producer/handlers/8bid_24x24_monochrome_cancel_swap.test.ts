import EightbidCancelSwap24x24MonochromeEvent from './8bid_24x24_monochrome_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_24X24_MONOCHROME_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 187474659,
      level: 2199713,
      timestamp: '2022-03-16T00:46:54Z',
      block: 'BMUMg7Xp21gKBmc6e4WT8zaDvHqfLtFuzZiSmKq2rRfte4rKckm',
      hash: 'ooSSZ6R13zjEgXaAn2EZVst7EbAcsa5L3GPH3i3ZUnHh5z7XZPd',
      counter: 14678340,
      sender: {
        alias: 'mare-mon',
        address: 'tz1Tx4yqNmhVXFDrRTMfG5J1Wntb3JaAiQ93',
      },
      target: {
        address: 'KT1AHBvSo828QwscsjDjeUuep7MgApi8hXqA',
      },
      parameter: {
        entrypoint: 'cancelswap',
        value: '32',
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
        swap_id_count: '32',
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
            hash: 'expruMmeKnrirScRQGbUSn1iGNQP3y4VJ2E8FM7vfNGLqcsNftQtuG',
            key: '32',
            value: {
              nft_id: '6',
              seller: 'tz1Tx4yqNmhVXFDrRTMfG5J1Wntb3JaAiQ93',
              creator: 'tz1Tx4yqNmhVXFDrRTMfG5J1Wntb3JaAiQ93',
              payment: '5000000',
              swap_id: '32',
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

  const events = transactionsToEvents(transactions, [EightbidCancelSwap24x24MonochromeEvent]);

  expect(events).toStrictEqual([
    {
      id: '16a4fc791f16234aaaaea3d50148d1cd',
      type: '8BID_24X24_MONOCHROME_CANCEL_SWAP',
      opid: 187474659,
      timestamp: '2022-03-16T00:46:54Z',
      level: 2199713,
      fa2_address: 'KT1TR1ErEQPTdtaJ7hbvKTJSa1tsGnHGZTpf',
      seller_address: 'tz1Tx4yqNmhVXFDrRTMfG5J1Wntb3JaAiQ93',
      artist_address: 'tz1Tx4yqNmhVXFDrRTMfG5J1Wntb3JaAiQ93',
      token_id: '6',
      swap_id: '32',
    },
  ]);
});
