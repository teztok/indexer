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
      nonce: null,
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
    {
      id: 43946067,
      level: 1399275,
      timestamp: '2021-03-24T23:03:46Z',
      block: 'BLDhSemaqVyrpoBZg5LMXGRErjZqcgcATMkaPu4VHTQjn2zWqBE',
      hash: 'op8oxFQXM3w8ayuozQyiRZnmjGoEh3TPu2UUvhjki2u2A6V756t',
      counter: 9552433,
      sender: {
        address: 'tz1L7dGRrWStRo57MR1VYCFboKCznDrbhzKw',
      },
      target: {
        alias: 'hic et nunc Minter',
        address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
      },
      amount: 2000000,
      parameter: {
        entrypoint: 'collect',
        value: {
          swap_id: '11257',
          objkt_amount: '2',
        },
      },
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
        swap_id: '12334',
        metadata: 521,
        objkt_id: '12358',
        royalties: 522,
      },
      diffs: [
        {
          bigmap: 523,
          path: 'swaps',
          action: 'remove_key',
          content: {
            hash: 'expruxXBY17763HMUifMMUojZJWUmTAAhJnWMViocp4ZB3b46aEAgT',
            key: '11257',
            value: {
              issuer: 'tz1bT4YJKb8h6w3C1Tbki2FwKt1YGqSrisAP',
              objkt_id: '11231',
              objkt_amount: '2',
              xtz_per_objkt: '1000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [HenCollectHandler]);

  expect(events).toStrictEqual([
    {
      id: 'd8e1bffb1c654469f4a4cacd6a9a9e1a',
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
      price: '11000000',
    },
    {
      buyer_address: 'tz1L7dGRrWStRo57MR1VYCFboKCznDrbhzKw',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      id: '2a8f6136399da9c0c8b95c7686518b55',
      implements: 'SALE',
      level: 1399275,
      ophash: 'op8oxFQXM3w8ayuozQyiRZnmjGoEh3TPu2UUvhjki2u2A6V756t',
      opid: 43946067,
      price: '1000000',
      seller_address: 'tz1bT4YJKb8h6w3C1Tbki2FwKt1YGqSrisAP',
      swap_id: '11257',
      timestamp: '2021-03-24T23:03:46Z',
      token_id: '11231',
      type: 'HEN_COLLECT',
    },
    {
      buyer_address: 'tz1L7dGRrWStRo57MR1VYCFboKCznDrbhzKw',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      id: '0637cafdae040ae2b9472888334f7165',
      implements: 'SALE',
      level: 1399275,
      ophash: 'op8oxFQXM3w8ayuozQyiRZnmjGoEh3TPu2UUvhjki2u2A6V756t',
      opid: 43946067,
      price: '1000000',
      seller_address: 'tz1bT4YJKb8h6w3C1Tbki2FwKt1YGqSrisAP',
      swap_id: '11257',
      timestamp: '2021-03-24T23:03:46Z',
      token_id: '11231',
      type: 'HEN_COLLECT',
    },
  ]);
});
