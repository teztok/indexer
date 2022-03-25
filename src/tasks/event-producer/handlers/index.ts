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
import FxAssignMetadataHandler, { FxAssignMetadataEvent } from './fx_assign_metadata';
import FxCollectHandler, { FxCollectEvent } from './fx_collect';
import FxMintHandler, { FxMintEvent } from './fx_mint';
import FxMintV2Handler, { FxMintV2Event } from './fx_mint_v2';
import FxOfferHandler, { FxOfferEvent } from './fx_offer';
import FxCancelOfferHandler, { FxCancelOfferEvent } from './fx_cancel_offer';
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
import EightbidMint8x8ColorHandler, { EightbidMint8x8ColorEvent } from './8bid_mint_8x8_color';
import EightbidSwap8x8ColorHandler, { EightbidSwap8x8ColorEvent } from './8bid_swap_8x8_color';
import EightbidBuy8x8ColorHandler, { EightbidBuy8x8ColorEvent } from './8bid_buy_8x8_color';
import EightbidCancelSwap8x8ColorHandler, { EightbidCancelSwap8x8ColorEvent } from './8bid_cancel_swap_8x8_color';

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
  FxAssignMetadataHandler,
  FxCollectHandler,
  FxMintHandler,
  FxMintV2Handler,
  FxOfferHandler,
  FxCancelOfferHandler,
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
  | FxAssignMetadataEvent
  | FxCollectEvent
  | FxMintEvent
  | FxMintV2Event
  | FxOfferEvent
  | FxCancelOfferEvent
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
  | EightbidCancelSwap8x8ColorEvent;
