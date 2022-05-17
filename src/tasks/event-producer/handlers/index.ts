import Fa2TransferHandler, { Fa2TransferEvent } from './fa2_transfer';
import SetLedgerHandler, { SetLedgerEvent } from './set_ledger';
import HenCancelSwapHandler, { HenCancelSwapEvent } from './hen_cancel_swap';
import HenCancelSwapHandlerV2, { HenCancelSwapV2Event } from './hen_cancel_swap_v2';
import HenCollectHandler, { HenCollectEvent } from './hen_collect';
import HenCollectHandlerV2, { HenCollectV2Event } from './hen_collect_v2';
import HenMintHandler, { HenMintEvent } from './hen_mint';
import HenSwapHandler, { HenSwapEvent } from './hen_swap';
import HenSwapHandlerV2, { HenSwapV2Event } from './hen_swap_v2';
import ObjktAskHandler, { ObjktAskEvent } from './objkt_ask';
import ObjktAskV2Handler, { ObjktAskV2Event } from './objkt_ask_v2';
import ObjktOfferHandler, { ObjktOfferEvent } from './objkt_offer';
import ObjktBidHandler, { ObjktBidEvent } from './objkt_bid';
import ObjktFulfillAskHandler, { ObjktFulfillAskEvent } from './objkt_fulfill_ask';
import ObjktFulfillAskV2Handler, { ObjktFulfillAskV2Event } from './objkt_fulfill_ask_v2';
import ObjktFulfillOfferHandler, { ObjktFulfillOfferEvent } from './objkt_fulfill_offer';
import ObjktMintArtistHandler, { ObjktMintArtistEvent } from './objkt_mint_artist';
import ObjktRetractAskHandler, { ObjktRetractAskEvent } from './objkt_retract_ask';
import ObjktRetractAskV2Handler, { ObjktRetractAskV2Event } from './objkt_retract_ask_v2';
import ObjktFulfillBidHandler, { ObjktFulfillBidEvent } from './objkt_fulfill_bid';
import ObjktRetractBidHandler, { ObjktRetractBidEvent } from './objkt_retract_bid';
import ObjktRetractOfferHandler, { ObjktRetractOfferEvent } from './objkt_retract_offer';
import FxMintIssuerHandler, { FxMintIssuerEvent } from './fx_mint_issuer';
import FxMintIssuerV2Handler, { FxMintIssuerV2Event } from './fx_mint_issuer_v2';
import FxCollectHandler, { FxCollectEvent } from './fx_collect';
import FxListingAcceptHandler, { FxListingAcceptEvent } from './fx_listing_accept';
import FxMintHandler, { FxMintEvent } from './fx_mint';
import FxMintV2Handler, { FxMintV2Event } from './fx_mint_v2';
import FxMintV3Handler, { FxMintV3Event } from './fx_mint_v3';
import FxOfferHandler, { FxOfferEvent } from './fx_offer';
import FxListingHandler, { FxListingEvent } from './fx_listing';
import FxCancelOfferHandler, { FxCancelOfferEvent } from './fx_cancel_offer';
import FxListingCancelHandler, { FxListingCancelEvent } from './fx_listing_cancel';
import ObjktCreateEnglishAuctionHandler, { ObjktCreateEnglishAuctionEvent } from './objkt_create_english_auction';
import ObjktBidEnglishAuctionHandler, { ObjktBidEnglishAuctionEvent } from './objkt_bid_english_auction';
import ObjktCancelEnglishAuctionHandler, { ObjktCancelEnglishAuctionEvent } from './objkt_cancel_english_auction';
import ObjktConcludeEnglishAuctionHandler, { ObjktConcludeEnglishAuctionEvent } from './objkt_conclude_english_auction';
import ObjktCreateDutchAuctionHandler, { ObjktCreateDutchAuctionEvent } from './objkt_create_dutch_auction';
import ObjktCancelDutchAuctionHandler, { ObjktCancelDutchAuctionEvent } from './objkt_cancel_dutch_auction';
import ObjktBuyDutchAuctionHandler, { ObjktBuyDutchAuctionEvent } from './objkt_buy_dutch_auction';
import ObjktSettleEnglishAuctionHandler, { ObjktSettleEnglishAuctionEvent } from './objkt_settle_english_auction';
import ObjktBuyDutchAuctionV2Handler, { ObjktBuyDutchAuctionV2Event } from './objkt_buy_dutch_auction_v2';
import SetMetadataHandler, { SetMetadataEvent } from './set_metadata';
import VersumMintHandler, { VersumMintEvent } from './versum_mint';
import VersumSwapHandler, { VersumSwapEvent } from './versum_swap';
import VersumCancelSwapHandler, { VersumCancelSwapEvent } from './versum_cancel_swap';
import VersumCollectSwapHandler, { VersumCollectEvent } from './versum_collect_swap';
import VersumMakeOfferHandler, { VersumMakeOfferEvent } from './versum_make_offer';
import VersumAcceptOfferHandler, { VersumAcceptOfferEvent } from './versum_accept_offer';
import VersumCancelOfferHandler, { VersumCancelOfferEvent } from './versum_cancel_offer';
import VersumCreateAuctionHandler, { VersumCreateAuctionEvent } from './versum_create_auction';
import TeiaSwapHandler, { TeiaSwapEvent } from './teia_swap';
import TeiaCancelSwapHandler, { TeiaCancelSwapEvent } from './teia_cancel_swap';
import TeiaCollectHandler, { TeiaCollectEvent } from './teia_collect';
import EightbidMint8x8ColorHandler, { EightbidMint8x8ColorEvent } from './8bid_8x8_color_mint';
import EightbidSwap8x8ColorHandler, { EightbidSwap8x8ColorEvent } from './8bid_8x8_color_swap';
import EightbidBuy8x8ColorHandler, { EightbidBuy8x8ColorEvent } from './8bid_8x8_color_buy';
import EightbidCancelSwap8x8ColorHandler, { EightbidCancelSwap8x8ColorEvent } from './8bid_8x8_color_cancel_swap';
import EightbidMint24x24MonochromeHandler, { EightbidMint24x24MonochromeEvent } from './8bid_24x24_monochrome_mint';
import EightbidSwap24x24MonochromeHandler, { EightbidSwap24x24MonochromeEvent } from './8bid_24x24_monochrome_swap';
import EightbidBuy24x24MonochromeHandler, { EightbidBuy24x24MonochromeEvent } from './8bid_24x24_monochrome_buy';
import EightbidCancelSwap24x24MonochromeHandler, { EightbidCancelSwap24x24MonochromeEvent } from './8bid_24x24_monochrome_cancel_swap';
import EightbidMint24x24ColorHandler, { EightbidMint24x24ColorEvent } from './8bid_24x24_color_mint';
import EightbidSwap24x24ColorHandler, { EightbidSwap24x24ColorEvent } from './8bid_24x24_color_swap';
import EightbidCancelSwap24x24ColorHandler, { EightbidCancelSwap24x24ColorEvent } from './8bid_24x24_color_cancel_swap';
import EightbidBuy24x24ColorHandler, { EightbidBuy24x24ColorEvent } from './8bid_24x24_color_buy';

