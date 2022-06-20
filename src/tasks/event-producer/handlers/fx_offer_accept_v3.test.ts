import FxOfferAcceptV3Handler from './fx_offer_accept_v3';
import { transactionsToEvents } from '../event-producer';
import { Transactions } from '../../../types';

test('creates FX_OFFER_ACCEPT_V3 events', async () => {
  const transactions: Transactions = [
    {
      id: 245776706,
      level: 2405180,
      timestamp: '2022-05-29T00:15:29Z',
      block: 'BMA2ShiLedfYNNUXB1s49DgtQvHGiMXwfnwuUz7ZEChd4ZtNh7m',
      hash: 'oova8jdZVSUeSPn7EPFG8bs49TaLdAZ2zpZGN6rqnvcGBNixnCa',
      counter: 38986618,
      sender: {
        address: 'tz1b8gWg7Xa28LEuFzxcXXU9Se5K4smaVpyX',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'offer_accept',
        value: '92',
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
        offers_count: '110',
        auctions_count: '0',
        listings_count: '154450',
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
            hash: 'expruHSjus2EEj2vTo5xhJcyUCjSL46cUBfkPXASXs9uvbakTdcy2Q',
            key: '92',
            value: {
              buyer: 'tz1XBuBrXhvLqG4YXXWE6z7bZyU7Mx6F2fiu',
              gentk: {
                id: '82538',
                version: '0',
              },
              price: '175000000',
            },
          },
        },
      ],
      nonce: null,
    },
    {
      id: 245933460,
      level: 2405745,
      timestamp: '2022-05-29T05:06:14Z',
      block: 'BMHCAFpkprqZ61i6T4RdpkEw8iqgqa6fWXC4m1kvZuAwUMR6wg4',
      hash: 'opaFLXk3FqaFSJ3yCwmfs3mfxa2M2KCnaq9PRTeNjEhkANWmxfV',
      counter: 50230048,
      sender: {
        address: 'tz1imDV9xxaN5k674DnfPeU9maCSzWXS4eAE',
      },
      target: {
        alias: 'FXHASH Marketplace v2',
        address: 'KT1GbyoDi7H1sfXmimXpptZJuCdHMh66WS9u',
      },
      amount: 0,
      parameter: {
        entrypoint: 'offer_accept',
        value: '206',
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
        offers_count: '208',
        auctions_count: '0',
        listings_count: '154866',
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
            hash: 'exprtbpy51t28kZC6fiaASpveFTFjjCpH3TB6hEquDvk2HjvxPLBYX',
            key: '206',
            value: {
              buyer: 'tz2UgqLJG8ZHyn9hfKjGPHQVdZZS9gquKh1q',
              gentk: {
                id: '734790',
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

  const events = transactionsToEvents(transactions, [FxOfferAcceptV3Handler]);

  expect(events).toStrictEqual([
    {
      id: '6472451f34842e106d0364bda0242c1e',
      type: 'FX_OFFER_ACCEPT_V3',
      implements: 'SALE',
      opid: 245776706,
      ophash: 'oova8jdZVSUeSPn7EPFG8bs49TaLdAZ2zpZGN6rqnvcGBNixnCa',
      timestamp: '2022-05-29T00:15:29Z',
      level: 2405180,
      price: '175000000',
      fa2_address: 'KT1KEa8z6vWXDJrVqtMrAeDVzsvxat3kHaCE',
      token_id: '82538',
      offer_id: '92',
      seller_address: 'tz1b8gWg7Xa28LEuFzxcXXU9Se5K4smaVpyX',
      buyer_address: 'tz1XBuBrXhvLqG4YXXWE6z7bZyU7Mx6F2fiu',
    },
    {
      id: 'ca20076f05852774445689786f257222',
      type: 'FX_OFFER_ACCEPT_V3',
      implements: 'SALE',
      opid: 245933460,
      ophash: 'opaFLXk3FqaFSJ3yCwmfs3mfxa2M2KCnaq9PRTeNjEhkANWmxfV',
      timestamp: '2022-05-29T05:06:14Z',
      level: 2405745,
      price: '10000000',
      fa2_address: 'KT1U6EHmNxJTkvaWJ4ThczG4FSDaHC21ssvi',
      token_id: '734790',
      offer_id: '206',
      seller_address: 'tz1imDV9xxaN5k674DnfPeU9maCSzWXS4eAE',
      buyer_address: 'tz2UgqLJG8ZHyn9hfKjGPHQVdZZS9gquKh1q',
    },
  ]);
});
