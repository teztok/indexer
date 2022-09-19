import EightscriboSwapHandler from './8scribo_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates 8SCRIBO_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 290073731,
      level: 2544868,
      timestamp: '2022-07-18T15:28:44Z',
      block: 'BLvuXfFw5BNs9wo1NmkL1KHm88ECiyQ8k9hoBJ11hMX1eFrXG4F',
      hash: 'oohe4RtcRi61Yz1xPxiMs5S96CtMq2Gj1aUvvyj66FQvRcBnsaF',
      counter: 13572729,
      sender: {
        address: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
      },
      target: {
        address: 'KT19vw7kh7dzTRxFUZNWu39773baauzNWtzj',
      },
      amount: 0,
      parameter: {
        entrypoint: 'swap',
        value: {
          fa2: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
          creator: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
          objkt_id: '1',
          royalties: '100',
          objkt_amount: '1',
          xtz_per_objkt: '10000000',
        },
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '25',
        swaps: 226249,
        counter: '1',
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
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              fa2: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
              issuer: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
              creator: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
              objkt_id: '1',
              royalties: '100',
              objkt_amount: '1',
              xtz_per_objkt: '10000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [EightscriboSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: '834af1b9b7f92530665ff28ec73c84ec',
      type: '8SCRIBO_SWAP',
      opid: '290073731',
      timestamp: '2022-07-18T15:28:44Z',
      level: 2544868,
      ophash: 'oohe4RtcRi61Yz1xPxiMs5S96CtMq2Gj1aUvvyj66FQvRcBnsaF',
      fa2_address: 'KT1Aq1umaV8gcDQmi4CLDk7KeKpoUjFQeg1B',
      token_id: '1',
      seller_address: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
      artist_address: 'tz1aM13yYWMvfxaBFd2mbkFu1mXsSseqB5qp',
      swap_id: '0',
      price: '10000000',
      royalties: '100',
      amount: '1',
    },
  ]);
});
