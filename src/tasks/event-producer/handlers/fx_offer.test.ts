import FxOfferHandler from './fx_offer';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 108176851,
      level: 1853427,
      timestamp: '2021-11-11T02:31:38Z',
      block: 'BLJjV1oqmyWEqdUP5ERtAyPJZEEnsKEBnksLBP56X2Wdm6ZRsta',
      hash: 'opPSkU97R9eG2MdambtBCfBxZjY423YrTi8jgDUDQXHLk9QRBH5',
      counter: 24290205,
      nonce: null,
      sender: {
        alias: 'Hulumala',
        address: 'tz1LtsGqb8D5ss2SCWFGkKQfYTbgMEkS6hmD',
      },
      target: {
        alias: 'FXHASH Marketplace',
        address: 'KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9',
      },
      parameter: {
        entrypoint: 'offer',
        value: {
          price: '10000000',
          creator: 'tz1PoDdN2oyRyF6DA73zTWAWYhNL4UGr3Egj',
          objkt_id: '361',
          royalties: '100',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '25',
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        objkts: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
        offers: 22799,
        counter: '2',
        enabled: true,
        metadata: 22798,
        treasury: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 22799,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              price: '10000000',
              issuer: 'tz1LtsGqb8D5ss2SCWFGkKQfYTbgMEkS6hmD',
              creator: 'tz1PoDdN2oyRyF6DA73zTWAWYhNL4UGr3Egj',
              objkt_id: '361',
              royalties: '100',
              objkt_amount: '1',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: 'bab0f1a0f1431ca72c88ad054bf7b453',
      type: 'FX_OFFER',
      opid: '108176851',
      ophash: 'opPSkU97R9eG2MdambtBCfBxZjY423YrTi8jgDUDQXHLk9QRBH5',
      timestamp: '2021-11-11T02:31:38Z',
      level: 1853427,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '361',
      offer_id: '1',
      artist_address: 'tz1PoDdN2oyRyF6DA73zTWAWYhNL4UGr3Egj',
      seller_address: 'tz1LtsGqb8D5ss2SCWFGkKQfYTbgMEkS6hmD',
      royalties: '100',
      price: '10000000',
    },
  ]);
});
