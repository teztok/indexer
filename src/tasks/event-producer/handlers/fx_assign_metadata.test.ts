import FxAssignMetadataHandler from './fx_assign_metadata';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_ASSIGN_METADATA events', async () => {
  const transactions: Transactions = [
    {
      id: 104377961,
      level: 1832239,
      timestamp: '2021-11-03T12:29:02Z',
      block: 'BKiQQrBL9aAnXRS7HhBmC7pLyXevB8cDaRb5sXhCEFqswqziJPd',
      hash: 'onvDoT2ZnvsaHXDEAnZaLbyKycnFWiaGNh4QtsDhmt6EQTD44AC',
      counter: 34009592,
      sender: {
        address: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
      },
      target: {
        alias: 'FXHASH GENTK',
        address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      },
      parameter: {
        entrypoint: 'assign_metadata',
        value: {
          metadata: {
            '': '697066733a2f2f516d506d503563565846683354664b77533751664b4c424d694b3965654c36784c71787768464762636b6470526a',
          },
          token_id: '0',
        },
      },
      amount: 0,
      status: 'applied',
      hasInternals: false,
      initiator: null,
      storage: {
        issuer: 'KT1AEVuykWeuuFX7QkEAMNtffzwhe1Z98hJS',
        ledger: 22785,
        paused: false,
        signer: 'tz1e8XGv6ngNoLt1ZNkEi6sG1A39yF48iwdS',
        metadata: 22786,
        operators: 22787,
        all_tokens: '1',
        token_data: 22788,
        administrator: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        token_metadata: 22789,
        treasury_address: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 22789,
          path: 'token_metadata',
          action: 'update_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              token_id: '0',
              token_info: {
                '': '697066733a2f2f516d506d503563565846683354664b77533751664b4c424d694b3965654c36784c71787768464762636b6470526a',
              },
            },
          },
        },
        {
          bigmap: 22788,
          path: 'token_data',
          action: 'update_key',
          content: {
            hash: 'exprtZBwZUeYYYfUs9B9Rg2ywHezVHnCCnmF9WsDQVrs582dSK63dC',
            key: '0',
            value: {
              assigned: true,
              issuer_id: '0',
              iteration: '1',
              royalties: '100',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxAssignMetadataHandler]);

  expect(events).toStrictEqual([
    {
      id: '6ab8d21f564035e64f4086050649910f',
      type: 'FX_ASSIGN_METADATA',
      opid: 104377961,
      timestamp: '2021-11-03T12:29:02Z',
      level: 1832239,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '0',
      metadata_uri: 'ipfs://QmPmP5cVXFh3TfKwS7QfKLBMiK9eeL6xLqxwhFGbckdpRj',
    },
  ]);
});
