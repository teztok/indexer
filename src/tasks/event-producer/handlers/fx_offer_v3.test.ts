import FxOfferV3Handler from './fx_offer_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_OFFER_V3 events', async () => {
  const transactions: Transactions = [
    {
      id: 245621107,
      level: 2404663,
      timestamp: '2022-05-28T19:54:29Z',
      block: 'BL8Wbm3eZC96qG61XWnWwkujyEep4ZRPcEJDrWa4oDvidEF2rz2',
      hash: 'opPbQYZZkDE1NBz81SC9hqRJcM8jQGyv3WQq6j2azjrJ91YsJBX',
      counter: 62869972,
      sender: {
        address: 'tz1gcwAKQXcHwtciPbqfjyQWzy2XGsVD2G1M',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 50000000,
      parameter: {
        entrypoint: 'offer',
        value: {
          gentk: {
            id: '384511',
            version: '0',
          },
          price: '50000000',
        },
      },
      status: 'applied',
      hasInternals: false,
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
        offers_count: '4',
        auctions_count: '0',
        listings_count: '153797',
        gentk_contracts: 149786,
        extended_storage: 149785,
        collection_offers: 149783,
        entrypoints_enabled: 149784,
        auctions_bid_increments: 149782,
        collection_offers_count: '0',
      },
      diffs: [
        {
          bigmap: 149789,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'exprujyHLX2vacVy6AcFmAt5K3Y93aMtccrbNtcsCRik6fjxR8wL6x',
            key: '3',
            value: {
              buyer: 'tz1gcwAKQXcHwtciPbqfjyQWzy2XGsVD2G1M',
              gentk: {
                id: '384511',
                version: '0',
              },
              price: '50000000',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 245650293,
      level: 2404756,
      timestamp: '2022-05-28T20:42:44Z',
      block: 'BLvGtPx1dZv6pbwdjK38keWQF1pTaa8ZfwLaTHy1232H5iDWNSY',
      hash: 'oooCupYx1XYhyPs9suSh6sJXrgVtd7CAL6qC1bdjiThHEhhWcsg',
      counter: 51049151,
      sender: {
        address: 'tz1ScVvkxWGyx1zmozaGSCzD1fSUzSbEQobg',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 10000000,
      parameter: {
        entrypoint: 'offer',
        value: {
          gentk: {
            id: '656529',
            version: '1',
          },
          price: '10000000',
        },
      },
      status: 'applied',
      hasInternals: false,
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
        offers_count: '60',
        auctions_count: '0',
        listings_count: '153968',
        gentk_contracts: 149786,
        extended_storage: 149785,
        collection_offers: 149783,
        entrypoints_enabled: 149784,
        auctions_bid_increments: 149782,
        collection_offers_count: '0',
      },
      diffs: [
        {
          bigmap: 149789,
          path: 'offers',
          action: 'add_key',
          content: {
            hash: 'exprusK5pdoJ1bFvmTyUcNUWop8QQvMHynjbiyEBib6XcrYfNnC8hs',
            key: '59',
            value: {
              buyer: 'tz1ScVvkxWGyx1zmozaGSCzD1fSUzSbEQobg',
              gentk: {
                id: '656529',
                version: '1',
              },
              price: '10000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [FxOfferV3Handler]);

  expect(events).toStrictEqual([
    {
      id: 'b5f2bc7187900683c90e70518f201607',
      type: 'FX_OFFER_V3',
      opid: 245621107,
      ophash: 'opPbQYZZkDE1NBz81SC9hqRJcM8jQGyv3WQq6j2azjrJ91YsJBX',
      timestamp: '2022-05-28T19:54:29Z',
      level: 2404663,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '384511',
      offer_id: '3',
      buyer_address: 'tz1gcwAKQXcHwtciPbqfjyQWzy2XGsVD2G1M',
      price: '50000000',
    },
    {
      id: '7c0280050b1adf2a34e0c70530480609',
      type: 'FX_OFFER_V3',
      opid: 245650293,
      ophash: 'oooCupYx1XYhyPs9suSh6sJXrgVtd7CAL6qC1bdjiThHEhhWcsg',
      timestamp: '2022-05-28T20:42:44Z',
      level: 2404756,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '656529',
      offer_id: '59',
      buyer_address: 'tz1ScVvkxWGyx1zmozaGSCzD1fSUzSbEQobg',
      price: '10000000',
    },
  ]);
});
