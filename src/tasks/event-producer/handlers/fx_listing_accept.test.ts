import FxListingAccept from './fx_listing_accept';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_LISTING_ACCEPT events', async () => {
  const transactions: Transactions = [
    {
      id: 207520063,
      level: 2285835,
      timestamp: '2022-04-16T12:08:29Z',
      block: 'BMGf93FJ9FjHWZciyads7XsCm6pcZRzVXLuEqSHzGPCeJ4Bpr4J',
      hash: 'onpRaiL2DF3sxcXmApjw12skXQkkxxCWzP66mtG493Km7MCe5T4',
      counter: 24098778,
      sender: {
        address: 'tz1RxdMQhHoQKxmtwqEC8h5yLHVghHdEPqEk',
      },
      target: {
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 5000000,
      parameter: {
        entrypoint: 'listing_accept',
        value: '12',
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
        listings_count: '27',
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
            hash: 'expruSKSLw7MS3ou3pPd7MUXy5QDPtVvkUNF4yWS2g6n8mXGzDJCG7',
            key: '12',
            value: {
              gentk: {
                id: '589192',
                version: '1',
              },
              price: '5000000',
              seller: 'tz1f61r3F66tAGPwPfxFNveCVohX1fpiprZP',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxListingAccept]);

  expect(events).toStrictEqual([
    {
      id: '3af918e6fe110712a931195cd19e027c',
      type: 'FX_LISTING_ACCEPT',
      implements: 'SALE',
      opid: 207520063,
      timestamp: '2022-04-16T12:08:29Z',
      level: 2285835,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '589192',
      swap_id: '12',
      seller_address: 'tz1f61r3F66tAGPwPfxFNveCVohX1fpiprZP',
      buyer_address: 'tz1RxdMQhHoQKxmtwqEC8h5yLHVghHdEPqEk',
      price: '5000000',
    },
  ]);
});
