import ObjktBuyDutchAuctionHandler from './objkt_buy_dutch_auction';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_BUY_DUTCH_AUCTION_V2 events', async () => {
  const transactions: Transactions = [
    // CONTRACT V1
    {
      id: 57895477,
      level: 1539718,
      timestamp: '2021-07-02T00:26:38Z',
      block: 'BLcUoPRymxTT4ChZGRx1QLbGgpigdUyWEor6WNhD81Lqa29Kwmf',
      hash: 'op9ZQRPjVLUk4rf2gF7eryecDjhyV7W5Uy39SG3PRXASfEPTonk',
      counter: 14628159,
      nonce: null,
      sender: {
        alias: 'Space Renders',
        address: 'tz1eRQV8dkcRkBYasFKnna66UWMv43Q49B7J',
      },
      target: {
        alias: 'objkt.com Dutch Auctions Old',
        address: 'KT1ET45vnyEFMLS9wX1dYHEs9aCN3twDEiQw',
      },
      parameter: {
        entrypoint: 'buy',
        value: '17',
      },
      amount: 15087510,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5907,
        metadata: 5908,
        auction_id: '35',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5907,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'expruh5diuJb6Vu4B127cxWhiJ3927mvmG9oZ1pYKSNERPpefM4KBg',
            key: '17',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '2',
              artist: 'tz1Ty3zxPSKtDbb532h3UKWff4SRG99BU26L',
              creator: 'tz1i9cMTpYJJocArvA22fRQrLd5Krdku9GtP',
              end_time: '2021-07-02T00:29:39Z',
              objkt_id: '146831',
              end_price: '14888000',
              royalties: '250',
              start_time: '2021-07-01T22:29:39Z',
              start_price: '20000000',
            },
          },
        },
      ],
    },

    // CONTRACT V2
    {
      id: 57906043,
      level: 1539806,
      timestamp: '2021-07-02T02:05:10Z',
      block: 'BMFcEQrDMQAxfTGR5Rtjq2U8N97hGw6ypZ27MJXLhes7dzbzcg4',
      hash: 'onsQp1MdkaDo5TwfKUR6dKRkEXexJEEhEx3x1RFppxWAD68Bws1',
      counter: 11985762,
      nonce: null,
      sender: {
        alias: 'Joe Looney',
        address: 'tz1btmyPUfG55dqtToFqhnN7Y8HZjGz6N2aM',
      },
      target: {
        alias: 'objkt.com Dutch Auctions Old',
        address: 'KT1ET45vnyEFMLS9wX1dYHEs9aCN3twDEiQw',
      },
      parameter: {
        entrypoint: 'buy',
        value: '33',
      },
      amount: 7843750,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        auctions: 5907,
        metadata: 5908,
        auction_id: '47',
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5907,
          path: 'auctions',
          action: 'update_key',
          content: {
            hash: 'exprtcxWUdSoni6H8bX8H8fqioGCMsEZyqpkCHMZimZJqTCBseU1Yr',
            key: '33',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              state: '2',
              artist: 'tz1QFk2DJhPkzp2nCN7Thpo4askJjQ3Zw6BU',
              creator: 'tz1QFk2DJhPkzp2nCN7Thpo4askJjQ3Zw6BU',
              end_time: '2021-07-02T02:10:45Z',
              objkt_id: '8173',
              end_price: '5000000',
              royalties: '100',
              start_time: '2021-07-02T00:10:45Z',
              start_price: '50000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktBuyDutchAuctionHandler]);

  expect(events).toStrictEqual([
    // CONTRACT V1
    {
      id: '5a04d5ba32a31e9297e696b9d4b868e7',
      type: 'OBJKT_BUY_DUTCH_AUCTION',
      implements: 'SALE',
      opid: '57895477',
      ophash: 'op9ZQRPjVLUk4rf2gF7eryecDjhyV7W5Uy39SG3PRXASfEPTonk',
      timestamp: '2021-07-02T00:26:38Z',
      level: 1539718,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '146831',
      seller_address: 'tz1i9cMTpYJJocArvA22fRQrLd5Krdku9GtP',
      buyer_address: 'tz1eRQV8dkcRkBYasFKnna66UWMv43Q49B7J',
      artist_address: 'tz1Ty3zxPSKtDbb532h3UKWff4SRG99BU26L',
      start_time: '2021-07-01T22:29:39Z',
      end_time: '2021-07-02T00:29:39Z',
      royalties: '250',
      start_price: '20000000',
      end_price: '14888000',
      price: '15087510',
      auction_id: '17',
    },

    // CONTRACT V2
    {
      id: 'a14e2535b3fb4b8c655dbb5ecc086c0b',
      type: 'OBJKT_BUY_DUTCH_AUCTION',
      implements: 'SALE',
      opid: '57906043',
      ophash: 'onsQp1MdkaDo5TwfKUR6dKRkEXexJEEhEx3x1RFppxWAD68Bws1',
      timestamp: '2021-07-02T02:05:10Z',
      level: 1539806,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '8173',
      seller_address: 'tz1QFk2DJhPkzp2nCN7Thpo4askJjQ3Zw6BU',
      buyer_address: 'tz1btmyPUfG55dqtToFqhnN7Y8HZjGz6N2aM',
      artist_address: 'tz1QFk2DJhPkzp2nCN7Thpo4askJjQ3Zw6BU',
      start_time: '2021-07-02T00:10:45Z',
      end_time: '2021-07-02T02:10:45Z',
      royalties: '100',
      start_price: '50000000',
      end_price: '5000000',
      price: '7843750',
      auction_id: '33',
    },
  ]);
});
