import ObjktRetractBidHandler from './objkt_retract_bid';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_RETRACT_BID events', async () => {
  const transactions: Transactions = [
    {
      id: 57865771,
      level: 1539482,
      timestamp: '2021-07-01T20:10:38Z',
      block: 'BKiYJX5cSSkm5NfCtQDLtDsXRMNPxWS1PzcewfRGx7M9RQcvstz',
      hash: 'opS9PgFDmtnTzQZg36zjP43UBYCQ53DppoUwTnB8yqtQBsvoUyW',
      counter: 11549422,
      sender: {
        alias: 'NFT PROTECTOR',
        address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      },
      target: {
        alias: 'objkt.com Marketplace',
        address: 'KT1FvqJwEDWb1Gwc55Jd1jjTHRVWbYKUUpyq',
      },
      parameter: {
        entrypoint: 'retract_bid',
        value: '0',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        asks: 5909,
        bids: 5910,
        admin: 'tz1TWrPXuG3T3rR9NR5EqsBegJMwiMcobjkt',
        ask_id: '6',
        bid_id: '6',
        metadata: 5911,
        management_fee: '25',
      },
      diffs: [
        {
          bigmap: 5910,
          path: 'bids',
          action: 'remove_key',
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

  const events = transactionsToEvents(transactions, [ObjktRetractBidHandler]);

  expect(events).toStrictEqual([
    {
      id: 'a2d44572b30d2164565cc9544531c144',
      type: 'OBJKT_RETRACT_BID',
      opid: 57865771,
      timestamp: '2021-07-01T20:10:38Z',
      level: 1539482,
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      buyer_address: 'tz1QGCWjNpYmcS6T9qFGYSam25e36WeFUCK4',
      artist_address: 'tz1aWL8AMR6CH4NMdUuiLekQbQ5TPYMzvtuQ',
      token_id: '127280',
      bid_id: '0',
    },
  ]);
});
