import ObjktAskV3Handler from './objkt_ask_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_ASK_V3 events', async () => {
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
  ];

  const events = transactionsToEvents(transactions, [ObjktAskV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '17beb298bf031f1c1687c8b27ab8e5f0',
      type: 'OBJKT_ASK_V3',
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
  ]);
});
