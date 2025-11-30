# Principles

When we designed the architecture of the indexer, we had several requirements:

- It should run in production without causing too much headache. We didn't want to have to constantly worry about the indexer.
- It should be possible to re-index data without causing downtime.
- It should be able to handle chain reorgs by design.

To attain these aims, we concluded that making **idempotency** and **statelessness** central characteristics of the indexer would greatly assist in achieving them.

## Idempotency

In practice, this means, indexing the same transactions multiple times will not cause data inconsistency. Instead, existing data models will simply be overwritten. With this design, fixing bugs in data models becomes trivial: All that needs to be done is to fix the bug in the code and then re-index the affected transactions. This is a process that can happen in parallel while the indexer is running in production.

## Statelessness

The indexer doesn't store any separate state about which transactions it has already processed. Instead, it checks in the TezTok events for the latest block that was indexed and starts indexing from there. In addition, there are scripts the operator can use to explicitly tell the indexer which blocks it should (re-)index.

## Navigation

- [← Architecture](architecture.md)
- [Events →](events.md)
