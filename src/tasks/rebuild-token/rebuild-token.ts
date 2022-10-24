import { run } from 'graphile-worker';
import get from 'lodash/get';
import sum from 'lodash/sum';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import orderBy from 'lodash/orderBy';
import omit from 'lodash/omit';
import chunk from 'lodash/chunk';
import isString from 'lodash/isString';
import findLast from 'lodash/findLast';
import snakeCase from 'lodash/snakeCase';
import { is } from 'superstruct';
import dbConfig from '../../knexfile';
import db from '../../lib/db';
import config from '../../lib/config';
import { getTaskName, isTezLikeCurrency } from '../../lib/utils';
import { Task, Platform, Metadata, Token, AnyListing, AnyOffer, SaleEvent, ObjktListingV2, RoyaltyShares } from '../../types';
import { isValidTezosAddress } from '../../lib/validators';
import { cleanString, cleanUri, cleanAttributes, cleanTags, cleanCreators, cleanFormats, RoyaltySharesSchema } from '../../lib/schemas';
import * as eventsDao from '../../lib/daos/events';
import * as metadataDao from '../../lib/daos/metadata';
import { AnyEvent } from '../event-producer/handlers/index';
import {
  HEN_CONTRACT_MARKETPLACE_V2,
  OBJKT_CONTRACT_MARKETPLACE,
  OBJKT_CONTRACT_MARKETPLACE_V2,
  FX_CONTRACT_MARKETPLACE,
  FX_CONTRACT_MARKETPLACE_V3,
  VERSUM_CONTRACT_MARKETPLACE,
  BURN_ADDRESS,
  TEIA_CONTRACT_MARKETPLACE,
  EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE,
  EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE,
  EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE,
  SALE_INTERFACE,
  FX_CONTRACT_FA2,
  FX_CONTRACT_FA2_V3,
  TYPED_CONTRACT_MARKETPLACE,
  EIGHTSCRIBO_CONTRACT_MARKETPLACE,
  KALAMINT_CONTRACT_FA2,
} from '../../consts';

interface RebuildTokenTaskPayload {
  fa2_address: string;
  token_id: string;
}

function createListingKey(contractAddress: string, id: string) {
  return `${contractAddress}:${id}`;
}

function calcVersumSwapPrice(startPrice: number, endPrice: number, amount: number, amountLeft: number) {
  let priceAdjPerCollect = 0;

  if (startPrice !== endPrice) {
    priceAdjPerCollect = (endPrice - startPrice) / Math.max(1, amount - 1);
  }

  return startPrice + (amount - amountLeft) * priceAdjPerCollect;
}

export function calcPriceDiff(currentPrice: string | null, otherPrice: string | null): string | null {
  if (currentPrice === null || otherPrice === null) {
    return null;
  }

  const currentPriceNum = parseInt(currentPrice, 10);
  const otherPriceNum = parseInt(otherPrice, 10);

  return String(currentPriceNum - otherPriceNum);
}

export function calcPricePct(currentPrice: string | null, otherPrice: string | null): string | null {
  if (currentPrice === null || otherPrice === null) {
    return null;
  }

  const currentPriceNum = parseInt(currentPrice, 10);
  const otherPriceNum = parseInt(otherPrice, 10);

  if (currentPriceNum === 0 && otherPriceNum === 0) {
    return '0';
  }

  if (otherPriceNum === 0) {
    // mathematically not 100% correct. 0 is treated as 1 so that we don't have to deal with infinity.
    return currentPrice;
  }

  if (currentPriceNum === 0) {
    // price dropped 100% to 0
    return '-100';
  }

  return String(Math.floor((currentPriceNum / otherPriceNum - 1) * 100));
}

// TODO: improve the calculation that happens in this function
export function royaltySharesToRoyaltyReceivers(royaltyShares: RoyaltyShares): Array<{ receiver_address: string; royalties: string }> {
  // for now we only support up to 6 decimals
  if (royaltyShares.decimals > 6) {
    return [];
  }

  return Object.entries(royaltyShares.shares).map(([receiverAddress, receiverRoyalties]) => {
    const royaltiesStr: string = isString(receiverRoyalties) ? receiverRoyalties : String(receiverRoyalties);
    let royaltiesStrNormalized = null;

    if (royaltiesStr.length <= royaltyShares.decimals) {
      // TODO: improve
      royaltiesStrNormalized = royaltiesStr.padEnd(6 - (royaltyShares.decimals - royaltiesStr.length), '0');
    } else {
      royaltiesStrNormalized = '1000000'; // 100%
    }

    return {
      receiver_address: receiverAddress,
      royalties: royaltiesStrNormalized,
    };
  });
}

