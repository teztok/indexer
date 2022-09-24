import ObjktRetractAskHandler from './objkt_retract_ask';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_ASK events', async () => {
  const transactions: Transactions = [
    {
      id: 112502627,
      level: 1879136,
      timestamp: '2021-11-20T08:10:22Z',
      block: 'BLd4oNukefgdQNfyedWXBWREZVfJgAaEKsaduffDDam4w2Mm8F5',
      hash: 'oneRH5srxEAdS4WZCm8J36EuqvgRuL8TXP4G59zVfFBXxrrvHRZ',
      counter: 30042373,
      nonce: null,
      sender: {
        address: 'tz1ioqD76urZw1oY5CUXDjzfp1uPqSNrgKC1',
      },
      target: {
        alias: 'objkt.com Marketplace',
        address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      },
      parameter: {
        entrypoint: 'retract_ask',
        value: '157497',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 5909,
        bids: 5910,
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        ask_id: '177704',
        bid_id: '41555',
        metadata: 5911,
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5909,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'exprvSUkrEmccKvff6eUScSoNNkcpd1tErFiG1m6A8vxHH8p7J2QKS',
            key: '157497',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              amount: '1',
              artist: 'tz1dCmVe2mLsHrt1fmDvs64wpeLtsdJJnbAN',
              issuer: 'tz1ioqD76urZw1oY5CUXDjzfp1uPqSNrgKC1',
              objkt_id: '502688',
              royalties: '120',
              xtz_per_objkt: '40000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktRetractAskHandler]);

  expect(events).toStrictEqual([
    {
      id: 'd6c18bdfe93f3dc3478e239a77fbe241',
      type: 'OBJKT_RETRACT_ASK',
      opid: '112502627',
      ophash: 'oneRH5srxEAdS4WZCm8J36EuqvgRuL8TXP4G59zVfFBXxrrvHRZ',
      timestamp: '2021-11-20T08:10:22Z',
      level: 1879136,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      seller_address: 'tz1ioqD76urZw1oY5CUXDjzfp1uPqSNrgKC1',
      artist_address: 'tz1dCmVe2mLsHrt1fmDvs64wpeLtsdJJnbAN',
      token_id: '502688',
      ask_id: '157497',
    },
  ]);
});
