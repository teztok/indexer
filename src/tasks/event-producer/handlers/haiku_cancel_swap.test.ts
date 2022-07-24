import HaikuCancelSwapHandler from './haiku_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HAIKU_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 290290961,
      level: 2545478,
      timestamp: '2022-07-18T20:36:44Z',
      block: 'BM9yUUb5RZYVNbCeyhgA2PNCpYeSX2C7iKFCCJ3n33N4icHTn8J',
      hash: 'onie5a6v1eYrhgR6Vo8GYHDGpFpUvf6FgtUBmw4NDNKzYKTwPV3',
      counter: 12227074,
      sender: {
        alias: 'Theo Horsmeier',
        address: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
      },
      target: {
        address: 'KT19vw7kh7dzTRxFUZNWu39773baauzNWtzj',
      },
      amount: 0,
      parameter: {
        entrypoint: 'cancel_swap',
        value: '1',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '25',
        swaps: 226249,
        counter: '2',
        manager: 'tz1g16trvKvxAdmGoSk9Sbjg9XiHEVMoLJxu',
        metadata: 226248,
        allowed_fa2s: 226247,
        swaps_paused: false,
        fee_recipient: 'tz1ZskdkdyKKXVVfgtKrXaroUux5wsrhBuqr',
        collects_paused: false,
        proposed_manager: null,
      },
      diffs: [
        {
          bigmap: 226249,
          path: 'swaps',
          action: 'remove_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              fa2: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
              issuer: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
              creator: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
              objkt_id: '3',
              royalties: '100',
              objkt_amount: '1',
              xtz_per_objkt: '5000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [HaikuCancelSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'd09bc009e5b0279a6b81f4ad0867fba7',
      type: 'HAIKU_CANCEL_SWAP',
      opid: 290290961,
      ophash: 'onie5a6v1eYrhgR6Vo8GYHDGpFpUvf6FgtUBmw4NDNKzYKTwPV3',
      timestamp: '2022-07-18T20:36:44Z',
      level: 2545478,
      fa2_address: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
      seller_address: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
      artist_address: 'tz1ZdjR3JnLDgk7gDMWA64cLrKv5ujrSKF28',
      token_id: '3',
      swap_id: '1',
    },
  ]);
});
