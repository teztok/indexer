import ObjktSettleEnglishAuctionV3Handler from './objkt_settle_english_auction_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CONTRACT_ENGLISH_AUCTION_V3 events', async () => {
  const transactions: Transactions = [
    {
      id: 912738502049792,
      level: 4873672,
      timestamp: '2024-01-05T20:09:29Z',
      block: 'BLfhh6gtBxzcn1SzAYeewuZnv9sCAgtdSuy12o3zUadZTkbiBDB',
      hash: 'ooEkoyx5p5zXP5hnZbynnfJYSVxPBVccCr1shYkjYB3FZfESkV8',
      counter: 95068232,
      nonce: null,
      sender: {
        address: 'tz1WUKanVYC7MApbcDKbxcXPEtmnTRePCnDP',
      },
      target: {
        address: 'KT18iSHoRW1iogamADWwQSDoZa3QkN4izkqj',
      },
      amount: 0,
      parameter: {
        entrypoint: 'settle_auction',
        value: '2000011',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        auctions: 574016,
        metadata: 574017,
        next_auction_id: '2000135',
        permission_module: 'KT1FzwANzQq9RdSXyF7bnC6gFeo5bDX2HP9v',
        fee_sharing_registry: 'KT1K4xtqQwEp7miTMGq1YXfdcRdjJVyZ7QYK',
      },
      diffs: [
        {
          bigmap: 574016,
          path: 'auctions',
          action: 'remove_key',
          content: {
            hash: 'expru1y1TzLuKBWbM5QiixQt3JkYpbxsQdqkV1A5QUZrr3Ln1jVTNU',
            key: '2000011',
            value: {
              token: {
                address: 'KT1QxUGLwW318uEepbimuGim2WYDMTZeM64j',
                token_id: '3',
              },
              shares: {
                tz1Y3i4EgmPA3PrRjM2WNemP5HgikXqZTC9K: '1000',
              },
              creator: 'tz1Y3i4EgmPA3PrRjM2WNemP5HgikXqZTC9K',
              reserve: '10000000',
              currency: {
                fa12: 'KT1TjnZYs5CGLbmV6yuW169P8Pnr9BiVwwjz',
              },
              duration: '86400',
              end_time: '2024-01-05T20:09:07Z',
              condition: null,
              share_fees: {},
              start_time: '2024-01-04T16:58:57Z',
              platform_fee: '500',
              current_price: '15000000',
              extension_time: '600',
              highest_bidder: 'tz1bLhm2DWvPy4FYC9CPcXu6Mdv6ipvrLLbP',
              referral_bonus: '500',
              price_increment: '1000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktSettleEnglishAuctionV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '126d0e1569d6dcf66e4b0bae8ed835ad',
      type: 'OBJKT_CONTRACT_ENGLISH_AUCTION_V3',
      opid: '912738502049792',
      ophash: 'ooEkoyx5p5zXP5hnZbynnfJYSVxPBVccCr1shYkjYB3FZfESkV8',
      timestamp: '2024-01-05T20:09:29Z',
      level: 4873672,
      fa2_address: 'KT1QxUGLwW318uEepbimuGim2WYDMTZeM64j',
      token_id: '3',
      seller_address: 'tz1Y3i4EgmPA3PrRjM2WNemP5HgikXqZTC9K',
      buyer_address: 'tz1bLhm2DWvPy4FYC9CPcXu6Mdv6ipvrLLbP',
      implements: 'SALE',
      currency: 'otez',
      reserve: '10000000',
      start_time: '2024-01-04T16:58:57Z',
      end_time: '2024-01-05T20:09:07Z',
      price: '15000000',
      extension_time: '600',
      price_increment: '1000000',
      auction_id: '2000011',
    },
  ]);
});
