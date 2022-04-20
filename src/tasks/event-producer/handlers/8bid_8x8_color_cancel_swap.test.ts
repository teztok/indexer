import EightbidCancelSwap8x8ColorEvent from './8bid_8x8_color_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8BID_8X8_COLOR_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 180039728,
      level: 2155678,
      timestamp: '2022-02-28T05:34:04Z',
      block: 'BLZqs2YxK8aQb2gFrMeuYSw34jjdzvahCFwQQ7Cs315VoqqEAPZ',
      hash: 'opNKCTs8UWiMphKdA3ibUMx2zKtiM1G63MVJHSAfoxSnVRqpE6Y',
      counter: 17084239,
      sender: {
        address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
      },
      target: {
        address: 'KT1BvWGFENd4CXW5F3u4n31xKfJhmBGipoqF',
      },
      parameter: {
        entrypoint: 'cancelswap',
        value: '86',
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
        swap_id_count: '225',
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
            hash: 'exprtveUse8kkMEtK9RH86JPuDrXmyresFYhPbxsuHcXeqbQxSFy77',
            key: '86',
            value: {
              nft_id: '21',
              seller: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
              creator: 'tz2WNxPcE7JZhAFfqGEHkMtd2gcHaeiJKMWE',
              payment: '10000000',
              swap_id: '86',
              royalties: '10',
              nft_amount: '0',
              nft_total_amount: '1',
              nft_contract_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [EightbidCancelSwap8x8ColorEvent]);

  expect(events).toStrictEqual([
    {
      id: '17a9522f79b6f0e8becc21310683edba',
      type: '8BID_8X8_COLOR_CANCEL_SWAP',
      opid: 180039728,
      ophash: 'opNKCTs8UWiMphKdA3ibUMx2zKtiM1G63MVJHSAfoxSnVRqpE6Y',
      timestamp: '2022-02-28T05:34:04Z',
      level: 2155678,
      fa2_address: 'KT1MxDwChiDwd6WBVs24g1NjERUoK622ZEFp',
      seller_address: 'tz1MeusHSyoorMrxixCWfsn8k7jYg597rsxq',
      artist_address: 'tz2WNxPcE7JZhAFfqGEHkMtd2gcHaeiJKMWE',
      token_id: '21',
      swap_id: '86',
    },
  ]);
});
