import TeiaSplitContractSignEvent from './teia_split_contract_sign';
import { transactionsToEvents } from '../../../tasks/event-producer/event-producer';
import { Transactions } from '../../../types';

test('creates TEIA_SPLIT_CONTRACT_SIGN events', async () => {
  const transactions: Transactions = [
    {
      id: 72421103108096,
      level: 1630343,
      timestamp: '2021-08-22T21:20:16Z',
      block: 'BMCFN15S35gRiTPfXKkqAfUVb4Q7qeS8JDudVCGgcPpvgGvQrHF',
      hash: 'onsxwCXTq829TzuCA8DDTiafWWVvTiEpFjnezyNT8LM91V2bwcV',
      counter: 11941311,
      sender: {
        alias: '1x1',
        address: 'tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ',
      },
      target: {
        address: 'KT1BcLnWRziLDNJNRn3phAANKrEBiXhytsMY',
      },
      amount: 0,
      parameter: {
        entrypoint: 'sign',
        value: '220388',
      },
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: 9907,
      diffs: [
        {
          bigmap: 9907,
          path: '',
          action: 'add_key',
          content: {
            hash: 'expru7KU1pJ3iqK9T4hJT8aLa4GJwkD5thkDoAtqNQ61jVhDjTALLR',
            key: {
              nat: '220388',
              address: 'tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ',
            },
            value: {},
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [TeiaSplitContractSignEvent]);

  expect(events).toStrictEqual([
    {
      id: '61bbacf0afb14a52132c1035760be5cc',
      type: 'TEIA_SPLIT_CONTRACT_SIGN',
      opid: '72421103108096',
      level: 1630343,
      ophash: 'onsxwCXTq829TzuCA8DDTiafWWVvTiEpFjnezyNT8LM91V2bwcV',
      timestamp: '2021-08-22T21:20:16Z',
      owner_address: 'tz1YJvMiZyXnzvV9pxtAiuCFvaG7XoBZhbUQ',
      fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
      token_id: '220388',
    },
  ]);
});
