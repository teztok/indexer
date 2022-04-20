import HenCollectHandler from './hen_collect';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HEN_COLLECT events', async () => {
  const transactions: Transactions = [
    {
      id: 52568902,
      level: 1495010,
      timestamp: '2021-05-31T08:08:46Z',
      block: 'BLkpsMYFS3ueoDCXxhE6LBv2RuFBEU1je9XW5QHrb4bZWSfC5gX',
      hash: 'opV2QaCSsGMJ9xwBh9jyNBy4mMFVvtyy7Jf7pYky4qAFprmeoN7',
      counter: 12980780,
      sender: {
        alias: 'NFTweak',
        address: 'tz1XGTjeqid5naxSviH3CBcfz944qHM6bNeD',
      },
      target: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      parameter: {
        entrypoint: 'collect',
        value: {
          swap_id: '207654',
          objkt_amount: '1',
        },
      },
      amount: 11000000,
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
            hash: 'expru1xKcpGujbh1vU9aCxcmY9mPfbnZboKtrtU7ZHL1NRhHqNDRP1',
            key: '207654',
            value: {
              issuer: 'tz1RDuX3MzvC8adUjXKfh2roCtprFUXpVKVD',
              objkt_id: '106838',
              objkt_amount: '1',
              xtz_per_objkt: '11000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [HenCollectHandler]);

  expect(events).toStrictEqual([
    {
      id: 'faa13edecca7cc1294fd1432ad0cfbe3',
      type: 'HEN_COLLECT',
      implements: 'SALE',
      opid: 52568902,
      ophash: 'opV2QaCSsGMJ9xwBh9jyNBy4mMFVvtyy7Jf7pYky4qAFprmeoN7',
      timestamp: '2021-05-31T08:08:46Z',
      level: 1495010,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '106838',
      buyer_address: 'tz1XGTjeqid5naxSviH3CBcfz944qHM6bNeD',
      seller_address: 'tz1RDuX3MzvC8adUjXKfh2roCtprFUXpVKVD',
      swap_id: '207654',
      amount: '1',
      price: '11000000',
    },
  ]);
});
