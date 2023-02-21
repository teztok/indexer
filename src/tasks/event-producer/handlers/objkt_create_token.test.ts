import ObjktCreateTokenHandler from './objkt_create_token';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates OBJKT_CREATE_TOKEN events', async () => {
  const transactions: Transactions = [
    {
      id: 464433999511552,
      level: 3150451,
      timestamp: '2023-02-16T09:24:44Z',
      block: 'BKxVN2iSVbATG9FE5ZpeREGawr9kJ4HJz6Xv4SX7U3sRRAL8DaY',
      hash: 'onzEiVRuhgHkAVAQhinVkQfU9EJB52CfesHKRiGqrYynxSfUj22',
      counter: 61118644,
      sender: {
        address: 'tz2Dz5UbqBSaLq1HmP3kimoCyPYjLb7aXwFe',
      },
      target: {
        address: 'KT1NuUtVpKJgWEcWVDhGPhNRkygqeiTgRhGk',
      },
      amount: 0,
      parameter: {
        entrypoint: 'create_token',
        value: {
          '': '697066733a2f2f516d62735a636f79676f6e7553387547525066734231345759514b586b4447516244424165674457616862454e54',
        },
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        claims: 386580,
        ledger: 386581,
        locked: 386582,
        supply: 386586,
        claimed: 386579,
        managers: 386583,
        metadata: 386584,
        operators: 386585,
        administrator: 'tz2Dz5UbqBSaLq1HmP3kimoCyPYjLb7aXwFe',
        last_token_id: '1',
        token_metadata: 386587,
      },
      diffs: [
        {
          bigmap: 386587,
          path: 'token_metadata',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              token_id: '1',
              token_info: {
                '': '697066733a2f2f516d62735a636f79676f6e7553387547525066734231345759514b586b4447516244424165674457616862454e54',
              },
            },
          },
        },
        {
          bigmap: 386586,
          path: 'supply',
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: '0',
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [ObjktCreateTokenHandler]);

  expect(events).toStrictEqual([
    {
      id: 'b1bccac4c5e19f989dfa4fd515875ec5',
      type: 'OBJKT_CREATE_TOKEN',
      opid: '464433999511552',
      ophash: 'onzEiVRuhgHkAVAQhinVkQfU9EJB52CfesHKRiGqrYynxSfUj22',
      timestamp: '2023-02-16T09:24:44Z',
      level: 3150451,
      fa2_address: 'KT1NuUtVpKJgWEcWVDhGPhNRkygqeiTgRhGk',
      artist_address: 'tz2Dz5UbqBSaLq1HmP3kimoCyPYjLb7aXwFe',
      is_verified_artist: true,
      token_id: '1',
      editions: '0',
      metadata_uri: 'ipfs://QmbsZcoygonuS8uGRPfsB14WYQKXkDGQbDBAegDWahbENT',
    },
  ]);
});
