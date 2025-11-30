# Events

TezTok Events play a crucial role in the indexer. The indexer monitors the Tezos Mainnet and generates normalized TezTok events for NFT-related activities that occur on the network. Here is an example event that represents the transfer of a token from one Tezos account to another:

```graphql
{
    id: 'ea1d4a084007c5e24fcd7dcd3a8b9092',
    type: 'FA2_TRANSFER',
    opid: 52568926,
    level: 1495010,
    timestamp: '2021-05-31T08:08:46Z',
    ophash: 'op8dmZUuY4qu2Kp7Hok9DQVMzXr1YZrsLaA2C4svAmtQCiaXmNZ',

    fa2_address: 'KT1RJ6PbjHpwc3M5rw5s2Nbmefwbuwbdxton',
    token_id: '58486',

    from_address: 'KT1Hkg5qeNhfwpKW4fXvq7HGZB9z2EnmCCA9',
    to_address: 'tz1ejpAPJZAe2boiKUGwb6cq5dckTZ8hXn2A',
    amount: 1
}
```

Let's have a closer look at the different properties of this event:

- **id:** A unique ID that is used to identify the event.
- **type:** The kind of event. In this case, it's set to `FA2_TRANSFER`, which indicates the transfer of a token from one Tezos account to another.
- **opid:** An ID created by TzKT that is used to identify an operation.
- **level:** The level of the block that contains the operation that led to this TezTok event.
- **timestamp:** The date/time of the block that contains the operation that led to this TezTok event.
- **ophash:** The hash of the operation that led to this TezTok event.
- **fa2_address** and **token_id**: The Tezos address of the contract and the id of the token.
- **from_address** and **to_address**: The Tezos account that sent the token and the Tezos account that received it.
- **amount:** The number of editions that were transferred.

All TezTok events have the properties **id**, **type**, **opid**, **level**, **timestamp** and **ophash**. If the event refers to a token (which is the case for most events), it will have the properties **fa2_address** and **token_id**. Depending on the type of event, it has additional properties. In the case of the example, it has the additional properties **from_address**, **to_address** and **amount**.

## Sale Events

Sale events represent a sale of a token. They all share the properties **seller_address**, **buyer_address** and **price**, as well as a property **implements** that is set to the value **SALE**. Sale events are especially useful to do volume-related aggregations. For example, this GraphQL query will return how much a certain account has spent on buying NFTs:

```graphql
query SpentInTotal {
  events_aggregate(where: {implements: {_eq: "SALE"}, buyer_address: {_eq: "tz1RJrjBafWDdNhnJDK41ivKRuecMjY9NaxB"}}) {
    aggregate {
      sum {
        price
      }
    }
  }
}
```

## Event Types

For detailed information about all event types and their properties, please refer to the eventdata.json file in the original source code or explore the GraphQL API documentation.

## Navigation

- [← Principles](principles.md)
- [Tokens →](tokens.md)
