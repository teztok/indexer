import ObjktRetractAskV3Handler from './objkt_retract_ask_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_ASK_V3 events', async () => {
  const transactions: Transactions = [
    {
      id: 911995115143168,
      level: 4870770,
      timestamp: '2024-01-05T07:59:00Z',
      block: 'BMAzb7p1ttRVArJvNNoLHHiMqnURRgk6w8HpFT6GMKMpfnPMLKJ',
      hash: 'oo3CZ5KVDicwPUCRwR74Btsh79CDqn1MCJST6BcL5Hcbi9852ov',
      counter: 28667066,
      nonce: null,
      sender: {
        address: 'tz1MPHAfwMTLXZWryg2qa6pZs1Q4ox33a6xF',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 0,
      parameter: {
        entrypoint: 'retract_ask',
        value: '10002459',
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 574013,
        offers: 574015,
        metadata: 574014,
        next_ask_id: '10002513',
        next_offer_id: '10000181',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574013,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'exprtk8v5ugfTd9UkMsasTDTVvtAxfyL55fyLPrszTHD3jkDxVbfEy',
            key: '10002459',
            value: {
              token: {
                address: 'KT1W4fRBbGLRHZCxqR9XVtovbiy7dUUirkdz',
                token_id: '68',
              },
              amount: '1200000',
              shares: {
                tz1MPHAfwMTLXZWryg2qa6pZs1Q4ox33a6xF: '2500',
              },
              creator: 'tz1MPHAfwMTLXZWryg2qa6pZs1Q4ox33a6xF',
              currency: {
                tez: {},
              },
              editions: '7',
              condition: null,
              expiry_time: null,
              platform_fee: '500',
              referral_bonus: '0',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktRetractAskV3Handler]);

  expect(events).toStrictEqual([
    {
      id: 'ab0608473c2aefc00414c01615cd6a52',
      type: 'OBJKT_RETRACT_ASK_V3',
      opid: '911995115143168',
      ophash: 'oo3CZ5KVDicwPUCRwR74Btsh79CDqn1MCJST6BcL5Hcbi9852ov',
      timestamp: '2024-01-05T07:59:00Z',
      level: 4870770,
      fa2_address: 'KT1W4fRBbGLRHZCxqR9XVtovbiy7dUUirkdz',
      token_id: '68',
      seller_address: 'tz1MPHAfwMTLXZWryg2qa6pZs1Q4ox33a6xF',
      ask_id: '10002459',
    },
  ]);
});
