# Examples

These are a couple of common GraphQL queries. Try them out [here](https://graphiql.teztok.com/).

---

## getToken

Get a token with its current price, including active listings, active offers, and holders.

```graphql
query getToken($fa2Address: String!, $tokenId: String!) {
    tokens_by_pk(fa2_address: $fa2Address, token_id: $tokenId) {
        name
        description
        artist_address
        price
        offers(where: {status: {_eq: "active"}}, order_by: {price: desc}) {
            type
            contract_address
            price
            buyer_address
        }
        listings(where: {status: {_eq: "active"}}, order_by: {price: asc}) {
            type
            contract_address
            amount_left
            price
            seller_address
        }
        holdings(where: {amount: {_gt: "0"}}) {
            holder_address
            amount
        }
    }
}
```

---

## getHoldings

List all tokens owned by a Tezos account, ordered by the time they were received.

```graphql
query getHoldings($holderAddress: String!) {
    holdings(where: {holder_address: {_eq: $holderAddress}, amount: {_gt: "0"}}, order_by: {last_received_at: desc}) {
        amount
        last_received_at
        token {
            token_id
            fa2_address
            name
            description
            price
        }
    }
}
```

---

## getCreations

List all tokens created by a Tezos account.

*Note that this does not include tokens that were created through collab contracts.*

```graphql
query getCreations($artistAddress: String!) {
    tokens(where: {artist_address: {_eq: $artistAddress }}, order_by: {minted_at: desc}) {
        token_id
        fa2_address
        platform
        name
        description
        price
        minted_at
        artifact_uri
    }
}
```

---

## getCreations (with royalty receivers)

List all tokens that were either created by a certain Tezos account or where the Tezos account is listed as a receiver of royalties.

*Note that this does not include tokens that were created through collab contracts.*

```graphql
query getCreations($artistAddress: String!) {
    tokens(where: { _or: [{artist_address: {_eq: $artistAddress }}, {royalty_receivers: { receiver_address: { _eq: $artistAddress }}}] }, order_by: {minted_at: desc}) {
        token_id
        fa2_address
        artist_address
        platform
        name
        description
        price
        minted_at
        artifact_uri
    }
}
```

---

## getListings

Show all tokens listed for sale by a Tezos account.

```graphql
query getListings($sellerAddress: String!) {
    listings(where: { seller_address: { _eq: $sellerAddress }, status: { _eq: "active" }}) {
        type
        price
        amount_left
        token {
            token_id
            fa2_address
            name
            description
        }
    }
}
```

---

## getBurnedCreations

List the tokens of a creator where all editions were burned.

```graphql
query getBurnedCreations($artistAddress: String!) {
    tokens(where: {artist_address: {_eq: $artistAddress}, burned_editions: {_gt: "0"}, editions: {_eq: "0"}}) {
        token_id
        fa2_address
        platform
        name
        description
        editions
        burned_editions
    }
}
```

---

## getTokensWithRecentSale

List all tokens owned by a Tezos account that had at least one sale since the beginning of 2023.

```graphql
query getTokensWithRecentSale($holderAddress: String!) {
    holdings(where: {holder_address: {_eq: $holderAddress}, amount: {_gt: "0"}, token: {last_sale_at: {_gte: "2023-01-01" }}}, order_by: {last_received_at: desc}) {
        amount
        last_received_at
        token {
            token_id
            fa2_address
            name
            description
            price
            last_sale_at
            last_sales_price
        }
    }
}
```

---

## getTokensThatDroppedInValue

List all tokens owned by a Tezos account that are now listed at least 50% under the price they were last sold for.

```graphql
query getTokensThatDroppedInValue($holderAddress: String!) {
    holdings(where: {holder_address: {_eq: $holderAddress}, amount: {_gt: "0"}, token: {current_price_to_last_sales_price_pct: { _lt: "-50" }}}, order_by: {token: {current_price_to_last_sales_price_pct: asc}}) {
        amount
        last_received_at
        token {
            token_id
            fa2_address
            name
            description
            price
            last_sales_price
            current_price_to_last_sales_price_pct
        }
    }
}
```

---

## getFxhashCollection

List all tokens in a fxhash collection.

```graphql
query getFxhashCollection($fxIssuerId: bigint!) {
    tokens(where: {fx_issuer_id: {_eq: $fxIssuerId }}, order_by: {minted_at: desc}) {
        token_id
        fa2_address
        platform
        name
        description
        price
        minted_at
        artifact_uri
        fx_issuer_id
    }
}
```

---

## getTokensWithMostVolume

Get the 10 tokens of a contract with the most total sales volume.

```graphql
query getTokensWithMostVolume($fa2Address: String!) {
    tokens(where: {fa2_address: {_eq: $fa2Address}}, order_by: {sales_volume: desc}, limit: 10) {
        token_id
        fa2_address
        platform
        name
        description
        price
        minted_at
        artifact_uri
        sales_volume
        sales_count
    }
}
```

---

## getFloorPrice

Get the cheapest price (floor price) of all tokens in a contract.

```graphql
query getFloorPrice($fa2Address: String!) {
    tokens_aggregate(where: {fa2_address: {_eq: $fa2Address}, price: {_is_null: false}}) {
        aggregate {
            min {
                price
            }
        }
    }
}
```

---

## getMetadataOfToken

Get the raw metadata of a token.

```graphql
query getMetadataOfToken($fa2Address: String!, $tokenId: String!) {
    tokens_by_pk(fa2_address: $fa2Address, token_id: $tokenId) {
        metadata {
            data
        }
    }
}
```

---

## getTokensWithTag

Get tokens that have a certain tag.

```graphql
query getTokensWithTag($tag: String!) {
    tokens(where: {tags: {tag: {_eq: $tag}}}, limit: 10) {
        token_id
        fa2_address
        name
        description
        tags {
            tag
        }
    }
}
```

---

## getTokenBalanceHistory

Show the balance history of a token (who owned how many editions at which time).

```graphql
query getTokenBalanceHistory($fa2Address: String!, $tokenId: String!) {
    events(where: {fa2_address: {_eq: $fa2Address}, token_id: {_eq: $tokenId}, type: {_eq: "SET_LEDGER"}}, order_by: {opid: asc}) {
        type
        level
        timestamp
        fa2_address
        token_id
        is_mint
        holder_address
        amount
    }
}
```

---

## getRecentSales

List the 100 most recent sales.

```graphql
query getRecentSales {
    events(where: {implements: {_eq: "SALE"}}, order_by: {opid: desc}, limit: 100) {
        type
        timestamp
        seller_address
        buyer_address
        price
        token {
            fa2_address
            token_id
            name
            description
        }
    }
}
```

---

## getSales

List all sales of a Tezos account.

```graphql
query getSales($sellerAddress: String!) {
    events(where: {implements: {_eq: "SALE"}, seller_address: { _eq: $sellerAddress }}, order_by: {timestamp: asc}) {
        type
        timestamp
        seller_address
        buyer_address
        price
        token {
            fa2_address
            token_id
            name
            description
        }
    }
}
```

---

## getSaleStats

Show the total volume sold by a Tezos account and the number of sales.

```graphql
query getSaleStats($sellerAddress: String!) {
    events_aggregate(where: {implements: {_eq: "SALE"}, seller_address: { _eq: $sellerAddress }}) {
        aggregate {
            sum {
                price
            }
            count
        }
    }
}
```

---

## getSalesVolume

Show the sales volume and the number of sales of all tokens in a contract, in one month.

```graphql
query getSalesVolume($fa2Address: String!) {
    events_aggregate(where: {implements: {_eq: "SALE"}, fa2_address: { _eq: $fa2Address }, timestamp: {_gte: "2023-01-01", _lt: "2023-02-01"}}) {
        aggregate {
            sum {
                price
            }
            count
        }
    }
}
```

---

## getCreations and getSales

List all sales of all tokens created by a certain Tezos account.

*For performance reasons, it's recommended to split this up into two queries. In the first query, you fetch all tokens that were created by an account. In the second query, you then fetch the sale events of those tokens, by creating an or-condition with the contract addresses and the token ids.*

First query:

```graphql
query getCreations($artistAddress: String!) {
    tokens(where: {artist_address: {_eq: $artistAddress }}) {
        fa2_address
        token_id
    }
}
```

Second query:

```graphql
query getSales {
    events(where: {
        implements: { _eq: "SALE" },
        _or: [
            { fa2_address: { _eq: "KT1EMg1HWiDRsA6K6zXfrxaWPKFkwpFifQgW" }, token_id: { _eq: "1" } },
            { fa2_address: { _eq: "KT1EMg1HWiDRsA6K6zXfrxaWPKFkwpFifQgW" }, token_id: { _eq: "2" } },
            { fa2_address: { _eq: "KT1EMg1HWiDRsA6K6zXfrxaWPKFkwpFifQgW" }, token_id: { _eq: "3" } },
            { fa2_address: { _eq: "KT1EMg1HWiDRsA6K6zXfrxaWPKFkwpFifQgW" }, token_id: { _eq: "4" } },
        ]
    }) {
        type
        timestamp
        seller_address
        buyer_address
        price
        token {
            fa2_address
            token_id
            name
            description
        }
    }
}
```

## Navigation

- [← Maintenance](maintenance.md)
- [FAQ →](faq.md)