export const handlers = [
  Fa2TransferHandler,
  SetLedgerHandler,
  HenCancelSwapHandler,
  HenCancelSwapHandlerV2,
  HenCollectHandler,
  HenCollectHandlerV2,
  HenMintHandler,
  HenSwapHandler,
  HenSwapHandlerV2,
  ObjktAskHandler,
  ObjktAskV2Handler,
  ObjktBidHandler,
  ObjktOfferHandler,
  ObjktFulfillAskHandler,
  ObjktFulfillAskV2Handler,
  ObjktFulfillBidHandler,
  ObjktFulfillOfferHandler,
  ObjktMintArtistHandler,
  ObjktRetractAskHandler,
  ObjktRetractAskV2Handler,
  ObjktRetractBidHandler,
  ObjktRetractOfferHandler,
  ObjktCreateEnglishAuctionHandler,
  ObjktBidEnglishAuctionHandler,
  ObjktCancelEnglishAuctionHandler,
  ObjktConcludeEnglishAuctionHandler,
  ObjktCreateDutchAuctionHandler,
  ObjktCancelDutchAuctionHandler,
  ObjktBuyDutchAuctionHandler,
  ObjktSettleEnglishAuctionHandler,
  ObjktBuyDutchAuctionV2Handler,
  FxMintIssuerHandler,
  FxMintIssuerV2Handler,
  FxCollectHandler,
  FxListingAcceptHandler,
  FxMintHandler,
  FxMintV2Handler,
  FxMintV3Handler,
  FxOfferHandler,
  FxListingHandler,
  FxCancelOfferHandler,
  FxListingCancelHandler,
  SetMetadataHandler,
  VersumMintHandler,
  VersumSwapHandler,
  VersumCancelSwapHandler,
  VersumCollectSwapHandler,
  VersumMakeOfferHandler,
  VersumAcceptOfferHandler,
  VersumCancelOfferHandler,
  VersumCreateAuctionHandler,
  TeiaSwapHandler,
  TeiaCancelSwapHandler,
  TeiaCollectHandler,
  EightbidMint8x8ColorHandler,
  EightbidSwap8x8ColorHandler,
  EightbidBuy8x8ColorHandler,
  EightbidCancelSwap8x8ColorHandler,
  EightbidMint24x24MonochromeHandler,
  EightbidSwap24x24MonochromeHandler,
  EightbidBuy24x24MonochromeHandler,
  EightbidCancelSwap24x24MonochromeHandler,
  EightbidMint24x24ColorHandler,
  EightbidSwap24x24ColorHandler,
  EightbidCancelSwap24x24ColorHandler,
  EightbidBuy24x24ColorHandler,
];

