# Offers

Offers represent bids made by users to purchase tokens. Each offer tracks the proposed price and marketplace-specific details.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| fa2_address | string | The contract address of the token (always starts with "KT"). |
| token_id | string | The ID of the token. |
| type | string | The type of offer identifies in which marketplace it was created. If a marketplace has multiple marketplace contracts, each is represented with its own type. Currently, the indexer supports these types: OBJKT_BID, OBJKT_OFFER, VERSUM_OFFER, FX_OFFER_V3 |
| status | string | The status of an offer can be either 'active', 'fulfilled', or 'canceled'. |
| created_at | timestamp | A timestamp of when the offer was created. |
| contract_address | string | The address of the marketplace contract that was used to create the offer. |
| buyer_address | string | The Tezos address of the person who created the offer (the person wanting to by the token). |
| price | big integer | The price which the person who created the offer is willing to pay, in micro tez. |
| bid_id | big integer | If it's a bid, this will contain the bid ID. |
| offer_id | big integer | If it's an offer, this will contain the offer ID. |

## Navigation

- [← Listings](listings.md)
- [Tags →](tags.md)
