import FxListingHandler from './fx_listing';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_LISTING events', async () => {
  const transactions: Transactions = [
    {
      id: 207514809,
      level: 2285824,
      timestamp: '2022-04-16T12:02:59Z',
      block: 'BLWTzH4exQsgNgRnmidHupNtty5LPhodzHMrGMPtW6kSqFxcUvn',
      hash: 'oouuaCvwnFkyR21cVWGs1tfHJojx5X3F8ywC8EmSxtG8xgFmkBR',
      counter: 41683191,
      sender: {
        address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      },
      target: {
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'listing',
        value: {
          gentk: {
            id: '187388',
            version: '0',
          },
          price: '135000000',
        },
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
        listings_count: '2',
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
          action: 'add_key',
          content: {
            hash: 'expru2dKqDfZG8hu4wNGkiyunvq2hdSKuVYtcKta7BWP6Q18oNxKjS',
            key: '1',
            value: {
              gentk: {
                id: '187388',
                version: '0', // 0 => KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE, 1 => KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi
              },
              price: '135000000',
              seller: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
            },
          },
        },
      ],
    },
    {
      id: 207517629,
      level: 2285830,
      timestamp: '2022-04-16T12:05:59Z',
      block: 'BKmZjxWhfeFHxJ87zt81GWZR2T2Hic2AZr9cwWg7pe8ZsfB5Dci',
      hash: 'op9GNf8V92qJZvWnhMp5UxmbCoU8PXtBaYFE7DedsMBqniCenKR',
      counter: 57459211,
      sender: {
        address: 'tz1Lup7XznCYm746dZQScwDgfP8bjYbB1See',
      },
      target: {
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'listing',
        value: {
          gentk: {
            id: '589217',
            version: '1',
          },
          price: '3000000',
        },
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
        listings_count: '6',
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
          action: 'add_key',
          content: {
            hash: 'exprtqoNj2hRg8PsPMaXLcy3dXjMM3B7nHKrRNqpfjbYpMbULbRj8k',
            key: '5',
            value: {
              gentk: {
                id: '589217',
                version: '1',
              },
              price: '3000000',
              seller: 'tz1Lup7XznCYm746dZQScwDgfP8bjYbB1See',
            },
          },
        },
      ],
    },
  ];

  const events = transactionsToEvents(transactions, [FxListingHandler]);

  expect(events).toStrictEqual([
    {
      id: 'cdec227a895401fb08b5b14422626d6d',
      type: 'FX_LISTING',
      opid: 207514809,
      timestamp: '2022-04-16T12:02:59Z',
      level: 2285824,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '187388',
      swap_id: '1',
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      price: '135000000',
    },
    {
      id: '9beaebaa87a3b35f348db8585e1abbf8',
      type: 'FX_LISTING',
      opid: 207517629,
      timestamp: '2022-04-16T12:05:59Z',
      level: 2285830,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '589217',
      swap_id: '5',
      seller_address: 'tz1Lup7XznCYm746dZQScwDgfP8bjYbB1See',
      price: '3000000',
    },
  ]);
});
