import EightbidSwap24x24ColorHandler from './8bid_24x24_color_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_24X24_COLOR_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 199018605,
      level: 2257178,
      timestamp: '2022-04-06T06:44:14Z',
      block: 'BLRbhAuvW3rQQaaBK1CdoNq8uXhuEWW6YPJR7bWWHKHyFEhZCAh',
      hash: 'ooMGjPwR4DcMHRjTAcj7FGHqgbH6ooZVFyRvCazuLNurGeS9q3n',
      counter: 57265883,
      sender: {
        address: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
      },
      target: {
        address: 'KT1QtnHR8p2hBjUhPRy9BCWgy7s7L578PA7N',
      },
      amount: 0,
      parameter: {
        entrypoint: 'swap',
        value: {
          nft_id: '448',
          seller: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
          creator: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
          payment: '1345000',
          swap_id: '0',
          royalties: '10',
          nft_amount: '4',
          nft_total_amount: '4',
          nft_contract_address: 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3',
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
        swap_id_count: '1',
        is_paused_swap: false,
        address_swap_list: 143422,
        permited_nft_contracts: {
          KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3: '1',
        },
      },
      diffs: [
        {
          bigmap: 143422,
          path: 'address_swap_list',
          action: 'add_key',
          content: {
            hash: 'exprv5sjEq5AgQJFH6tvEHSpKohhvgtDjHMcLXzxUvo1wmojpCrYuj',
            key: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
            value: ['1'],
          },
        },
        {
          bigmap: 143421,
          path: 'swap_list',
          action: 'add_key',
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
              nft_amount: '4',
              nft_total_amount: '4',
              nft_contract_address: 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidSwap24x24ColorHandler]);

  expect(events).toStrictEqual([
    {
      id: '965785e83ee0f59d944aa1398eb226aa',
      type: '8BID_24X24_COLOR_SWAP',
      opid: 199018605,
      ophash: 'ooMGjPwR4DcMHRjTAcj7FGHqgbH6ooZVFyRvCazuLNurGeS9q3n',
      timestamp: '2022-04-06T06:44:14Z',
      level: 2257178,
      fa2_address: 'KT1VikAWA8wQHLZgHoAGL7Z9kCjgbCEnvWA3',
      token_id: '448',

      seller_address: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
      artist_address: 'tz1NBRffyk3QPmNXAvRThDWNvgBDyYn8NSDe',
      price: '1345000',
      swap_id: '1',
      royalties: '100',
      amount: '4',
    },
  ]);
});
