# Royalty Receivers

Royalty Receivers define the distribution of royalties for token sales. Each record specifies a recipient address and their percentage share of the royalties.

## Properties

| Property | Type | Description |
|----------|------|-------------|
| fa2_address | string | The contract address of the token (always starts with "KT"). |
| token_id | string | The ID of the token. |
| receiver_address | string | The Tezos address of the person receiving the royalties. |
| royalties | big integer | Royalties in percentage this Tezos account will receive on every sale of the token. The number needs to be divided by 10000 (For example, if the value is 250000: 250000 / 10000 = 25% royalties). |

## Navigation

- [← Tags](tags.md)
- [Plugins →](plugins.md)
