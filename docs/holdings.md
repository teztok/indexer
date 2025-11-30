# Holdings

Holdings represent the ownership of tokens by Tezos accounts. Each holding record tracks how many editions of a specific token a particular address holds.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| fa2_address | string | The contract address of the token (always starts with "KT"). |
| token_id | string | The ID of the token. |
| holder_address | string | The Tezos address of the person that holds this token. |
| amount | big integer | The number of editions held. This can be 0 if the account once owned editions of this token but then sold/transferred them. |
| last_received_at | timestamp | A timestamp of when the token was last received by the holder. |
| first_received_at | timestamp | A timestamp of when the token was first received by the holder. |

## Navigation

- [← Tokens](tokens.md)
- [Listings →](listings.md)
