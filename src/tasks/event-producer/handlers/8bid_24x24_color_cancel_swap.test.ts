import EightbidCancelSwap24x24ColorEvent from './8bid_24x24_color_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_24X24_COLOR_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 223046706,
      level: 2335828,
      timestamp: '2022-05-04T09:30:44Z',
      block: 'BKmKYp25g1ELV4zkbY87399mx82J8DDBr8R6ocn9P2FST5jJcsh',
      hash: 'ooWMSPQ4SQJVA7chP9McVkX6vcRFvQnojHDgyPKurUJN12Trpey',
      counter: 17084418,
      sender: {
        address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
      },
      target: {
        address: 'KT1QtnHR8p2hBjUhPRy9BCWgy7s7L578PA7N',
      },
      amount: 0,
      parameter: {
        entrypoint: 'cancelswap',
        value: '3',
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
        swap_id_count: '11',
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
            hash: 'exprujyHLX2vacVy6AcFmAt5K3Y93aMtccrbNtcsCRik6fjxR8wL6x',
            key: '3',
            value: {
              nft_id: '448',
              seller: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
              creator: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
              payment: '500000',
              swap_id: '3',
              royalties: '10',
              nft_amount: '0',
              nft_total_amount: '1',
              nft_contract_address: 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidCancelSwap24x24ColorEvent]);

  expect(events).toStrictEqual([
    {
      id: '0062a7d617c944267ba567b48e916692',
      type: '8BID_24X24_COLOR_CANCEL_SWAP',
      opid: '223046706',
      ophash: 'ooWMSPQ4SQJVA7chP9McVkX6vcRFvQnojHDgyPKurUJN12Trpey',
      timestamp: '2022-05-04T09:30:44Z',
      level: 2335828,
      fa2_address: 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3',
      seller_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
      artist_address: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
      token_id: '448',
      swap_id: '3',
    },
  ]);
});
