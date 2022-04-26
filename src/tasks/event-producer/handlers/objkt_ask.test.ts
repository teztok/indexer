import ObjktAskHandler from './objkt_ask';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_ASK events', async () => {
  const transactions: Transactions = [
    {
      id: 112502089,
      level: 1879132,
      timestamp: '2021-11-20T08:08:22Z',
      block: 'BM8u3rAMkiidUtZc1wa2caB3UkBjeoiQ2a7SEdfibPLMtDuwJxR',
      hash: 'oooKM1Smbj3n5Y1ciHUrbiFnKCQEcTyNsSuzXytoS4Z7rNbSFoa',
      counter: 33630932,
      nonce: null,
      sender: {
        address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      },
      target: {
        alias: 'objkt.com Marketplace',
        address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      },
      parameter: {
        entrypoint: 'ask',
        value: {
          fa2: 'KT1GyPi5VhP82Rfgn8SUA5SRNUZj4LbBEgPX',
          price: '500000',
          amount: '28',
          artist: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
          objkt_id: '4',
          royalties: '100',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 5909,
        bids: 5910,
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        ask_id: '177702',
        bid_id: '41552',
        metadata: 5911,
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5909,
          path: 'asks',
          action: 'add_key',
          content: {
            hash: 'exprtXo91L1KLQp4g8VL4wZF1yJ4AfW5eD8n7tJUat9HBcNiBqo5ga',
            key: '177701',
            value: {
              fa2: 'KT1GyPi5VhP82Rfgn8SUA5SRNUZj4LbBEgPX',
              amount: '28',
              artist: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
              issuer: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
              objkt_id: '4',
              royalties: '100',
              xtz_per_objkt: '500000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktAskHandler]);

  expect(events).toStrictEqual([
    {
      id: 'a3bea801d8ccf58e3dd0727db29d5eb0',
      type: 'OBJKT_ASK',
      opid: 112502089,
      ophash: 'oooKM1Smbj3n5Y1ciHUrbiFnKCQEcTyNsSuzXytoS4Z7rNbSFoa',
      timestamp: '2021-11-20T08:08:22Z',
      level: 1879132,
      fa2_address: 'KT1GyPi5VhP82Rfgn8SUA5SRNUZj4LbBEgPX',
      token_id: '4',
      ask_id: '177701',
      seller_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      artist_address: 'tz1VQAVjmKiDknLcihr5LQ5yNeRjtK6oQPjJ',
      royalties: '100',
      price: '500000',
      amount: '28',
    },
  ]);
});
