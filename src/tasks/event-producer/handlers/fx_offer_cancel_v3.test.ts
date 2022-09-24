import FxOfferCancelHandler from './fx_offer_cancel_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_OFFER_CANCEL_V3 events', async () => {
  const transactions: Transactions = [
    {
      id: 245634327,
      level: 2404703,
      timestamp: '2022-05-28T20:16:14Z',
      block: 'BMXhKP4pQZdV9JDoMvEEC6prweXmokwEd6sL84PfWMwdMaikZjB',
      hash: 'opYAFeSWwUsE2HR8NUcUDxwMRYBXv6UioHPKPrBtirtV3jG8tZN',
      counter: 62869973,
      sender: {
        address: 'tz1gcwAKQXcHwtciPbqfjyQWzy2XGsVD2G1M',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'offer_cancel',
        value: '3',
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
        offers_count: '28',
        auctions_count: '0',
        listings_count: '153910',
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
          action: 'remove_key',
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
      id: 245626926,
      level: 2404679,
      timestamp: '2022-05-28T20:04:14Z',
      block: 'BKpaqBt17zdCXLVg9LFiHD6ZQMCxDT5RizqzTfugbBiu8LXFXri',
      hash: 'opHDV5eSnRMfPXMpqGTRN632b1fCPoCRr8gjhchrrK2xKB3fSso',
      counter: 44647116,
      sender: {
        alias: 'teus.will',
        address: 'tz1fg6ZiNhZiZtzco7279bRkbK2NwJ24Sb1K',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'offer_cancel',
        value: '7',
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
        offers_count: '16',
        auctions_count: '0',
        listings_count: '153851',
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
          action: 'remove_key',
          content: {
            hash: 'exprufunBN3FAVpZ21WXquoqiNyWB2PvYy1njkP4wHGtMexdKtcJEM',
            key: '7',
            value: {
              buyer: 'tz1fg6ZiNhZiZtzco7279bRkbK2NwJ24Sb1K',
              gentk: {
                id: '751692',
                version: '1',
              },
              price: '1000000',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [FxOfferCancelHandler]);

  expect(events).toStrictEqual([
    {
      id: '06a089cbe44da4331afc3871c716be4c',
      type: 'FX_OFFER_CANCEL_V3',
      opid: '245634327',
      ophash: 'opYAFeSWwUsE2HR8NUcUDxwMRYBXv6UioHPKPrBtirtV3jG8tZN',
      timestamp: '2022-05-28T20:16:14Z',
      level: 2404703,
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '384511',
      buyer_address: 'tz1gcwAKQXcHwtciPbqfjyQWzy2XGsVD2G1M',
      offer_id: '3',
    },
    {
      id: '8aee948e2cded83ea7a48098b37c38b8',
      type: 'FX_OFFER_CANCEL_V3',
      opid: '245626926',
      ophash: 'opHDV5eSnRMfPXMpqGTRN632b1fCPoCRr8gjhchrrK2xKB3fSso',
      timestamp: '2022-05-28T20:04:14Z',
      level: 2404679,
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '751692',
      buyer_address: 'tz1fg6ZiNhZiZtzco7279bRkbK2NwJ24Sb1K',
      offer_id: '7',
    },
  ]);
});
