import EightbidBuy24x24ColorHandler from './8bid_24x24_color_buy';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_24X24_COLOR_BUY events', async () => {
  const transactions: Transactions = [
    {
      id: 199210577,
      level: 2257639,
      timestamp: '2022-04-06T10:55:14Z',
      block: 'BKuZKchAxoFaQM7mVzvh5MSjDFSt9BYq47SgTEocQDqaNJPkkvj',
      hash: 'ooRzEy9irA5BQjDhrGU1SXfwabzvLgkvM7J35KwTFBCd3JHBcsM',
      counter: 17084346,
      sender: {
        address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
      },
      target: {
        address: 'KT1QtnHR8p2hBjUhPRy9BCWgy7s7L578PA7N',
      },
      amount: 1345000,
      parameter: {
        entrypoint: 'buy',
        value: {
          swap_id: '1',
          nft_amount: '1',
          token_payment_value: '1345000',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        metadata: 143423,
        swap_list: 143421,
        market_fee: '40',
        admin_address: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
        is_paused_buy: false,
        swap_id_count: '2',
        is_paused_swap: false,
        address_swap_list: 143422,
        permited_nft_contracts: {
          KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3: '1',
        },
      },
      diffs: [
        {
          bigmap: 143421,
          path: 'swap_list',
          action: 'update_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              nft_id: '448',
              seller: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
              creator: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
              payment: '1345000',
              swap_id: '1',
              royalties: '10',
              nft_amount: '3',
              nft_total_amount: '4',
              nft_contract_address: 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidBuy24x24ColorHandler]);

  expect(events).toStrictEqual([
    {
      id: '40e7ace5c5b0cce0e66aaa0953e8edf8',
      type: '8BID_24X24_COLOR_BUY',
      implements: 'SALE',
      opid: 199210577,
      ophash: 'ooRzEy9irA5BQjDhrGU1SXfwabzvLgkvM7J35KwTFBCd3JHBcsM',
      timestamp: '2022-04-06T10:55:14Z',
      level: 2257639,
      fa2_address: 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3',
      token_id: '448',

      swap_id: '1',
      buyer_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
      seller_address: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
      artist_address: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
      price: '1345000',
      total_price: '1345000',
      amount: '1',
    },
  ]);
});
