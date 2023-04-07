import FxCollectionOfferAcceptHandler from './fx_collection_offer_accept';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_COLLECTION_OFFER_ACCEPT events', async () => {
  const transactions: Transactions = [
    {
      id: 512356021960704,
      level: 3317722,
      timestamp: '2023-04-07T08:36:55Z',
      block: 'BMbYuM6DLNfQqZUGkLBJRZRWqXaVoMAg93gxKzNn32LrRX8u6a8',
      hash: 'op54zmec5ngUebBZwUyLtKvttuLhUjgyMiDfDkiAV1TxDKrfYFL',
      counter: 35305795,
      sender: {
        address: 'tz1hsC7LKroo96tCZhiZwvcmi2RwQ7gfzdc1',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'collection_offer_accept',
        value: {
          gentk: {
            id: '973975',
            version: '1',
          },
          offer_id: '422',
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
        offers_count: '59146',
        auctions_count: '0',
        listings_count: '939245',
        gentk_contracts: 149786,
        extended_storage: 149785,
        collection_offers: 149783,
        entrypoints_enabled: 149784,
        auctions_bid_increments: 149782,
        collection_offers_count: '929',
      },
      diffs: [
        {
          bigmap: 149783,
          path: 'collection_offers',
          action: 'update_key',
          content: {
            hash: 'expru8RKdyAgLN4qzydubiqdGX18NqTWMg6xJxaymMrwc2YuoMFNzn',
            key: '422',
            value: {
              buyer: 'tz1UTifrX1UijdHnidyw3ZrYVNAiQpZ3XkB4',
              price: '6000000',
              amount: '0',
              collection: '16182',
            },
          },
        },
      ],
      nonce: null,
    },
  ];

  const events = transactionsToEvents(transactions, [FxCollectionOfferAcceptHandler]);

  expect(events).toStrictEqual([
    {
      id: 'de4798252496b0681bba0a2d85b21363',
      type: 'FX_COLLECTION_OFFER_ACCEPT',
      implements: 'SALE',
      opid: '512356021960704',
      ophash: 'op54zmec5ngUebBZwUyLtKvttuLhUjgyMiDfDkiAV1TxDKrfYFL',
      timestamp: '2023-04-07T08:36:55Z',
      level: 3317722,
      price: '6000000',
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '973975',
      offer_id: '422',
      seller_address: 'tz1hsC7LKroo96tCZhiZwvcmi2RwQ7gfzdc1',
      buyer_address: 'tz1UTifrX1UijdHnidyw3ZrYVNAiQpZ3XkB4',
    },
  ]);
});
