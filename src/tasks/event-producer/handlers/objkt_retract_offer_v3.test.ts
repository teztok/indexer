import ObjktRetractOfferV3Handler from './objkt_retract_offer_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_OFFER_V3 events', async () => {
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
  ];

  const events = transactionsToEvents(transactions, [ObjktRetractOfferV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '5ab2a5360f2bab5f2fc73e37ff31a66d',
      type: 'OBJKT_RETRACT_OFFER_V3',
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
  ]);
});
