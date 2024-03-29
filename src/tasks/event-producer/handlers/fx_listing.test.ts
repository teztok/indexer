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
      nonce: null,
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
      nonce: null,
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
    {
      id: 491890330828800,
      level: 3242291,
      timestamp: '2023-03-20T11:20:59Z',
      block: 'BLkcgaobj9khvuS1txjueJK6VbmaVURqgUHtogzRXFTXQPiBy1t',
      hash: 'oohwztNqzvyypiDenVUQpnDzF7XXCtSLYQsieynTtvwozzd27J4',
      counter: 83347388,
      sender: {
        address: 'tz1QPQFwE98bF5KcYW9RFpDcq8g5i82XYtMU',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'listing',
        value: {
          gentk: {
            id: '438',
            version: '2',
          },
          price: '38000000',
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
        offers_count: '57744',
        auctions_count: '0',
        listings_count: '926176',
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
            hash: 'exprvQq7PRoeEKQY9pCAQfoNgqU1EYwN15QZbfDzrhEPXyN5pmFk4V',
            key: '926175',
            value: {
              gentk: {
                id: '438',
                version: '2',
              },
              price: '38000000',
              seller: 'tz1QPQFwE98bF5KcYW9RFpDcq8g5i82XYtMU',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [FxListingHandler]);

  expect(events).toStrictEqual([
    {
      id: 'f859e6a826e1fb498d9a1d2e185b8f5e',
      type: 'FX_LISTING',
      opid: '207514809',
      ophash: 'oouuaCvwnFkyR21cVWGs1tfHJojx5X3F8ywC8EmSxtG8xgFmkBR',
      timestamp: '2022-04-16T12:02:59Z',
      level: 2285824,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '187388',
      swap_id: '1',
      seller_address: 'tz1ck6scdncLedJyVViJfrfHwP3DVfxEBg5f',
      price: '135000000',
    },
    {
      id: '59ac33757e388050d130c957610ef81d',
      type: 'FX_LISTING',
      opid: '207517629',
      ophash: 'op9GNf8V92qJZvWnhMp5UxmbCoU8PXtBaYFE7DedsMBqniCenKR',
      timestamp: '2022-04-16T12:05:59Z',
      level: 2285830,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '589217',
      swap_id: '5',
      seller_address: 'tz1Lup7XznCYm746dZQScwDgfP8bjYbB1See',
      price: '3000000',
    },
    {
      id: 'b78d42a1dcd9cd4c44c7b073eff5dcf6',
      type: 'FX_LISTING',
      opid: '491890330828800',
      ophash: 'oohwztNqzvyypiDenVUQpnDzF7XXCtSLYQsieynTtvwozzd27J4',
      timestamp: '2023-03-20T11:20:59Z',
      level: 3242291,
      fa2_address: 'KT1EfsNuqwLAWDd3o4pvfUx1CAh5GMdTrRvr',
      token_id: '438',
      swap_id: '926175',
      seller_address: 'tz1QPQFwE98bF5KcYW9RFpDcq8g5i82XYtMU',
      price: '38000000',
    },
  ]);
});
