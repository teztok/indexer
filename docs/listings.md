# Listings

Listings represent tokens that are actively listed for sale on various marketplaces. Each listing tracks the price, availability, and marketplace-specific details.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| fa2_address | string | The contract address of the token (always starts with "KT"). |
| token_id | string | The ID of the token. |
| type | string | The type of listing identifies on which marketplace it was created. If a marketplace has multiple marketplace contracts, each is represented with its own type. Currently, the indexer supports these types: HEN_SWAP, HEN_SWAP_V2, TEIA_SWAP, TYPED_SWAP, 8SCRIBO_SWAP, OBJKT_ASK, OBJKT_ASK_V2, FX_OFFER, FX_LISTING, VERSUM_SWAP, 8BID_8X8_COLOR_SWAP, 8BID_24X24_MONOCHROME_SWAP, 8BID_24X24_COLOR_SWAP, KALAMINT_LIST_TOKEN |
| status | string | The status of a listing can be either 'active', 'sold_out', or 'canceled'. |
| created_at | timestamp | A timestamp of when the listing was created. |
| contract_address | string | The address of the marketplace contract that was used to create the listing. |
| seller_address | string | The Tezos address of the person who created the listing (the person selling the token). |
| price | big integer | The price of the token, in micro tez. |
| amount | big integer | The total number of editions that are set up for sale. |
| amount_left | big integer | The number of editions that are left for sale. |
| swap_id | big integer | If it's a swap, this will contain the swap ID. |
| ask_id | big integer | If it's an ask, this will contain the ask ID. |
| offer_id | big integer | If it's an offer, this will contain the offer ID. (fxhash named their swaps offers in the beginning). |
| start_price | big integer | The start price of the listing, in micro tez (only used by Versum). |
| end_price | big integer | The end price of the listing, in micro tez (only used by Versum). |
| end_time | timestamp | The end time of the listing (only used by Versum). |
| burn_on_end | boolean | Is set to true if the remaining tokens should be burned after the end time was reached (only used by Versum). |
| currency | string | If the price is in wrapped tez, this will be set to 'OTEZ'. (only used by some http://OBJKT.com listings). |

## Navigation

- [← Holdings](holdings.md)
- [Offers →](offers.md)
