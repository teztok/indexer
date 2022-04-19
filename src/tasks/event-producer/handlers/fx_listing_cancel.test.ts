import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';
import FxListingCancelHandler from './fx_listing_cancel';

test('creates FX_LISTING_CANCEL events', async () => {
  const transactions: Transactions = [
    {
      id: 207527459,
      level: 2285848,
      timestamp: '2022-04-16T12:14:59Z',
      block: 'BL7MdPXpjqCikMjWR6HXUjgjMgr7c9NDzGnDHayLmSuyfLoFMm8',
      hash: 'oodG3h8rToYUxngHFnX78Kh4NrtyTndyNPXkGhVVjCTfM11kBNa',
      counter: 12802269,
      sender: {
        alias: 'CyberBruxo',
        address: 'tz1ZGnmYWGtEyjUWYGgLd9V9fmKdnYMtjBCd',
      },
      target: {
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'listing_cancel',
        value: '43',
      },
      status: 'applied',
      hasInternals: true,
      initiator: null,
      storage: {
        fees: '25',
        admin: 'tz1fepn7jZsCYBqCDhpM63hzh9g2Ytqk4Tpv',
        offers: 149789,
        paused: false,
        big_map: 149790,
        auctions: 149781,
        listings: 149787,
        metadata: 149815,
        treasury: 'KT1P2BXYb894MekrCcSrnidzQYPVqitLoVLc',
        locked_eps: false,
        offers_count: '0',
        auctions_count: '0',
        listings_count: '55',
        gentk_contracts: 149786,
        extended_storage: 149785,
        collection_offers: 149783,
        entrypoints_enabled: 149784,
        auctions_bid_increments: 149782,
        collection_offers_count: '0',
      },
      diffs: [
        {
          bigmap: 149787,
          path: 'listings',
          action: 'remove_key',
          content: {
            hash: 'exprvA6TEdGGrERHP57dccSa2aX8DYqbi3zTkrodxjUpxgtm8SYDKa',
            key: '43',
            value: {
              gentk: {
                id: '589189',
                version: '1',
              },
              price: '5000000',
              seller: 'tz1ZGnmYWGtEyjUWYGgLd9V9fmKdnYMtjBCd',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxListingCancelHandler]);

  expect(events).toStrictEqual([
    {
      id: '49285213fd457e9f5bd7f66ff74f59fb',
      type: 'FX_LISTING_CANCEL',
      opid: 207527459,
      timestamp: '2022-04-16T12:14:59Z',
      level: 2285848,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      seller_address: 'tz1ZGnmYWGtEyjUWYGgLd9V9fmKdnYMtjBCd',
      token_id: '589189',
      swap_id: '43',
    },
  ]);
});
