import ObjktBidHandler from './objkt_bid';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_BID events', async () => {
  const transactions: Transactions = [
    {
      id: 57748983,
      level: 1538313,
      timestamp: '2021-06-30T23:14:02Z',
      block: 'BL5xTVbe9scory2BMWjXBCceDFmhRprmFzaSgArS6G6i5o2CvWw',
      hash: 'onwKwGyCPt2RQoBrrAMSRkQqXSrJP4TYPAgwm879VJhMH5on71t',
      counter: 11549406,
      sender: {
        alias: 'NFT PROTECTOR',
        address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      },
      target: {
        alias: 'objkt.com Marketplace',
        address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      },
      parameter: {
        entrypoint: 'bid',
        value: {
          fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
          artist: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
          objkt_id: '127280',
          royalties: '200',
        },
      },
      amount: 10000000,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        asks: 5909,
        bids: 5910,
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        ask_id: '1',
        bid_id: '1',
        metadata: 5911,
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5910,
          path: 'bids',
          action: 'add_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              fa2: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
              artist: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
              issuer: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
              objkt_id: '127280',
              royalties: '200',
              xtz_per_objkt: '10000000',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktBidHandler]);

  expect(events).toStrictEqual([
    {
      id: '6527967e1eb9f9161bf1bd9bba35a8a8',
      type: 'OBJKT_BID',
      opid: 57748983,
      timestamp: '2021-06-30T23:14:02Z',
      level: 1538313,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '127280',
      bid_id: '0',
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      royalties: '200',
      price: '10000000',
    },
  ]);
});
