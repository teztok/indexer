import HenCancelSwapHandler from './hen_cancel_swap';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HEN_CANCEL_SWAP events', async () => {
  const transactions: Transactions = [
    {
      id: 52568900,
      level: 1495010,
      timestamp: '2021-05-31T08:08:46Z',
      block: 'BLkpsMYFS3ueoDCXxhE6LBv2RuFBEU1je9XW5QHrb4bZWSfC5gX',
      hash: 'opWNB6fjWxNEPQ5k78RUYJdQSBdeukbuyPm9ZqDLaeHtrRJYT23',
      counter: 15453486,
      nonce: null,
      sender: {
        address: 'tz1X83DwmuDfx8Md5uDg72DNy1jPvJKbG8ay',
      },
      target: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      parameter: {
        entrypoint: 'cancel_swap',
        value: '179149',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        hdao: 'KT1AFA2mwNUMNd4SsujE1YYp29vd8BZejyKW',
        size: '0',
        objkt: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
        swaps: 523,
        curate: 'KT1TybhR7XraG75JFYKSrh7KnxukMBT5dor6',
        locked: true,
        genesis: '2021-04-15T02:09:41Z',
        manager: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
        swap_id: '207683',
        metadata: 521,
        objkt_id: '106908',
        royalties: 522,
      },
      diffs: [
        {
          bigmap: 523,
          path: 'swaps',
          action: 'remove_key',
          content: {
            hash: 'expruMtMeX8XUSMXZNqrvNEPuQwt9iDn2BsqXVSryzCD4uUQ433PoW',
            key: '179149',
            value: {
              issuer: 'tz1X83DwmuDfx8Md5uDg72DNy1jPvJKbG8ay',
              objkt_id: '95940',
              objkt_amount: '1',
              xtz_per_objkt: '6700000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [HenCancelSwapHandler]);

  expect(events).toStrictEqual([
    {
      id: 'f66f10d5516ecd9685fbab77190da758',
      type: 'HEN_CANCEL_SWAP',
      opid: 52568900,
      ophash: 'opWNB6fjWxNEPQ5k78RUYJdQSBdeukbuyPm9ZqDLaeHtrRJYT23',
      timestamp: '2021-05-31T08:08:46Z',
      level: 1495010,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      seller_address: 'tz1X83DwmuDfx8Md5uDg72DNy1jPvJKbG8ay',
      token_id: '95940',
      swap_id: '179149',
    },
  ]);
});
