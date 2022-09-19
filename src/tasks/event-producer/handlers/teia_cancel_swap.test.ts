import TeiaCancelSwapHandler from './teia_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates TEIA_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 165053001,
      level: 2078122,
      timestamp: '2022-01-31T16:00:18Z',
      block: 'BM61P7Gz9VZTWc7kt9ndKVboBhcYiy3JbkcmSqF1eWMkxR5q9Mh',
      hash: 'opFbtPxYdC8e1boCPRgkEErDNmnLC3BXNDktr5BYwEw25tRGcqw',
      counter: 11464226,
      nonce: null,
      sender: {
        alias: 'Javier Gracia Carpio',
        address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      },
      target: {
        address: 'KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w',
      },
      parameter: {
        entrypoint: 'cancel_swap',
        value: '0',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '25',
        swaps: 90366,
        counter: '1',
        manager: 'KT1PKBTVmdxfgkFvSeNUQacYiEFsPBw16B4P',
        metadata: 90365,
        allowed_fa2s: 90364,
        swaps_paused: false,
        fee_recipient: 'KT1PKBTVmdxfgkFvSeNUQacYiEFsPBw16B4P',
        collects_paused: false,
        proposed_manager: null,
      },
      diffs: [
        {
          bigmap: 90366,
          path: 'swaps',
          action: 'remove_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              issuer: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
              creator: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
              objkt_id: '531011',
              royalties: '200',
              objkt_amount: '18',
              xtz_per_objkt: '100000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [TeiaCancelSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'a7da94f3d1c380ead7f2658b65da58d2',
      type: 'TEIA_CANCEL_SWAP',
      opid: '165053001',
      ophash: 'opFbtPxYdC8e1boCPRgkEErDNmnLC3BXNDktr5BYwEw25tRGcqw',
      timestamp: '2022-01-31T16:00:18Z',
      level: 2078122,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      token_id: '531011',
      swap_id: '0',
    },
  ]);
});
