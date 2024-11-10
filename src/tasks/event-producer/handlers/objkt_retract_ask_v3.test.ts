import ObjktRetractAskV3Handler from './objkt_retract_ask_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_ASK_V3_PRE events', async () => {
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
    {
      id: 919815652900864,
      level: 4901402,
      timestamp: '2024-01-10T17:04:13Z',
      block: 'BLzYXKRnWGNwU7XMcWaZPBr5F3ZDDQKBWzU3em9K6NpP9ZJdwq4',
      hash: 'opMfBcMDBBBEtKVGMpeeJfV6Wk4TWFoALnK4JMzvGGJgmVVN28T',
      counter: 58900572,
      nonce: null,
      sender: {
        alias: 'remikz',
        address: 'tz1dauW4HEphzuKr5gxGHueru622amDBF7fn',
      },
      target: {
        address: 'KT1Xjap1TwmDR1d8yEd8ErkraAj2mbdMrPZY',
      },
      amount: 0,
      parameter: {
        entrypoint: 'retract_ask',
        value: '11000078',
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 591024,
        offers: 591026,
        metadata: 591025,
        next_ask_id: '11000144',
        next_offer_id: '11000026',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 591024,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'exprvGy1cgFGatqZPfzy62mxDEXi424seF7BWb1sMbcvyFCEDSYESA',
            key: '11000078',
            value: {
              token: {
                address: 'KT1Swo2yvRgqmm9TtA1VeXy8EwQjYNbN3vAa',
                token_id: '71',
              },
              amount: '2200000',
              shares: {
                tz1dauW4HEphzuKr5gxGHueru622amDBF7fn: '1000',
              },
              creator: 'tz1dauW4HEphzuKr5gxGHueru622amDBF7fn',
              currency: {
                tez: {},
              },
              editions: '9',
              condition: null,
              expiry_time: null,
              platform_fee: '500',
              referral_bonus: '500',
            },
          },
        },
      ],
    },
    {
      id: 1417062933069824,
      level: 7046681,
      timestamp: '2024-11-06T14:42:30Z',
      block: 'BMDWbEY39aqDZxxgVdk5TPKzmkSgY8PbiHnnqaBAudRTtZJZUMA',
      hash: 'ooZL7KUK315exLHZRPV2mkijeBkeiAfaS5JFvFJkWZyEugy7GUg',
      counter: 32320819,
      nonce: null,
      sender: {
        address: 'tz1MrS2Hj5kTwwK4p94HYzbtUCFNGJUuQFyd',
      },
      target: {
        address: 'KT1SwbTqhSKF6Pdokiu1K4Fpi17ahPPzmt1X',
      },
      amount: 0,
      parameter: {
        entrypoint: 'retract_ask',
        value: '12000067',
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 684371,
        offers: 684373,
        metadata: 684372,
        next_ask_id: '12000071',
        next_offer_id: '12000015',
        gallery_factory: 'KT1Ksc2gAP4mpt7fzwoF9Miwp6qFdavpS25u',
        permission_module: 'KT1N5x6wZXLqigVqGVHm3N2kHvyR6YWAD2Ta',
        fee_sharing_registry: 'KT1KmfuowNSgq66T1kpqPEpp6rat89QnixvD',
      },
      diffs: [
        {
          bigmap: 684371,
          path: 'asks',
          action: 'remove_key',
          content: {
            hash: 'expruSdpvZ2L7AZJV5pVKrbhafvzsMQh1panY7CgKQZ7WKyZYuCLHQ',
            key: '12000067',
            value: {
              token: {
                address: 'KT1MQGEuHspLgNR6iToGPhjcLU2kdjEBFzii',
                token_id: '124',
              },
              amount: '33000000',
              shares: {
                tz1fEu4phJuJhqVQfpZj642ps9znYBarJDSf: '100',
              },
              creator: 'tz1MrS2Hj5kTwwK4p94HYzbtUCFNGJUuQFyd',
              currency: {
                tez: {},
              },
              editions: '1',
              condition: null,
              start_time: '2024-11-06T14:39:35Z',
              expiry_time: null,
              platform_fee: '500',
              exhibition_id: null,
              referral_bonus: '500',
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
      type: 'OBJKT_RETRACT_ASK_V3_PRE',
      opid: '911995115143168',
      ophash: 'oo3CZ5KVDicwPUCRwR74Btsh79CDqn1MCJST6BcL5Hcbi9852ov',
      timestamp: '2024-01-05T07:59:00Z',
      level: 4870770,
      fa2_address: 'KT1W4fRBbGLRHZCxqR9XVtovbiy7dUUirkdz',
      token_id: '68',
      seller_address: 'tz1MPHAfwMTLXZWryg2qa6pZs1Q4ox33a6xF',
      ask_id: '10002459',
    },
    {
      ask_id: '11000078',
      fa2_address: 'KT1Swo2yvRgqmm9TtA1VeXy8EwQjYNbN3vAa',
      id: '08c365c7b201888664a1d38ece2d9da5',
      level: 4901402,
      ophash: 'opMfBcMDBBBEtKVGMpeeJfV6Wk4TWFoALnK4JMzvGGJgmVVN28T',
      opid: '919815652900864',
      seller_address: 'tz1dauW4HEphzuKr5gxGHueru622amDBF7fn',
      timestamp: '2024-01-10T17:04:13Z',
      token_id: '71',
      type: 'OBJKT_RETRACT_ASK_V3',
    },
    {
      ask_id: '12000067',
      fa2_address: 'KT1MQGEuHspLgNR6iToGPhjcLU2kdjEBFzii',
      id: '15043c595bcaa18d8d8cc9967624201c',
      level: 7046681,
      ophash: 'ooZL7KUK315exLHZRPV2mkijeBkeiAfaS5JFvFJkWZyEugy7GUg',
      opid: '1417062933069824',
      seller_address: 'tz1MrS2Hj5kTwwK4p94HYzbtUCFNGJUuQFyd',
      timestamp: '2024-11-06T14:42:30Z',
      token_id: '124',
      type: 'OBJKT_RETRACT_ASK_V3_2',
    },
  ]);
});
