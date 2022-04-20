import HenCollectHandler from './hen_collect_v2';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates HEN_COLLECT_V2 events', async () => {
  const transactions: Transactions = [
    {
      id: 112502500,
      level: 1879135,
      timestamp: '2021-11-20T08:09:52Z',
      block: 'BLy97rwKBbkbJGKyj8geGHBSveDzSRfnnhBx2kGPSRrTafowCU1',
      hash: 'ookTzCAFU1WV67E39MwkN4zQAQ18NfjEdxtPFkvTk7LSCsjUW4M',
      counter: 33889428,
      sender: {
        address: 'tz1Td886MhUexDnvpfdh5YEnbmEy11VCjvtf',
      },
      target: {
        alias: 'hic et nunc Marketplace',
        address: 'KT1HbQepzV1nVGg8QVznG7z4RcHseD5kwqBn',
      },
      parameter: {
        entrypoint: 'collect',
        value: '1591075',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fee: '10',
        objkt: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
        swaps: 6072,
        counter: '1626771',
        manager: 'tz1UBZUkXpKGhYsP5KtzDNqLLchwF4uHrGjw',
        metadata: 6071,
      },
      diffs: [
        {
          bigmap: 6072,
          path: 'swaps',
          action: 'update_key',
          content: {
            hash: 'exprvLvzPN4NCXVnBG3X63w9kzZob6A6A8PxJBHkXAJNnzBsVUkT97',
            key: '1591075',
            value: {
              issuer: 'tz2TG7nYDasJzWPrLgbk7f3D4uyHo2ADdWgB',
              creator: 'tz2TG7nYDasJzWPrLgbk7f3D4uyHo2ADdWgB',
              objkt_id: '533459',
              royalties: '250',
              objkt_amount: '213',
              xtz_per_objkt: '5',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [HenCollectHandler]);

  expect(events).toStrictEqual([
    {
      id: '83c832b52b893f197797b8ed6a9c8b78',
      type: 'HEN_COLLECT_V2',
      implements: 'SALE',
      opid: 112502500,
      ophash: 'ookTzCAFU1WV67E39MwkN4zQAQ18NfjEdxtPFkvTk7LSCsjUW4M',
      timestamp: '2021-11-20T08:09:52Z',
      level: 1879135,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '533459',
      swap_id: '1591075',
      buyer_address: 'tz1Td886MhUexDnvpfdh5YEnbmEy11VCjvtf',
      seller_address: 'tz2TG7nYDasJzWPrLgbk7f3D4uyHo2ADdWgB',
      artist_address: 'tz2TG7nYDasJzWPrLgbk7f3D4uyHo2ADdWgB',
      price: '5',
    },
  ]);
});
