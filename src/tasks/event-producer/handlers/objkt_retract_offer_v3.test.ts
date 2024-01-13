import ObjktRetractOfferV3Handler from './objkt_retract_offer_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_OFFER_V3_PRE events', async () => {
  const transactions: Transactions = [
    {
      id: 910971158659072,
      level: 4866673,
      timestamp: '2024-01-04T14:39:24Z',
      block: 'BM6FoFpMtFvUSUWoqY7NMr3uA9FqJFLbriPNt7iJ45Q3MqFFCRo',
      hash: 'opEwjzfHexEcmxjbaTHd7RGHRQSBDsXaNVg1cxSGuvdaMjPnfXV',
      counter: 117276994,
      nonce: null,
      sender: {
        address: 'tz1dMPqNAKjQaG1caqhodmg6Pt9vvSA2ZH3h',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 0,
      parameter: {
        entrypoint: 'retract_offer',
        value: '10000004',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 574013,
        offers: 574015,
        metadata: 574014,
        next_ask_id: '10000057',
        next_offer_id: '10000006',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574015,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'expruarg3Ku4bsuXjbRCrinTmNSy6rY5gbvMFGYuALoPyQHuunWXME',
            key: '10000004',
            value: {
              token: {
                address: 'KT1FTEDKmfzJtvSm6rqPkP9c9UEG557XkYm1',
                token_id: '0',
              },
              amount: '100000',
              shares: {
                tz1WKyFFuxPHjrdoNp3kQrZRCn5mHU6LkEQv: '800',
              },
              creator: 'tz1dMPqNAKjQaG1caqhodmg6Pt9vvSA2ZH3h',
              currency: {
                tez: {},
              },
              condition: null,
              expiry_time: '2024-02-03T14:35:34Z',
              platform_fee: '500',
            },
          },
        },
      ],
    },
    {
      id: 919814950354944,
      level: 4901399,
      timestamp: '2024-01-10T17:03:28Z',
      block: 'BLE6aLxcG99z88KxB5ugxunJqBLfvCrwargo1NErDatbXzoYmrU',
      hash: 'ooFZXigzdZ42oEfd8WuRjFfkW95C68JuPyR1mZ3GA2hSgktfgfA',
      counter: 46530884,
      nonce: null,
      sender: {
        address: 'tz1U8kczop9YrtfExwfkUBdzV8zaLxnBd4Wt',
      },
      target: {
        address: 'KT1Xjap1TwmDR1d8yEd8ErkraAj2mbdMrPZY',
      },
      amount: 0,
      parameter: {
        entrypoint: 'retract_offer',
        value: '11000015',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 591024,
        offers: 591026,
        metadata: 591025,
        next_ask_id: '11000142',
        next_offer_id: '11000026',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 591026,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'expruXRGnhbjNMB612X27Ced75pSW1yR7aqr2UeXp2P7tMNhghTtMX',
            key: '11000015',
            value: {
              token: {
                address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
                token_id: '747393',
              },
              amount: '15000000',
              shares: {
                tz1YZCsRwLMtMrnHNn4vhKUbLqBuhvgskRsr: '2500',
              },
              creator: 'tz1U8kczop9YrtfExwfkUBdzV8zaLxnBd4Wt',
              currency: {
                tez: {},
              },
              condition: null,
              referrers: {},
              expiry_time: '2024-01-17T16:32:13Z',
              platform_fee: '500',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktRetractOfferV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '5ab2a5360f2bab5f2fc73e37ff31a66d',
      type: 'OBJKT_RETRACT_OFFER_V3_PRE',
      opid: '910971158659072',
      ophash: 'opEwjzfHexEcmxjbaTHd7RGHRQSBDsXaNVg1cxSGuvdaMjPnfXV',
      timestamp: '2024-01-04T14:39:24Z',
      level: 4866673,
      fa2_address: 'KT1FTEDKmfzJtvSm6rqPkP9c9UEG557XkYm1',
      token_id: '0',
      buyer_address: 'tz1dMPqNAKjQaG1caqhodmg6Pt9vvSA2ZH3h',
      //artist_address: 'tz1dCmVe2mLsHrt1fmDvs64wpeLtsdJJnbAN', TODO
      offer_id: '10000004',
    },
    {
      buyer_address: 'tz1U8kczop9YrtfExwfkUBdzV8zaLxnBd4Wt',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      id: 'cfa034549f48ecab2946de851c6d95ad',
      level: 4901399,
      offer_id: '11000015',
      ophash: 'ooFZXigzdZ42oEfd8WuRjFfkW95C68JuPyR1mZ3GA2hSgktfgfA',
      opid: '919814950354944',
      timestamp: '2024-01-10T17:03:28Z',
      token_id: '747393',
      type: 'OBJKT_RETRACT_OFFER_V3',
    },
  ]);
});
