# TezTok Plugin System

Even though the TezTok indexer supports a wide range of token and marketplaces contracts by default, users tend to have additional requirements that are sometimes not covered by the indexer. If we would add every requested feature to the core, it would soon become unmaintainable. As a solution to this problem, the indexer has a plugin system that allows users to extend the core with additional functionality.

If you want to extend the indexer with a plugin, it means that you have to run an instance of the indexer on your own server and add the plugin there. Alternatively, you can ask/hire us for support on developing and hosting plugins.

Here are some things that can be achieved with plugins:

* Creation of new event types
* Creation of new data models (e.g. user models, auction models, etc.)
* Accumulation of statistics
* Data processing (e.g. download and extract colors of artifacts)

## Getting Started

Plugins are added to `src\plugins` as subfolders and then need to be loaded in `src\plugins\loader.ts`. If a plugin introduces new event handlers, their types need to be registered in `src\plugins\types.ts`.

A plugin can create its own postgres tables. This can be achieved by adding a typescript file with the name `create-tables.ts` into the folder of the plugin. This file needs to default export a function that creates the database tables. TezTok uses the [knex library to create database tables](https://knexjs.org/guide/schema-builder.html). Take a look at `src/plugins/teia/create-tables.ts` as an example of a `create-tables.ts` file.

In order to create the tables, the indexer needs to be built first by running the `npm run build` command and then the tables can be created by running the command `node ./build/scripts/create-plugin-tables.js <plugin-name>`.

## Hooks

The plugin system provides several hooks that can be used by a plugin to extend the indexers functionality.
These are the available hooks:

### onEventsProduced

Every time a new block gets created on the Tezos Blockchain, the indexer fetches that block and parses all transactions and originations, and then creates normalized TezTok events that get stored in the database. For example, there are mint events, sale events, transfer events, etc.

The `onEventsProduced` hook gets called after a block was parsed and a set of teztok events were created.

example:

```TypeScript

import { onEventsProduced } from '../plugins';

onEventsProduced(async (events) => {
    console.log(`${events.length} events created.`);
});
```

### onTokenRebuild

The way the TezTok indexer works is that it creates and stores an event history for each token (and potentially other entities, like collections, split contracts, etc.) and then uses these events to build data models. So for example, if one edition of a token gets transferred to a burn address, the indexer creates a `TRANSFER` event first and then adds a rebuild job for that token to a queue. A worker then executes the rebuild job and re-creates the data model of the token from the event history. In the case of the example, the token would have one edition less after the rebuild. 

The `onTokenRebuild` hook gets triggered every time such a token-related rebuild happens.

example:

```TypeScript
import { onTokenRebuild } from '../plugins';

onTokenRebuild(async ({ token, listings, offers, holders }) => {
    console.log(`the token with the contract address ${token.fa2_address} and the id ${token.token_id} has been rebuild.`, token, listings, offers, holders);
});
```

### onRebuild

Similar to the token model, a plugin can introduce its own data models and rebuild them every time certain TezTok events occur.

In order to rebuild the custom data models, the `onRebuild` hook can be used.

example:

```TypeScript
onRebuild(async (type, payload) => {
    if (type !== 'my-custom-data-model') {
        return;
    }

    // rebuild data model
});

```

### onMetadataFetched

The indexer has a separate queue that is responsible for fetching token metadata from IPFS.

The `onMetadataFetched` hook gets triggered every time metadata got fetched from IPFS.

example:

```TypeScript
import { onMetadataFetched } from '../plugins';

onMetadataFetched(async (metadataUri, metadata) => {
    console.log(`fetched ${metadataUri} from ipfs.`, metadata);
});
```

### registerTransactionEventHandler, registerOriginationEventHandler

A plugin can introduce its own event types by registering transaction or origination event handlers.


```TypeScript
import { registerTransactionEventHandler, registerOriginationEventHandler } from '../plugins';
import MyTransactionHandler from './handlers/my_transaction_handler';
import MyOriginationHandler from './handlers/my_origination_handler';

registerTransactionEventHandler(MyTransactionHandler);
registerOriginationEventHandler(MyOriginationHandler);
```

## Example Plugin

This repository contains one example plugin called `teia` (see `src\plugins\teia`) that extends the indexer with the ability to index teia users and teia split contracts. It's a good starting point to learn more about how plugins can be coded.