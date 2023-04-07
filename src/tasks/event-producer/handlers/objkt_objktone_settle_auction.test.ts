import ObjktObjktoneAuctionHandler from './objkt_objktone_settle_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_OBJKTONE_SETTLE_AUCTION events', async () => {
  const transactions: Transactions = [
    {
      id: 476713531211776,
      level: 3191587,
      timestamp: '2023-03-02T18:25:44Z',
      block: 'BLt9muWzGvGXsaNinR4d5hEkNj3BM1BxDT3GBrDJddYvekXujwc',
      hash: 'ooMcQnjTJzxD9srQdnDKq83CGJWyH9cj2qCxDumBxRMrgAaFD94',
      counter: 95060015,
      sender: {
        address: 'tz1MqfPirhUaaJbneoUdeXCRudPUgAGTHEbc',
      },
      target: {
        address: 'KT1M6r2gRigUYP3tCSEjEptRnNG8qRLSRqcT',
      },
      amount: 0,
      parameter: {
        entrypoint: 'settle_auction',
        value: '1500012',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        auctions: 384417,
        metadata: 384418,
        next_auction_id: '1500016',
        permission_module: 'KT1R7TYjYeW3wraJJzzqBKQ7bFyMyfGy93WJ',
        fee_sharing_registry: 'KT1PvcNgreW8T2Z8ZNiEEpqWeh2ApMY7QBU6',
      },
      diffs: [
        {
          bigmap: 384417,
          path: 'auctions',
          action: 'remove_key',
          content: {
            hash: 'exprvMi4fbaSLPbDTsib8s3oafSekdWEe9YczejRMAyebiDmcWpjVL',
            key: '1500012',
            value: {
              token: {
                address: 'KT1NvaAU5oqfvhBcapnE9BbSiWHNVVnKjmHB',
                token_id: '2',
              },
              shares: {
                tz1NBeG2qN6D3EKUbD539A69Va1Vu3BSZZT4: '400',
                tz1PsY6huVzWihab1EX1Axrtk72ip9qQHBCs: '8800',
                tz1hFhmqKNB7hnHVHAFSk9wNqm7K9GgF2GDN: '550',
              },
              creator: 'KT1DxmNqWmYJPhiRkW44oug7ZUykaSv7UjRu',
              reserve: '1000000000',
              currency: {
                fa12: 'KT1TjnZYs5CGLbmV6yuW169P8Pnr9BiVwwjz',
              },
              duration: '86400',
              end_time: '2023-03-02T18:25:14Z',
              condition: null,
              share_fees: {},
              start_time: null,
              platform_fee: '250',
              current_price: '1200000000',
              extension_time: '600',
              highest_bidder: 'tz1iXBodomYm9ob1pfmvQhd7tet6y1ZQsL85',
              referral_bonus: '0',
              price_increment: '10000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktObjktoneAuctionHandler]);

  expect(events).toStrictEqual([
    {
      auction_id: '1500012',
      buyer_address: 'tz1iXBodomYm9ob1pfmvQhd7tet6y1ZQsL85',
      currency: 'otez',
      extension_time: '600',
      fa2_address: 'KT1NvaAU5oqfvhBcapnE9BbSiWHNVVnKjmHB',
      id: '9010a0cc6054b5631bc3e34cb426ec83',
      implements: 'SALE',
      level: 3191587,
      ophash: 'ooMcQnjTJzxD9srQdnDKq83CGJWyH9cj2qCxDumBxRMrgAaFD94',
      opid: '476713531211776',
      price: '1200000000',
      price_increment: '10000000',
      reserve: '1000000000',
      seller_address: 'KT1DxmNqWmYJPhiRkW44oug7ZUykaSv7UjRu',
      timestamp: '2023-03-02T18:25:44Z',
      token_id: '2',
      type: 'OBJKT_OBJKTONE_SETTLE_AUCTION',
    },
  ]);
});
