import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';
import FxCancelOfferHandler from './fx_cancel_offer';

test('creates FX_CANCEL_OFFER events', async () => {
  const transactions: Transactions = [
    {
      id: 108312464,
      level: 18543631,
      timestamp: '2021-11-11T10:26:38Z',
      block: 'BKuNvimbV1DtKEm9NMTtXTNFVE2MgpxGmtYgWDdnLUvGwBGujta',
      hash: 'ooFDnSYyKxZjEfsyvr54k1ZZFKpQ36yhPrSEF1KTmTqXo59BP2g',
      counter: 17580944,
      nonce: null,
      sender: {
        alias: 'pale kirill',
        address: 'tz1U9ZoiU5HRvQD29kjK1roSUiLDamMrjDJ9',
      },
      target: {
        alias: 'FXHASH Marketplace',
        address: 'KT1Xo5B7PNBAeynZPmca4bRh6LQow4og1Zb9',
      },
      parameter: {
        entrypoint: 'cancel_offer',
        value: '18',
      },
      amount: 0,
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '25',
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        objkts: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
        offers: 22799,
        counter: '20',
        enabled: true,
        metadata: 22798,
        treasury: 'tz1dtzgLYUHMhP6sWeFtFsHkHqyPezBBPLsZ',
      },
      diffs: [
        {
          bigmap: 22799,
          path: 'offers',
          action: 'remove_key',
          content: {
            hash: 'expruWifKZdDCFGUaA8nKmtuNQCGAYx7jacBdMfmKC4QdqJc31rKuQ',
            key: '18',
            value: {
              price: '10000000',
              issuer: 'tz1U9ZoiU5HRvQD29kjK1roSUiLDamMrjDJ9',
              creator: 'tz1WZuFdbESHfBSvoBeao1Wkt7NCyUuXAT9D',
              objkt_id: '950',
              royalties: '100',
              objkt_amount: '1',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxCancelOfferHandler]);

  expect(events).toStrictEqual([
    {
      id: '967af174379728f2bbbf326a27fcf56e',
      type: 'FX_CANCEL_OFFER',
      opid: 108312464,
      ophash: 'ooFDnSYyKxZjEfsyvr54k1ZZFKpQ36yhPrSEF1KTmTqXo59BP2g',
      timestamp: '2021-11-11T10:26:38Z',
      level: 18543631,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      seller_address: 'tz1U9ZoiU5HRvQD29kjK1roSUiLDamMrjDJ9',
      artist_address: 'tz1WZuFdbESHfBSvoBeao1Wkt7NCyUuXAT9D',
      token_id: '950',
      offer_id: '18',
    },
  ]);
});