export function compileToken(fa2Address: string, tokenId: string, events: Array<AnyEvent>, metadataStatus: string, metadata?: Metadata) {
  const holders: Record<string, { last_received_at: string; first_received_at: string; amount: number }> = {};
  const listings: Record<string, AnyListing> = {};
  const offers: Record<string, AnyOffer> = {};
  const sales: Array<SaleEvent> = [];
  const royalties: Record<string, string> = {};

  let platform: Platform = null;

  let artistAddress = null;
  let isVerifiedArtist = false;
  let minterAddress = null;
  let metadataUri = null;
  let mintedAt = null;

  let name = null;
  let description = null;
  let eightbidCreatorName = null;
  let eightbidRgb = null;
  let isOnChainToken = false;

  let objktArtistCollectionId = null;
  let fxIssuerId = null;
  let fxIteration = null;

  let eightscriboTitle = null;
  let eightscriboRowone = null;
  let eightscriboRowtwo = null;
  let eightscriboRowthree = null;

  let royaltyReceivers = null;

  if (metadata && metadata.royalties && is(metadata.royalties, RoyaltySharesSchema)) {
    royaltyReceivers = royaltySharesToRoyaltyReceivers(metadata.royalties);
  }

  for (const event of events) {
    if ('implements' in event && event.implements === SALE_INTERFACE) {
      sales.push(event as SaleEvent);
    }

    switch (event.type) {
      case 'SET_LEDGER': {
        const lastAmount = event.holder_address in holders ? holders[event.holder_address].amount : 0;
        const newAmount = parseInt(event.amount, 10);

        if (!(event.holder_address in holders)) {
          holders[event.holder_address] = {
            amount: newAmount,
            last_received_at: event.timestamp,
            first_received_at: event.timestamp,
          };
        } else {
          holders[event.holder_address].amount = newAmount;

          if (newAmount > lastAmount) {
            holders[event.holder_address].last_received_at = event.timestamp;
          }
        }

        if (event.ledger_type === 'NFT_ASSET') {
          for (const holderAddress of Object.keys(holders)) {
            if (holderAddress !== event.holder_address) {
              holders[holderAddress].amount = 0;
            }
          }
        }

        if (event.is_mint) {
          minterAddress = event.holder_address;
          mintedAt = event.timestamp;
        }
        break;
      }

      case 'SET_METADATA':
        if (event.metadata_uri) {
          metadataUri = event.metadata_uri;
        }
        break;

      case 'HEN_MINT':
        platform = 'HEN';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;

        royalties[artistAddress] = event.royalties;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;

      case 'HEN_SWAP_V2': {
        const listingKey = createListingKey(HEN_CONTRACT_MARKETPLACE_V2, event.swap_id);

        const royaltiesArr = Object.entries(royalties);

        if (royaltiesArr.length) {
          const [mintArtistAddress, mintRoyalties] = royaltiesArr[0];

          if (mintArtistAddress !== event.artist_address || mintRoyalties !== event.royalties) {
            // fraudulent swap, ignore
            break;
          }
        }

        listings[listingKey] = {
          type: 'HEN_SWAP_V2',
          contract_address: HEN_CONTRACT_MARKETPLACE_V2,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };
        break;
      }

      case 'HEN_CANCEL_SWAP_V2': {
        const listingKey = createListingKey(HEN_CONTRACT_MARKETPLACE_V2, event.swap_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case 'HEN_COLLECT_V2': {
        const listingKey = createListingKey(HEN_CONTRACT_MARKETPLACE_V2, event.swap_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case 'TEIA_SWAP': {
        const listingKey = createListingKey(TEIA_CONTRACT_MARKETPLACE, event.swap_id);
        const royaltiesArr = Object.entries(royalties);

        if (royaltiesArr.length) {
          const [mintArtistAddress, mintRoyalties] = royaltiesArr[0];

          if (mintArtistAddress !== event.artist_address || mintRoyalties !== event.royalties) {
            // fraudulent swap, ignore
            break;
          }
        }

        listings[listingKey] = {
          type: 'TEIA_SWAP',
          contract_address: TEIA_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'TEIA_CANCEL_SWAP': {
        const listingKey = createListingKey(TEIA_CONTRACT_MARKETPLACE, event.swap_id);
        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }
        break;
      }

      case 'TEIA_COLLECT': {
        const listingKey = createListingKey(TEIA_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case 'OBJKT_MINT_ARTIST': {
        platform = 'OBJKT';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;
        objktArtistCollectionId = event.collection_id;
        break;
      }

      case 'OBJKT_ASK': {
        listings[createListingKey(OBJKT_CONTRACT_MARKETPLACE, event.ask_id)] = {
          type: 'OBJKT_ASK',
          contract_address: OBJKT_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          ask_id: event.ask_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };
        break;
      }

      case 'OBJKT_RETRACT_ASK': {
        const listingKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE, event.ask_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case 'OBJKT_FULFILL_ASK': {
        const listingKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE, event.ask_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case 'OBJKT_ASK_V2': {
        listings[createListingKey(OBJKT_CONTRACT_MARKETPLACE_V2, event.ask_id)] = {
          type: 'OBJKT_ASK_V2',
          contract_address: OBJKT_CONTRACT_MARKETPLACE_V2,
          created_at: event.timestamp,
          ask_id: event.ask_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          currency: event.currency,
          status: 'active',
        };
        break;
      }

      case 'OBJKT_RETRACT_ASK_V2': {
        const listingKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE_V2, event.ask_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case 'OBJKT_FULFILL_ASK_V2': {
        const listingKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE_V2, event.ask_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case 'OBJKT_BID': {
        offers[createListingKey(OBJKT_CONTRACT_MARKETPLACE, event.bid_id)] = {
          type: 'OBJKT_BID',
          contract_address: OBJKT_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          bid_id: event.bid_id,
          buyer_address: event.buyer_address,
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'OBJKT_RETRACT_BID': {
        const offerKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE, event.bid_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'canceled';
        }

        break;
      }

      case 'OBJKT_FULFILL_BID': {
        const offerKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE, event.bid_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'fulfilled';
        }

        break;
      }

      case 'OBJKT_OFFER': {
        offers[createListingKey(OBJKT_CONTRACT_MARKETPLACE_V2, event.offer_id)] = {
          type: 'OBJKT_OFFER',
          contract_address: OBJKT_CONTRACT_MARKETPLACE_V2,
          created_at: event.timestamp,
          offer_id: event.offer_id,
          buyer_address: event.buyer_address,
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'OBJKT_RETRACT_OFFER': {
        const offerKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE_V2, event.offer_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'canceled';
        }

        break;
      }

      case 'OBJKT_FULFILL_OFFER': {
        const offerKey = createListingKey(OBJKT_CONTRACT_MARKETPLACE_V2, event.offer_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'fulfilled';
        }

        break;
      }

      case 'FX_MINT':
      case 'FX_MINT_V2': {
        platform = 'FXHASH';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;
        fxIssuerId = event.issuer_id;
        fxIteration = event.iteration;
        royalties[artistAddress] = event.royalties;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;
      }

      case 'FX_MINT_V3': {
        platform = 'FXHASH';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;
        fxIssuerId = event.issuer_id;
        fxIteration = event.iteration;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;
      }

      case 'FX_OFFER': {
        listings[createListingKey(FX_CONTRACT_MARKETPLACE, event.offer_id)] = {
          type: 'FX_OFFER',
          contract_address: FX_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          offer_id: event.offer_id,
          seller_address: event.seller_address,
          amount: 1,
          amount_left: 1,
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'FX_COLLECT': {
        const listingKey = createListingKey(FX_CONTRACT_MARKETPLACE, event.offer_id);

        if (listingKey in listings) {
          listings[listingKey].amount_left = 0;
          listings[listingKey].status = 'sold_out';
        }

        break;
      }

      case 'FX_CANCEL_OFFER': {
        const listingKey = createListingKey(FX_CONTRACT_MARKETPLACE, event.offer_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case 'FX_LISTING': {
        listings[createListingKey(FX_CONTRACT_MARKETPLACE_V3, event.swap_id)] = {
          type: 'FX_LISTING',
          contract_address: FX_CONTRACT_MARKETPLACE_V3,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: 1,
          amount_left: 1,
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'FX_LISTING_ACCEPT': {
        const listingKey = createListingKey(FX_CONTRACT_MARKETPLACE_V3, event.swap_id);

        if (listingKey in listings) {
          listings[listingKey].amount_left = 0;
          listings[listingKey].status = 'sold_out';
        }

        break;
      }

      case 'FX_LISTING_CANCEL': {
        const listingKey = createListingKey(FX_CONTRACT_MARKETPLACE_V3, event.swap_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case 'FX_OFFER_V3': {
        offers[createListingKey(FX_CONTRACT_MARKETPLACE_V3, event.offer_id)] = {
          type: 'FX_OFFER_V3',
          contract_address: FX_CONTRACT_MARKETPLACE_V3,
          created_at: event.timestamp,
          offer_id: event.offer_id,
          buyer_address: event.buyer_address,
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'FX_OFFER_CANCEL_V3': {
        const offerKey = createListingKey(FX_CONTRACT_MARKETPLACE_V3, event.offer_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'canceled';
        }

        break;
      }

      case 'FX_OFFER_ACCEPT_V3': {
        const offerKey = createListingKey(FX_CONTRACT_MARKETPLACE_V3, event.offer_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'fulfilled';
        }

        break;
      }

      case 'VERSUM_MINT': {
        platform = 'VERSUM';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;
      }

      case 'VERSUM_SWAP': {
        const amount = parseInt(event.amount, 10);

        listings[createListingKey(VERSUM_CONTRACT_MARKETPLACE, event.swap_id)] = {
          type: 'VERSUM_SWAP',
          contract_address: VERSUM_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount,
          amount_left: amount,
          price: String(calcVersumSwapPrice(parseInt(event.start_price, 10), parseInt(event.end_price, 10), amount, amount)),
          start_price: event.start_price,
          end_price: event.end_price,
          end_time: event.end_time,
          burn_on_end: event.burn_on_end,
          status: 'active',
        };
        break;
      }

      case 'VERSUM_CANCEL_SWAP': {
        const listingKey = createListingKey(VERSUM_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case 'VERSUM_COLLECT_SWAP': {
        const listingKey = createListingKey(VERSUM_CONTRACT_MARKETPLACE, event.swap_id);
        const amount = parseInt(event.amount, 10);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - amount;
          const priceNum = calcVersumSwapPrice(
            parseInt(get(listings, [listingKey, 'start_price']), 10),
            parseInt(get(listings, [listingKey, 'end_price']), 10),
            listings[listingKey].amount,
            amountLeft
          );

          const price = String(priceNum);

          listings[listingKey].amount_left = amountLeft;
          listings[listingKey].price = price;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case 'VERSUM_MAKE_OFFER': {
        const offerKey = createListingKey(VERSUM_CONTRACT_MARKETPLACE, event.offer_id);

        offers[offerKey] = {
          type: 'VERSUM_OFFER',
          contract_address: VERSUM_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          offer_id: event.offer_id,
          buyer_address: event.buyer_address,
          price: event.price,
          amount: parseInt(event.amount, 10),
          status: 'active',
        };

        break;
      }

      case 'VERSUM_CANCEL_OFFER': {
        const offerKey = createListingKey(VERSUM_CONTRACT_MARKETPLACE, event.offer_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'canceled';
        }

        break;
      }

      case 'VERSUM_ACCEPT_OFFER': {
        const offerKey = createListingKey(VERSUM_CONTRACT_MARKETPLACE, event.offer_id);

        if (offerKey in offers) {
          offers[offerKey].status = 'fulfilled';
        }

        break;
      }

      case '8BID_8X8_COLOR_MINT':
      case '8BID_24X24_MONOCHROME_MINT':
      case '8BID_24X24_COLOR_MINT': {
        platform = '8BIDOU';
        isOnChainToken = true;
        name = event.token_name;
        description = event.token_description;
        eightbidCreatorName = event.creator_name;
        eightbidRgb = event.rgb;
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;
      }

      case '8BID_8X8_COLOR_SWAP': {
        const listingKey = createListingKey(EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE, event.swap_id);

        if (artistAddress) {
          if (event.artist_address !== artistAddress || parseInt(event.royalties, 10) !== 100) {
            // potential fraudulent listing
            break;
          }
        }

        listings[listingKey] = {
          type: '8BID_8X8_COLOR_SWAP',
          contract_address: EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };
        break;
      }

      case '8BID_8X8_COLOR_CANCEL_SWAP': {
        const listingKey = createListingKey(EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE, event.swap_id);
        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }
        break;
      }

      case '8BID_8X8_COLOR_BUY': {
        const listingKey = createListingKey(EIGHTBIDOU_8X8_COLOR_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case '8BID_24X24_MONOCHROME_SWAP': {
        const listingKey = createListingKey(EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE, event.swap_id);

        if (artistAddress) {
          if (event.artist_address !== artistAddress) {
            // potential fraudulent listing
            break;
          }
        }

        listings[listingKey] = {
          type: '8BID_24X24_MONOCHROME_SWAP',
          contract_address: EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };
        break;
      }

      case '8BID_24X24_MONOCHROME_CANCEL_SWAP': {
        const listingKey = createListingKey(EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE, event.swap_id);
        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }
        break;
      }

      case '8BID_24X24_MONOCHROME_BUY': {
        const listingKey = createListingKey(EIGHTBIDOU_24X24_MONOCHROME_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case '8BID_24X24_COLOR_SWAP': {
        const listingKey = createListingKey(EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE, event.swap_id);

        if (artistAddress) {
          if (event.artist_address !== artistAddress) {
            // potential fraudulent listing
            break;
          }
        }

        listings[listingKey] = {
          type: '8BID_24X24_COLOR_SWAP',
          contract_address: EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };
        break;
      }

      case '8BID_24X24_COLOR_CANCEL_SWAP': {
        const listingKey = createListingKey(EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE, event.swap_id);
        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }
        break;
      }

      case '8BID_24X24_COLOR_BUY': {
        const listingKey = createListingKey(EIGHTBIDOU_24X24_COLOR_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case 'TYPED_MINT':
        platform = 'TYPED';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;

      case 'TYPED_SWAP': {
        const listingKey = createListingKey(TYPED_CONTRACT_MARKETPLACE, event.swap_id);

        listings[listingKey] = {
          type: 'TYPED_SWAP',
          contract_address: TYPED_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'TYPED_CANCEL_SWAP': {
        const listingKey = createListingKey(TYPED_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case 'TYPED_COLLECT': {
        const listingKey = createListingKey(TYPED_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case '8SCRIBO_MINT':
        platform = '8SCRIBO';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;

        eightscriboTitle = event.eightscribo_title;
        eightscriboRowone = event.eightscribo_rowone;
        eightscriboRowtwo = event.eightscribo_rowtwo;
        eightscriboRowthree = event.eightscribo_rowthree;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;

      case '8SCRIBO_SWAP': {
        const listingKey = createListingKey(EIGHTSCRIBO_CONTRACT_MARKETPLACE, event.swap_id);

        listings[listingKey] = {
          type: '8SCRIBO_SWAP',
          contract_address: EIGHTSCRIBO_CONTRACT_MARKETPLACE,
          created_at: event.timestamp,
          swap_id: event.swap_id,
          seller_address: event.seller_address,
          amount: parseInt(event.amount, 10),
          amount_left: parseInt(event.amount, 10),
          price: event.price,
          status: 'active',
        };

        break;
      }

      case '8SCRIBO_CANCEL_SWAP': {
        const listingKey = createListingKey(EIGHTSCRIBO_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          listings[listingKey].status = 'canceled';
        }

        break;
      }

      case '8SCRIBO_COLLECT': {
        const listingKey = createListingKey(EIGHTSCRIBO_CONTRACT_MARKETPLACE, event.swap_id);

        if (listingKey in listings) {
          const amountLeft = listings[listingKey].amount_left - 1;
          listings[listingKey].amount_left = amountLeft;

          if (amountLeft <= 0) {
            listings[listingKey].status = 'sold_out';
          }
        }

        break;
      }

      case 'RARIBLE_MINT': {
        platform = 'RARIBLE';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        break;
      }

      case 'KALAMINT_MINT': {
        platform = 'KALAMINT';
        artistAddress = event.artist_address;
        isVerifiedArtist = event.is_verified_artist;

        if (!royaltyReceivers && event.royalty_shares) {
          royaltyReceivers = royaltySharesToRoyaltyReceivers(event.royalty_shares);
        }

        if (event.kalamint_on_sale) {
          const listingKey = tokenId;

          listings[listingKey] = {
            type: 'KALAMINT_LIST_TOKEN',
            contract_address: KALAMINT_CONTRACT_FA2,
            created_at: event.timestamp,
            seller_address: artistAddress,
            amount: 1,
            amount_left: 1,
            price: event.price,
            status: 'active',
          };
        }

        break;
      }

      case 'KALAMINT_LIST_TOKEN': {
        const listingKey = tokenId;

        listings[listingKey] = {
          type: 'KALAMINT_LIST_TOKEN',
          contract_address: KALAMINT_CONTRACT_FA2,
          created_at: event.timestamp,
          seller_address: event.seller_address,
          amount: 1,
          amount_left: 1,
          price: event.price,
          status: 'active',
        };

        break;
      }

      case 'KALAMINT_DELIST_TOKEN': {
        const listingKey = tokenId;

        if (listingKey in listings) {
          delete listings[listingKey];
        }

        break;
      }

      case 'KALAMINT_BUY': {
        const listingKey = tokenId;

        if (listingKey in listings) {
          delete listings[listingKey];
        }

        break;
      }

      case 'KALAMINT_REGISTER_AUCTION': {
        const listingKey = tokenId;

        // creating an auction on kalamint also delists the token
        if (listingKey in listings) {
          delete listings[listingKey];
        }

        break;
      }

      default:
    }
  }

  const lastEvent = events.length ? events[events.length - 1] : null;
  const listingsArr = orderBy(Object.values(listings), ({ price }) => price);
  const activeListings = listingsArr.filter(({ status }) => status === 'active');
  const objktAskV2Listings = listingsArr.filter(({ type }) => type === 'OBJKT_ASK_V2') as Array<ObjktListingV2>;

  for (const objktAskV2Listing of objktAskV2Listings) {
    // TODO: consider handling other currencies?
    if (['tez', 'otez'].includes(objktAskV2Listing.currency)) {
      objktAskV2Listing.amount_left = Math.min(
        objktAskV2Listing.amount_left,
        objktAskV2Listing.seller_address in holders ? holders[objktAskV2Listing.seller_address].amount : 0
      );
      if (objktAskV2Listing.amount_left <= 0 && objktAskV2Listing.status === 'active') {
        objktAskV2Listing.status = 'sold_out';
      }
    }
  }

  const offersArr = orderBy(Object.values(offers), ({ price }) => price).reverse();
  const totalEditions = sum(Object.values(holders).map(({ amount }) => amount));
  const burnedEditions = BURN_ADDRESS in holders ? holders[BURN_ADDRESS].amount : 0;
  const editions = totalEditions - burnedEditions;
  const soldEditions = sales.length;
  const salesVolume = sales.reduce((volume, event) => {
    const price = parseInt(event.price, 10);
    return volume + (isTezLikeCurrency(event.currency) ? price : 0);
  }, 0);

  const cheapestListing = minBy(
    listingsArr.filter(({ status }) => status === 'active'),
    ({ price }) => parseInt(price, 10)
  );
  const cheapestPrice = cheapestListing ? cheapestListing.price : null;

  const highestOffer = maxBy(
    offersArr.filter(({ status }) => status === 'active'),
    ({ price }) => parseInt(price, 10)
  );
  const highestOfferPrice = highestOffer ? highestOffer.price : null;

  const lastSale = maxBy(sales, ({ timestamp }) => timestamp);
  const lastSalePrice = lastSale ? lastSale.price : null;
  const lastSaleAt = lastSale ? lastSale.timestamp : null;
  const highestSale = maxBy(sales, ({ price }) => parseInt(price, 10));
  const highestSalePrice = highestSale ? highestSale.price : null;
  const lowestSale = minBy(sales, ({ price }) => parseInt(price, 10));
  const lowestSalePrice = lowestSale ? lowestSale.price : null;
  const firstSalePrice = sales.length ? sales[0].price : null;
  const tags = cleanTags(get(metadata, 'tags'));

  if (artistAddress === null) {
    isVerifiedArtist = false; // should not be necessary, but just to be sure ;)

    if (metadata && metadata.creators && metadata.creators.length) {
      if (isString(metadata.creators[0]) && isValidTezosAddress(metadata.creators[0])) {
        artistAddress = metadata.creators[0];
      }
    }
  }

  const mimeType = get(metadata, 'formats.0.mimeType', null);

  const formats = cleanFormats(get(metadata, 'formats')).map((format) => {
    return Object.entries(format).reduce<Record<string, string>>((memo, [k, val]) => {
      if (typeof val !== 'undefined') {
        memo[snakeCase(k)] = val;
      }
      return memo;
    }, {});
  });

  const attributesArr = cleanAttributes(get(metadata, 'attributes'));

  let royaltiesTotal = null;

  if (royaltyReceivers) {
    royaltiesTotal = String(sum(royaltyReceivers.map(({ royalties }) => parseInt(royalties, 10))));
  }

  const token: Token = {
    fa2_address: fa2Address,
    token_id: tokenId,

    platform,

    last_processed_event_id: lastEvent ? lastEvent.id : null,
    last_processed_event_timestamp: lastEvent ? lastEvent.timestamp : null,
    last_processed_event_level: lastEvent ? lastEvent.level : null,

    metadata_uri: metadataUri,
    metadata_status: isOnChainToken ? 'processed' : metadataStatus,

    minted_at: mintedAt,

    editions: String(editions),
    burned_editions: String(burnedEditions),

    minter_address: minterAddress,
    artist_address: artistAddress,
    is_verified_artist: isVerifiedArtist,

    symbol: cleanString(get(metadata, 'symbol')),
    name: name || cleanString(get(metadata, 'name')),
    description: description || cleanString(get(metadata, 'description')),
    artifact_uri: cleanUri(get(metadata, 'artifactUri')),
    display_uri: cleanUri(get(metadata, 'displayUri')),
    thumbnail_uri: cleanUri(get(metadata, 'thumbnailUri')),
    external_uri: cleanUri(get(metadata, 'externalUri')),
    mime_type: cleanString(mimeType),

    creators: cleanCreators(get(metadata, 'creators')),
    contributors: cleanCreators(get(metadata, 'contributors')),

    rights: cleanString(get(metadata, 'rights')),
    right_uri: cleanUri(get(metadata, 'rightUri')),

    formats: formats as any, // TODO: fix any

    attributes: attributesArr,

    price: cheapestPrice,
    last_sales_price: lastSalePrice,
    highest_sales_price: highestSalePrice,
    lowest_sales_price: lowestSalePrice,
    first_sales_price: firstSalePrice,

    lowest_price_listing: activeListings.length ? activeListings[0] : null,

    current_price_to_last_sales_price_diff: calcPriceDiff(cheapestPrice, lastSalePrice),
    current_price_to_last_sales_price_pct: calcPricePct(cheapestPrice, lastSalePrice),

    current_price_to_highest_sales_price_diff: calcPriceDiff(cheapestPrice, highestSalePrice),
    current_price_to_highest_sales_price_pct: calcPricePct(cheapestPrice, highestSalePrice),

    current_price_to_lowest_sales_price_diff: calcPriceDiff(cheapestPrice, lowestSalePrice),
    current_price_to_lowest_sales_price_pct: calcPricePct(cheapestPrice, lowestSalePrice),

    current_price_to_first_sales_price_diff: calcPriceDiff(cheapestPrice, firstSalePrice),
    current_price_to_first_sales_price_pct: calcPricePct(cheapestPrice, firstSalePrice),

    highest_offer_price: highestOfferPrice,

    last_sale_at: lastSaleAt,

    sales_count: String(soldEditions),
    sales_volume: String(salesVolume),
    royalties_total: royaltiesTotal,

    eightbid_creator_name: eightbidCreatorName,
    eightbid_rgb: eightbidRgb,

    objkt_artist_collection_id: objktArtistCollectionId,

    fx_issuer_id: fxIssuerId,
    fx_iteration: fxIteration,

    eightscribo_title: eightscriboTitle,
    eightscribo_rowone: eightscriboRowone,
    eightscribo_rowtwo: eightscriboRowtwo,
    eightscribo_rowthree: eightscriboRowthree,
  };

  return {
    token: token,
    listings: listingsArr,
    offers: offersArr,
    holders: holders,
    tags: tags,
    royaltyReceivers,
  };
}

export async function rebuildToken(payload: RebuildTokenTaskPayload) {
  const fa2Address = payload.fa2_address;
  const tokenId = payload.token_id;
  const events = await eventsDao.getTokenEvents(fa2Address, tokenId);
  const latestSetMetadataEvent = findLast(events, ({ type }) => type === 'SET_METADATA');
  let metadataRow = null;
  let metadata = null;
  let status = 'unprocessed';

  if (latestSetMetadataEvent) {
    if (latestSetMetadataEvent.metadata_uri) {
      metadataRow = await metadataDao.getByUri(latestSetMetadataEvent.metadata_uri);
      metadata = metadataRow && metadataRow.data ? metadataRow.data : null;
      status = metadataRow ? metadataRow.status : 'unprocessed';
    } else if (latestSetMetadataEvent.metadata) {
      metadata = latestSetMetadataEvent.metadata;
      status = 'processed';
    }
  }

  const { token, listings, holders, tags, offers, royaltyReceivers } = compileToken(fa2Address, tokenId, events, status, metadata);

  if ([FX_CONTRACT_FA2, FX_CONTRACT_FA2_V3].includes(token.fa2_address) && isString(token.fx_issuer_id)) {
    // add the displayUri and the thumbnailUri of the the fxhash collection to the token
    try {
      const fxMintIssuerEvent = await db
        .select('*')
        .from('events')
        .whereIn('type', ['FX_MINT_ISSUER', 'FX_MINT_ISSUER_V2', 'FX_MINT_ISSUER_V3'])
        .andWhere('issuer_id', '=', token.fx_issuer_id)
        .first();

      if (fxMintIssuerEvent && fxMintIssuerEvent.metadata_uri) {
        const metadata = await db.select('*').from('token_metadata').where('uri', '=', fxMintIssuerEvent.metadata_uri).first();

        if (get(metadata, 'data.name')) {
          token.fx_collection_name = get(metadata, 'data.name');
        }

        if (get(metadata, 'data.description')) {
          token.fx_collection_description = get(metadata, 'data.description');
        }

        if (get(metadata, 'data.displayUri')) {
          token.fx_collection_display_uri = cleanUri(get(metadata, 'data.displayUri'));
        }

        if (get(metadata, 'data.thumbnailUri')) {
          token.fx_collection_thumbnail_uri = cleanUri(get(metadata, 'data.thumbnailUri'));
        }

        if (get(fxMintIssuerEvent, 'editions')) {
          token.fx_collection_editions = get(fxMintIssuerEvent, 'editions');
        }
      }
    } catch (err) {
      console.log('failed to fetch fxhash collection metadata', err);
    }
  }

  await db.transaction(async (trx) => {
    await trx.raw('SET CONSTRAINTS ALL DEFERRED;');

    await trx('tags').where('fa2_address', '=', token.fa2_address).andWhere('token_id', '=', token.token_id).del().transacting(trx);
    await trx('listings').where('fa2_address', '=', token.fa2_address).andWhere('token_id', '=', token.token_id).del().transacting(trx);
    await trx('offers').where('fa2_address', '=', token.fa2_address).andWhere('token_id', '=', token.token_id).del().transacting(trx);
    await trx('holdings').where('fa2_address', '=', token.fa2_address).andWhere('token_id', '=', token.token_id).del().transacting(trx);
    await trx('royalty_receivers')
      .where('fa2_address', '=', token.fa2_address)
      .andWhere('token_id', '=', token.token_id)
      .del()
      .transacting(trx);

    if (config.ignoredContractAddresses.includes(token.fa2_address)) {
      // also delete all events related to this token
      await trx('events').where('fa2_address', '=', token.fa2_address).andWhere('token_id', '=', token.token_id).del().transacting(trx);

      // delete the token if it's on an ignored contract.
      await trx('tokens').where('fa2_address', '=', token.fa2_address).andWhere('token_id', '=', token.token_id).del().transacting(trx);
      return;
    }

    const tokenRow = ['formats', 'creators', 'contributors', 'attributes', 'royalties', 'lowest_price_listing'].reduce<Record<string, any>>(
      (memo, propName) => {
        if (memo[propName]) {
          memo[propName] = JSON.stringify(memo[propName]);
        }

        return memo;
      },
      { ...token }
    );

    await trx('tokens')
      .update(omit(tokenRow))
      .where('fa2_address', '=', token.fa2_address)
      .andWhere('token_id', '=', token.token_id)
      .transacting(trx);

    const tagRows = tags.map((tag) => ({ token_id: token.token_id, fa2_address: token.fa2_address, tag }));

    if (tagRows && tagRows.length) {
      for (const rows of chunk(tagRows, 100)) {
        await trx('tags').insert(rows).transacting(trx);
      }
    }

    const royaltyReceiverRows = (royaltyReceivers || []).map((royaltyReceiver) => ({
      token_id: token.token_id,
      fa2_address: token.fa2_address,
      ...royaltyReceiver,
    }));

    if (royaltyReceiverRows && royaltyReceiverRows.length) {
      for (const rows of chunk(royaltyReceiverRows, 100)) {
        await trx('royalty_receivers').insert(rows).transacting(trx);
      }
    }

    const listingRows = listings.map((listing) => ({ ...listing, token_id: token.token_id, fa2_address: token.fa2_address }));

    if (listingRows && listingRows.length) {
      for (const rows of chunk(listingRows, 100)) {
        await trx('listings').insert(rows).transacting(trx);
      }
    }

    const offerRows = offers.map((offer) => ({ ...offer, token_id: token.token_id, fa2_address: token.fa2_address }));

    if (offerRows && offerRows.length) {
      for (const rows of chunk(offerRows, 100)) {
        await trx('offers').insert(rows).transacting(trx);
      }
    }

    const holdingRows = Object.entries(holders).map(([holder_address, { first_received_at, last_received_at, amount }]) => ({
      token_id: token.token_id,
      fa2_address: token.fa2_address,
      holder_address,
      last_received_at,
      first_received_at,
      amount,
    }));

    if (holdingRows && holdingRows.length) {
      for (const rows of chunk(holdingRows, 100)) {
        await trx('holdings').insert(rows).transacting(trx);
      }
    }
  });

  return token;
}

const task: Task = {
  name: 'rebuild-token',

  spawnWorkers: async () => {
    await run({
      connectionString: dbConfig.connection,
      concurrency: config.rebuildTokenConcurrency,
      noHandleSignals: false,
      pollInterval: config.rebuildTokenPollInterval || config.workerPollInterval,
      taskList: {
        [getTaskName('rebuild-token')]: async (payload) => {
          await rebuildToken(payload as RebuildTokenTaskPayload);
        },
      },
    });
  },
};

export default task;
