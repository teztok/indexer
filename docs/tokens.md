# Tokens

Token models are created from TezTok events and contain all relevant information about NFT tokens on the Tezos blockchain.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| fa2_address | string | The contract address of the token (always starts with "KT"). |
| token_id | string | The ID of the token. This is a numeric value but stored as a string because it can contain a lot of digits in some rare cases. |
| platform | string | The platform (marketplace) that issued the token. In cases where the platform is unknown to the indexer, the value is null. Possible values: HEN, FXHASH, OBJKT, VERSUM, 8BIDOU, TYPED, 8SCRIBO, RARIBLE. |
| last_processed_event_id | string | Token models are created from TezTok events. This property contains the ID of the latest event that was used to create the token. |
| last_processed_event_timestamp | timestamp | Token models are created from TezTok events. This property contains the timestamp of the latest event that was used to create the token. |
| last_processed_event_level | big integer | Token models are created from TezTok events. This property contains the block level of the latest event that was used to create the token. |
| metadata_uri | string | A URI that points to the metadata of the token. Most tokens store metadata on IPFS, so this URI usually starts with 'ipfs://'. |
| metadata_status | enum | The indexer needs to download (usually from IPFS) and processes the metadata. If the metadata was not downloaded yet (usually the case right after mint), the value is set to 'unprocessed'. After the metadata was successfully downloaded and processed, the value is set to 'processed'. If the indexer was not able to download the metadata after several retries, the value is set to 'error'. |
| editions | big integer | The number of editions that are available of this token. Burned editions are already excluded from this number. If all editions were burned, the value will be 0. |
| burned_editions | big integer | The number of burned editions. |
| minted_at | timestamp | A timestamp of when the token was minted. |
| minter_address | string | The Tezos address of the minter. The first Tezos Account that holds a certain token is considered the minter. Often the minter_address is the same as the artist_address, but there are cases where the minter is the person who buys the token the first time (for example fxhash tokens or tokens from collections such as Tezzardz). |
| artist_address | string | The Tezos address of the artist who created the token. The artist_address can also be the address of a contract, for example, if the token was created by a collab contract. In cases where the indexer can't identify the artist, the value is null (for example sometimes the case for custom fa2 contracts). |
| symbol | string | The symbol of the token (extracted from the metadata). |
| name | string | The name of the token (extracted from the metadata). |
| description | string | The description of the token (extracted from the metadata). |
| artifact_uri | string | A URI that points to the artifact. For example, in the case of an image NFT, this URI points to the source image. Usually, they are hosted on IPFS. |
| display_uri | string | A URI that points to an image representation of the artifact. For example, if the artifact is a video, the display_uri might point to an image of the first frame of the video. Usually, they are hosted on IPFS. |
| thumbnail_uri | string | A URI that points to a thumbnail representation of the artifact. There is no standard format for thumbnails, which is why platforms often create their own thumbnails on the fly instead of relying on this property. Usually, they are hosted on IPFS. |
| external_uri | string | A URI that points to additional information. See https://tzip.tezosagora.org/proposal/tzip-21/#externaluri-string-format-uri-reference |
| mime_type | string | The mime-type of the artifact. |
| formats | json | An array with further formats. See https://tzip.tezosagora.org/proposal/tzip-21/#formats-array |
| creators | json | An array with names or the Tezos addresses of the people who created the asset. See https://tzip.tezosagora.org/proposal/tzip-21/#creators-array |
| contributors | json | An array with names or the Tezos addresses of the people who contributed to the creation of the asset. See https://tzip.tezosagora.org/proposal/tzip-21/#contributors-array |
| rights | string | A statement about the asset's rights. See https://tzip.tezosagora.org/proposal/tzip-21/#rights-array |
| right_uri | string | A URI to the statement of the rights. See https://tzip.tezosagora.org/proposal/tzip-21/#righturi-string-format-uri-reference |
| attributes | json | An array with attributes of the token. This is for example used by PFP projects. See https://tzip.tezosagora.org/proposal/tzip-21/#attributes-array |
| lowest_price_listing | json | A JSON Object with the active listing with the lowest price. |
| price | big integer | The current price of the token, represented in micro tez. |
| last_sales_price | big integer | The price of the last sale that happened, represented in micro tez. |
| highest_sales_price | big integer | The highest price for which this token was ever sold, represented in micro tez. |
| lowest_sales_price | big integer | The lowest price for which this token was ever sold for, represented in micro tez. |
| first_sales_price | big integer | The price of the first sale that happened for this token, represented in micro tez. |
| current_price_to_last_sales_price_diff | big integer | The difference between the current price and the price the token was last sold for (token.price - token.last_sales_price). |
| current_price_to_last_sales_price_pct | big integer | The difference between the current price and the price the token was last sold for, represented in percentage. |
| current_price_to_highest_sales_price_diff | big integer | The difference between the current price and the highest price the token was sold for (token.price - token.highest_sales_price). |
| current_price_to_highest_sales_price_pct | big integer | The difference between the current price and the highest price the token was sold for, represented in percentage. |
| current_price_to_lowest_sales_price_diff | big integer | The difference between the current price and the lowest price the token was sold for (token.price - token.lowest_sales_price). |
| current_price_to_lowest_sales_price_pct | big integer | The difference between the current price and the lowest price the token was sold for, represented in percentage. |
| current_price_to_first_sales_price_diff | big integer | The difference between the current price and the first price the token was sold for (token.price - token.first_sales_price). |
| current_price_to_first_sales_price_pct | big integer | The difference between the current price and the first price the token was sold for in percentage. |
| highest_offer_price | big integer | The price of the current highest offer. Note that the indexer doesn't process collection offers at this point. |
| last_sale_at | timestamp | A timestamp of when the last sale happened. |
| sales_count | big integer | How often the token was sold. |
| sales_volume | big integer | The sales volume of the token (sum of all sales), represented in micro tez. |
| royalties_total | big integer | The percentage of royalties that needs to be paid on every sale of the token. The number needs to be divided by 10000 (For example, if the value is 250000: 250000 / 10000 = 25% royalties). |
| is_verified_artist | boolean | If the artist_address of the token is the same as the address that called the mint endpoint, this boolean is set to true. |
| updated_at | timestamp | A timestamp of when the token was last updated in the database. |
| eightbid_creator_name | string | If it's a token that was minted on 8bidou, this property will contain the name of the creator as specified there. |
| eightbid_rgb | string | If it's a token that was minted on 8bidou, this property will contain its RGB values. |
| objkt_artist_collection_id | big integer | If it's a token that was minted on http://objkt.com/, as part of an Artist Collection, this property contains the ID of the collection. |
| fx_issuer_id | big integer | If it's a token that was minted on fxhash, this property contains the issuer ID. |
| fx_iteration | big integer | If it's a token that was minted on fxhash, this property contains the number of the iteration. |
| fx_collection_name | string | If it's a token that was minted on fxhash, this property contains the name of the collection. |
| fx_collection_description | string | If it's a token that was minted on fxhash, this property contains the description of the collection. |
| fx_collection_display_uri | string | If it's a token that was minted on fxhash, this property contains a URI that points to a preview image of the collection. |
| fx_collection_thumbnail_uri | string | If it's a token that was minted on fxhash, this property contains a URI that points to a thumbnail image of the collection. |
| fx_collection_editions | big integer | If it's a token that was minted on fxhash, this property contains the number of editions the collection has of which the token is part. |
| eightscribo_title | string | If it's a token that was minted on 8SCRIBO, this property contains the title of the token. |
| eightscribo_rowone | string | If it's a token that was minted on 8SCRIBO, this property contains the text in the first row. |
| eightscribo_rowtwo | string | If it's a token that was minted on 8SCRIBO, this property contains the text in the second row. |
| eightscribo_rowthree | string | If it's a token that was minted on 8SCRIBO, this property contains the text in the third row. |

## Navigation

- [← Events](events.md)
- [Holdings →](holdings.md)