export type AnyEvent =
  | Fa2TransferEvent
  | SetLedgerEvent
  | HenCancelSwapEvent
  | HenCancelSwapV2Event
  | HenCollectEvent
  | HenCollectV2Event
  | HenMintEvent
  | HenSwapEvent
  | HenSwapV2Event
  | ObjktAskEvent
  | ObjktAskV2Event
  | ObjktBidEvent
  | ObjktOfferEvent
  | ObjktFulfillAskEvent
  | ObjktFulfillAskV2Event
  | ObjktMintArtistEvent
  | ObjktRetractAskEvent
  | ObjktRetractAskV2Event
  | ObjktFulfillBidEvent
  | ObjktFulfillOfferEvent
  | ObjktRetractBidEvent
  | ObjktRetractOfferEvent
  | ObjktSettleEnglishAuctionEvent
  | FxMintIssuerEvent
  | FxMintIssuerV2Event
  | FxCollectEvent
  | FxListingAcceptEvent
  | FxMintEvent
  | FxMintV2Event
  | FxMintV3Event
  | FxOfferEvent
  | FxListingEvent
  | FxCancelOfferEvent
  | FxListingCancelEvent
  | ObjktCreateEnglishAuctionEvent
  | ObjktBidEnglishAuctionEvent
  | ObjktCancelEnglishAuctionEvent
  | ObjktConcludeEnglishAuctionEvent
  | ObjktCreateDutchAuctionEvent
  | ObjktCancelDutchAuctionEvent
  | ObjktBuyDutchAuctionEvent
  | ObjktBuyDutchAuctionV2Event
  | SetMetadataEvent
  | VersumMintEvent
  | VersumSwapEvent
  | VersumCancelSwapEvent
  | VersumCollectEvent
  | VersumMakeOfferEvent
  | VersumAcceptOfferEvent
  | VersumCancelOfferEvent
  | VersumCreateAuctionEvent
  | TeiaSwapEvent
  | TeiaCancelSwapEvent
  | TeiaCollectEvent
  | EightbidMint8x8ColorEvent
  | EightbidSwap8x8ColorEvent
  | EightbidBuy8x8ColorEvent
  | EightbidCancelSwap8x8ColorEvent
  | EightbidMint24x24MonochromeEvent
  | EightbidSwap24x24MonochromeEvent
  | EightbidBuy24x24MonochromeEvent
  | EightbidCancelSwap24x24MonochromeEvent
  | EightbidMint24x24ColorEvent
  | EightbidSwap24x24ColorEvent
  | EightbidCancelSwap24x24ColorEvent
  | EightbidBuy24x24ColorEvent;
