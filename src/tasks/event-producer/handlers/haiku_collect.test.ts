import HaikuCollectHandler from './haiku_collect';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HAIKU_COLLECT events', async () => {
  const transactions: Transactions = [
    {
      id: 290297301,
      level: 2545497,
      timestamp: '2022-07-18T20:46:14Z',
      block: 'BMEiVNeXWPJLfDPQnN8CVYYZ39kV6snR3SzUpGPJ5byRCwpfk4B',
      hash: 'oo5UKEqHb1w2YvyTvznsZAbxJ7VbhetQNF1pixPnAUvbo4SRuVg',
      counter: 12745275,
      sender: {
        alias: 'James_Alec_Hardy',
        address: 'tz1KvdAPtHVuSW1HtgNzZk3EVPdx6cK6BqQU',
      },
      target: {
        address: 'KT19vw7kh7dzTRxFUZNWu39773baauzNWtzj',
      },
      amount: 10000000,
      parameter: {
        entrypoint: 'collect',
        value: '0',
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
          action: 'update_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              fa2: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
              issuer: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
              creator: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
              objkt_id: '1',
              royalties: '100',
              objkt_amount: '0',
              xtz_per_objkt: '10000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [HaikuCollectHandler]);

  expect(events).toStrictEqual([
    {
      id: '8f797e03d81f34a87d914a8b31a98c82',
      type: 'HAIKU_COLLECT',
      implements: 'SALE',
      opid: 290297301,
      ophash: 'oo5UKEqHb1w2YvyTvznsZAbxJ7VbhetQNF1pixPnAUvbo4SRuVg',
      timestamp: '2022-07-18T20:46:14Z',
      level: 2545497,
      fa2_address: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
      token_id: '1',
      swap_id: '0',
      buyer_address: 'tz1KvdAPtHVuSW1HtgNzZk3EVPdx6cK6BqQU',
      seller_address: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
      artist_address: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
      price: '10000000',
    },
  ]);
});
