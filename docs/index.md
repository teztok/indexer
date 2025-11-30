# Introduction

The TezTok indexer is an open-source tool that allows developers to access NFT data across Tezos marketplaces through a GraphQL API. The indexer's goal is to align data, including sales, listings, and offers from different NFT marketplaces, making it more accessible for developers to build dApps. If you want to play around with it, we have a public instance up and running:

**API:** https://api.teztok.com/v1/graphql

**GraphiQL Playground:** https://graphiql.teztok.com/

Here is an example GraphQL request to retrieve the total sales volume for all indexed marketplaces during March 2022:

```graphql
query VolumeInMarch2022 {
  events_aggregate(where: {implements: {_eq: "SALE"}, timestamp: {_gte: "2022-03-01", _lt: "2022-04-01"}}) {
    aggregate {
      sum {
        price
      }
    }
  }
}
```

The purpose of the indexer is not to include every feature of every single marketplace, but to furnish a robust core that can then be extended by developers with the use of its [plugin system](plugins.md). At its core, the indexer currently supports these marketplaces and features:

## Supported Marketplaces

| Marketplace | Mints | Sales | Listings | Offers | Auctions |
|------------|-------|-------|----------|--------|----------|
| Hic et Nunc | ✓ | ✓ | ✓ | | |
| Teia | | ✓ | ✓ | | |
| fxhash | ✓ | ✓ ***** | ✓ | ✓ ** | ✗ |
| OBJKT.com | ✓ | ✓ | ✓ **** | ✓ ** | ✗ |
| Versum | ✓ | ✓ * | ✓ | ✓ | ✗ |
| 8BIDOU *** | ✓ | ✓ | ✓ | | |
| Typed | ✓ | ✓ | ✓ | | |
| 8scribo | ✓ | ✓ | ✓ | | |
| Kalamint | ✓ | ✓ * | ✓ | ✗ | ✗ |
| Rarible | ✓ | ✗ | ✗ | ✗ | ✗ |

*Please be aware, that this table is to the best of our knowledge. Marketplaces keep on adding new features over time, and some of them will not be supported by the indexer, even if there is a green checkmark.*

(*) excluding sales that happened through auctions
(**) excluding collection offers
(***) excluding the marketplace for GIFs
(****) open edition listings not supported
(*****) sales from the ticket system are only partially supported: the primary and secondary ticket markets are not directly tracked. if a user exchanges a ticket for a token, that is tracked as a sale event with the price that was paid for the ticket on the primary market.

## Navigation

- [Installation](installation.md)
- [Architecture](architecture.md)
- [Principles](principles.md)
- [Events](events.md)
- [Tokens](tokens.md)
- [Holdings](holdings.md)
- [Listings](listings.md)
- [Offers](offers.md)
- [Tags](tags.md)
- [Royalty Receivers](royaltyreceivers.md)
- [Plugins](plugins.md)
- [Maintenance](maintenance.md)
- [Examples](examples.md)
- [FAQ](faq.md)
