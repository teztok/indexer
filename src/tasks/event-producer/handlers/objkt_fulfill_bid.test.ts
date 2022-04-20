import ObjktFulfillBidHandler from './objkt_fulfill_bid';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_FULFILL_BID events', async () => {
  const transactions: Transactions = [
    {
      id: 57868742,
      level: 1539503,
      timestamp: '2021-07-01T20:33:38Z',
      block: 'BL3qXa1pr8ahc7LPo9WAgFX5UhPgL6yUxCBiq4WQVsK7J4TfJpN',
      hash: 'ooYKthbXPxwVJBjrNaZnG7c3ubMS6aoHfqiQnQ9DBvrp1g4ei6s',
      counter: 14989745,
      sender: {
        alias: 'oddcr0w',
        address: 'tz1WybfACSmvJfjz1NGHtshLvhLkNJtUfNzN',
      },
      target: {
        alias: 'objkt.com Marketplace',
        address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      },
      parameter: {
        entrypoint: 'fulfill_bid',
        value: '7',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 5909,
        bids: 5910,
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        ask_id: '7',
        bid_id: '9',
        metadata: 5911,
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5910,
          path: 'bids',
          action: 'remove_key',
          content: {
            hash: 'exprufunBN3FAVpZ21WXquoqiNyWB2PvYy1njkP4wHGtMexdKtcJEM',
            key: '7',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              artist: 'tz1WybfACSmvJfjz1NGHtshLvhLkNJtUfNzN',
              issuer: 'tz1ZWnPxXyR8oUxxBEgjvBzw13F299seTsZN',
              objkt_id: '157150',
              royalties: '200',
              xtz_per_objkt: '2500000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktFulfillBidHandler]);

  expect(events).toStrictEqual([
    {
      id: '18086521a42e1aa5510678a04a9c428b',
      type: 'OBJKT_FULFILL_BID',
      implements: 'SALE',
      opid: 57868742,
      ophash: 'ooYKthbXPxwVJBjrNaZnG7c3ubMS6aoHfqiQnQ9DBvrp1g4ei6s',
      timestamp: '2021-07-01T20:33:38Z',
      level: 1539503,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '157150',
      bid_id: '7',
      price: '2500000',
      seller_address: 'tz1WybfACSmvJfjz1NGHtshLvhLkNJtUfNzN',
      buyer_address: 'tz1ZWnPxXyR8oUxxBEgjvBzw13F299seTsZN',
      artist_address: 'tz1WybfACSmvJfjz1NGHtshLvhLkNJtUfNzN',
    },
  ]);
});
