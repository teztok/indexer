import TeiaCollectHandler from './teia_collect';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates TEIA_COLLECT events', async () => {
  const transactions: Transactions = [
    {
      id: 164940000,
      level: 2077595,
      timestamp: '2022-01-31T11:22:08Z',
      block: 'BLzNMAnsG5EXTQ4kUTJYQzspK3QssmRbttZV9D8DFq2rmoSAJSo',
      hash: 'ooRqvsxG3oUDNxxTSKGeZ32JhGCYysXCvYiwenEBoCLjQYvSgdr',
      counter: 25647210,
      nonce: null,
      sender: {
        address: 'tz1abTpHKkdo5YTM1DosZZVx9p8cjv4hMMTB',
      },
      target: {
        address: 'KT1PHubm9HtyQEJ4BBpMTVomq6mhbfNZ9z5w',
      },
      parameter: {
        entrypoint: 'collect',
        value: '0',
      },
      amount: 100000,
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
          action: 'update_key',
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

  const events = transactionsToEvents(transactions, [TeiaCollectHandler]);

  expect(events).toStrictEqual([
    {
      id: 'f30c224a44f260e03bcf4984a4c7cc40',
      type: 'TEIA_COLLECT',
      implements: 'SALE',
      opid: '164940000',
      ophash: 'ooRqvsxG3oUDNxxTSKGeZ32JhGCYysXCvYiwenEBoCLjQYvSgdr',
      timestamp: '2022-01-31T11:22:08Z',
      level: 2077595,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '531011',
      swap_id: '0',
      buyer_address: 'tz1abTpHKkdo5YTM1DosZZVx9p8cjv4hMMTB',
      seller_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      artist_address: 'tz1g6JRCpsEnD2BLiAzPNK3GBD1fKicV9rCx',
      price: '100000',
    },
  ]);
});
