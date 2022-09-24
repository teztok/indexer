import EightbidSwap8x8ColorHandler from './8bid_8x8_color_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_8X8_COLOR_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 176179849,
      level: 2134259,
      timestamp: '2022-02-20T15:11:00Z',
      block: 'BLMJhNy9RXendzaVDcQNBwvmDZ1gw7HJyv7WfL4Vi33nNcBgvbf',
      hash: 'opP8yzCTfFhtupychoashg3ncWfmNRrYUKcaYDXykSvxjBH4eHB',
      counter: 21441756,
      nonce: null,
      sender: {
        address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      },
      target: {
        address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      },
      parameter: {
        entrypoint: 'swap',
        value: {
          nft_id: '5',
          seller: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
          creator: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
          payment: '800000',
          swap_id: '0',
          royalties: '10',
          nft_amount: '10',
          nft_total_amount: '10',
          nft_contract_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        metadata: 113275,
        swap_list: 113273,
        market_fee: '20',
        admin_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
        is_paused_buy: false,
        swap_id_count: '3',
        is_paused_swap: false,
        address_swap_list: 113274,
        permited_nft_contracts: {
          KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp: '1',
        },
      },
      diffs: [
        {
          bigmap: 113274,
          path: 'address_swap_list',
          action: 'add_key',
          content: {
            hash: 'expruhhP76bV1bVYC19NzJjMtEcmiwPe9zJ5HeMkRh98vPCL1QgA7p',
            key: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
            value: ['3'],
          },
        },
        {
          bigmap: 113273,
          path: 'swap_list',
          action: 'add_key',
          content: {
            hash: 'exprujyHLX2vacVy6AcFmAt5K3Y93aMtccrbNtcsCRik6fjxR8wL6x',
            key: '3',
            value: {
              nft_id: '5',
              seller: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
              creator: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
              payment: '800000',
              swap_id: '3',
              royalties: '10',
              nft_amount: '10',
              nft_total_amount: '10',
              nft_contract_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidSwap8x8ColorHandler]);

  expect(events).toStrictEqual([
    {
      id: '0f1fee30447c591954e030d6f016c796',
      type: '8BID_8X8_COLOR_SWAP',
      opid: '176179849',
      ophash: 'opP8yzCTfFhtupychoashg3ncWfmNRrYUKcaYDXykSvxjBH4eHB',
      timestamp: '2022-02-20T15:11:00Z',
      level: 2134259,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      token_id: '5',

      seller_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      artist_address: 'tz2QhmKtUWRyArfaqfBedvVdidgKpCcckMXV',
      price: '800000',
      swap_id: '3',
      royalties: '100',
      amount: '10',
    },
  ]);
});
