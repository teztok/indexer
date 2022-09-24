import TeiaSwapHandler from './teia_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates TEIA_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 165058185,
      level: 2078143,
      timestamp: '2022-01-31T16:11:58Z',
      block: 'BLgooNQreUiZeTJbPdjPmM6MPmADfCFjPbGMmeQNMuLnh557qiC',
      hash: 'ooXPdUMYcYUKi9VBbsYdyp4hPUfzgLVsts8aAUh6UqUT2RBhQW7',
      counter: 11464227,
      nonce: null,
      sender: {
        alias: 'Javier Gracia Carpio',
        address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      },
      target: {
        address: 'KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w',
      },
      parameter: {
        entrypoint: 'swap',
        value: {
          fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
          creator: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
          objkt_id: '531011',
          royalties: '200',
          objkt_amount: '10',
          xtz_per_objkt: '200000',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '25',
        swaps: 90366,
        counter: '2',
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
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              issuer: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
              creator: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
              objkt_id: '531011',
              royalties: '200',
              objkt_amount: '10',
              xtz_per_objkt: '200000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [TeiaSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'e0e7cf8e7fd29b13d31027cde56b9d13',
      type: 'TEIA_SWAP',
      opid: '165058185',
      timestamp: '2022-01-31T16:11:58Z',
      level: 2078143,
      ophash: 'ooXPdUMYcYUKi9VBbsYdyp4hPUfzgLVsts8aAUh6UqUT2RBhQW7',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '531011',
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      swap_id: '1',
      price: '200000',
      royalties: '200',
      amount: '10',
    },
  ]);
});
