import ObjktAskV3Handler from './objkt_ask_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_ASK_V3_PRE events', async () => {
  const transactions: Transactions = [
    {
      id: 911957471264768,
      level: 4870616,
      timestamp: '2024-01-05T07:18:04Z',
      block: 'BMBgcguerCFvChn8Nn6SGg9m2s1LkMFSf65FZN9uXiVcykUkLWK',
      hash: 'onqpTJ7ik4A3u8ZumKjSTewcqEUqvXwNvbJNEhXD8dos195qyLn',
      counter: 63918143,
      nonce: null,
      sender: {
        address: 'tz1Ni4oMi1cv4seoFyjdkzmvkBEsUCLPKRKV',
      },
      target: {
        address: 'KT1CePTyk6fk4cFr6fasY5YXPGks6ttjSLp4',
      },
      amount: 0,
      parameter: {
        entrypoint: 'ask',
        value: {
          token: {
            address: 'KT192qZS6pptvS8TcVo7hGdD2mVHWSoxXNni',
            token_id: '8',
          },
          amount: '45000000',
          shares: {
            tz2W3nHza52fLGAizWGksUzgDNPNxmN4XVVz: '1500',
          },
          currency: {
            tez: {},
          },
          editions: '1',
          condition: null,
          expiry_time: null,
          referral_bonus: '0',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 574013,
        offers: 574015,
        metadata: 574014,
        next_ask_id: '10002419',
        next_offer_id: '10000170',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574013,
          path: 'asks',
          action: 'add_key',
          content: {
            hash: 'exprtuWccdzXBU2nMx1Dx5Tnp6nrt3SiENvNHx44HBxEYRz6G6ng7Q',
            key: '10002418',
            value: {
              token: {
                address: 'KT192qZS6pptvS8TcVo7hGdD2mVHWSoxXNni',
                token_id: '8',
              },
              amount: '45000000',
              shares: {
                tz2W3nHza52fLGAizWGksUzgDNPNxmN4XVVz: '1500',
              },
              creator: 'tz1Ni4oMi1cv4seoFyjdkzmvkBEsUCLPKRKV',
              currency: {
                tez: {},
              },
              editions: '1',
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
      id: 919747187179520,
      level: 4901128,
      timestamp: '2024-01-10T15:55:20Z',
      block: 'BKrMqfD8U4ejFyiBPEXgPRzpgveW18XqefJFs5hUrKgyZF8BoWj',
      hash: 'oo8AXvUUfLtYDsVYRRs9gZpapenFthzAP69GLXB4oNM1JEjUemZ',
      counter: 102499570,
      nonce: null,
      sender: {
        address: 'tz1VLKUDUXHo83VwUJKUvYnRun77bRetBYa7',
      },
      target: {
        address: 'KT1Xjap1TwmDR1d8yEd8ErkraAj2mbdMrPZY',
      },
      amount: 0,
      parameter: {
        entrypoint: 'ask',
        value: {
          token: {
            address: 'KT1GkdbyrAX8WiDm5TyQCFRjzo75D6do6hca',
            token_id: '8',
          },
          amount: '500000',
          shares: {
            tz1VLKUDUXHo83VwUJKUvYnRun77bRetBYa7: '1000',
          },
          currency: {
            tez: {},
          },
          editions: '10',
          condition: null,
          expiry_time: null,
          referral_bonus: '1000',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 591024,
        offers: 591026,
        metadata: 591025,
        next_ask_id: '11000002',
        next_offer_id: '11000001',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 591024,
          path: 'asks',
          action: 'add_key',
          content: {
            hash: 'exprubikeA93UAVMh5ff6wR1gUG6SMpHUB4kbLG8cn8V7yMGNnUuAQ',
            key: '11000001',
            value: {
              token: {
                address: 'KT1GkdbyrAX8WiDm5TyQCFRjzo75D6do6hca',
                token_id: '8',
              },
              amount: '500000',
              shares: {
                tz1VLKUDUXHo83VwUJKUvYnRun77bRetBYa7: '1000',
              },
              creator: 'tz1VLKUDUXHo83VwUJKUvYnRun77bRetBYa7',
              currency: {
                tez: {},
              },
              editions: '10',
              condition: null,
              expiry_time: null,
              platform_fee: '500',
              referral_bonus: '1000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktAskV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '17beb298bf031f1c1687c8b27ab8e5f0',
      type: 'OBJKT_ASK_V3_PRE',
      opid: '911957471264768',
      ophash: 'onqpTJ7ik4A3u8ZumKjSTewcqEUqvXwNvbJNEhXD8dos195qyLn',
      timestamp: '2024-01-05T07:18:04Z',
      level: 4870616,
      fa2_address: 'KT192qZS6pptvS8TcVo7hGdD2mVHWSoxXNni',
      token_id: '8',
      ask_id: '10002418',
      seller_address: 'tz1Ni4oMi1cv4seoFyjdkzmvkBEsUCLPKRKV',
      currency: 'tez',
      price: '45000000',
      amount: '1',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz2W3nHza52fLGAizWGksUzgDNPNxmN4XVVz: '1500',
        },
      },
    },
    {
      amount: '10',
      ask_id: '11000001',
      currency: 'tez',
      fa2_address: 'KT1GkdbyrAX8WiDm5TyQCFRjzo75D6do6hca',
      id: 'a5b6a76fcd56dc5f99da17c5c39489e1',
      level: 4901128,
      ophash: 'oo8AXvUUfLtYDsVYRRs9gZpapenFthzAP69GLXB4oNM1JEjUemZ',
      opid: '919747187179520',
      price: '500000',
      royalty_shares: {
        decimals: 4,
        shares: {
          tz1VLKUDUXHo83VwUJKUvYnRun77bRetBYa7: '1000',
        },
      },
      seller_address: 'tz1VLKUDUXHo83VwUJKUvYnRun77bRetBYa7',
      timestamp: '2024-01-10T15:55:20Z',
      token_id: '8',
      type: 'OBJKT_ASK_V3',
    },
  ]);
});
