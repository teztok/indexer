import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import chunk from 'lodash/chunk';
import keyBy from 'lodash/keyBy';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import { run } from 'graphile-worker';
import { handlers as defaultHandlers } from './handlers/index';
import { processors } from './processors/index';
import { Pattern, Patterns, Transaction, Transactions, GetTransactionsFilters, Event, TokenEvent, Token } from '../../types';
import { transactionMatchesPattern, getTransactions, getOriginations, getTaskName } from '../../lib/utils';
import * as eventsDao from '../../lib/daos/events';
import logger from '../../lib/logger';
import config from '../../lib/config';
import dbConfig from '../../knexfile';
import db from '../../lib/db';
import { Task, TransactionHandler } from '../../types';

interface EventProducerTaskPayload {
  filters: GetTransactionsFilters;
  overwriteEvents?: boolean;
  overwriteLevel?: boolean;
}

interface Operation {
  hash: string;
  transactions: Transactions;
}

type AcceptFn = (transaction: Transaction, operation: Operation) => boolean;

interface ProcessItem {
  handler: TransactionHandler<any>;
  transaction: Transaction;
  operation: Operation;
}

function toAcceptFn(accept: Pattern | Patterns | AcceptFn): AcceptFn {
  if (isFunction(accept)) {
    return accept as AcceptFn;
  }

  if (isArray(accept)) {
    return (transaction, operation) => {
      const [firstPattern, ...otherPatterns] = accept;

      if (!transactionMatchesPattern(transaction, firstPattern)) {
        return false;
      }
      // TODO: enforce exact sequence
      return otherPatterns.every((pattern) => operation.transactions.some((trans) => transactionMatchesPattern(trans, pattern)));
    };
  }

  return (transaction) => transactionMatchesPattern(transaction, accept as Pattern);
}

export function transactionsToEvents(transactions: Transactions = [], handlers = defaultHandlers) {
  const operations = Object.values<Transactions>(groupBy(transactions, 'hash')).map<Operation>((operationTransactions) => ({
    hash: operationTransactions[0].hash,
    transactions: operationTransactions,
  }));

  const operationsByHash = keyBy(operations, 'hash');
  const processQueue: Array<ProcessItem> = [];

  for (const transaction of transactions) {
    for (const handler of handlers) {
      const operation = operationsByHash[transaction.hash];

      if (toAcceptFn(handler.accept)(transaction, operation)) {
        processQueue.push({
          handler,
          transaction,
          operation,
        });
      }
    }
  }

  const events: Array<Event> = [];

  for (const processItem of processQueue) {
    try {
      const event = processItem.handler.exec(processItem.transaction, processItem.operation);
      events.push(...(isArray(event) ? event : [event]));
    } catch (err) {
      logger.error(
        `handler "${processItem.handler.type}" failed to process transaction ${processItem.transaction.id}: ${(err as Error).message}`
      );
    }
  }

  return events;
}

const ignoredContractAddressesObj: Record<string, boolean> = config.ignoredContractAddresses.reduce(
  (lookup, address) => ({ [address]: true, ...lookup }),
  {}
);

export async function processEvents(events: Array<Event>) {
  for (const processor of processors) {
    const acceptedEvents = events.filter((event) => processor.accept(event));

    if (acceptedEvents.length) {
      await processor.exec(acceptedEvents);
    }
  }
}

export async function produceEvents(payload: EventProducerTaskPayload) {
  const transactions = await getTransactions(payload.filters);
  const originations = await getOriginations(payload.filters);

  let events = transactionsToEvents(transactions);
  // TODO: add originationsToEvents

  events = events.filter((event) => {
    if (!('fa2_address' in event)) {
      return true;
    }

    // TODO: generalize this?
    return !((event as TokenEvent).fa2_address in ignoredContractAddressesObj);
  });

  if (!payload.overwriteEvents) {
    try {
      events = await eventsDao.getNotExistingEvents(events);
    } catch (err) {
      logger.error(`could not remove existing events`, err);
    }
  }

  console.log(`processing ${events.length} events.`, JSON.stringify(payload.filters));

  if (!events.length) {
    return;
  }

  const tokenEvents = events.filter((event) => 'fa2_address' in event && 'token_id' in event) as Array<TokenEvent>;
  const tokens = uniqBy(tokenEvents, ({ fa2_address, token_id }) => `${fa2_address}-${token_id}`).map((event) => ({
    fa2_address: event.fa2_address,
    token_id: event.token_id,
  })) as Array<Token>;

  await db.transaction(async (trx) => {
    // TODO: remove this logic here. instead, the rebuild-token should take care of it
    for (const chunkOfTokens of chunk(tokens, 50)) {
      await db('tokens').insert(chunkOfTokens).onConflict(['fa2_address', 'token_id']).ignore().transacting(trx);
    }

    if (payload.overwriteLevel && payload.filters.level) {
      await db('events').where('level', '=', payload.filters.level).del().transacting(trx);
    }

    for (const chunkOfEvents of chunk(events, 50)) {
      await db('events')
        .whereIn(
          'id',
          chunkOfEvents.map(({ id }) => id)
        )
        .del()
        .transacting(trx);
      await db('events').insert(chunkOfEvents).onConflict('id').ignore().transacting(trx);
    }
  });

  await processEvents(events);
}

const task: Task = {
  name: 'event-producer',

  spawnWorkers: async () => {
    await run({
      connectionString: dbConfig.connection,
      concurrency: config.eventProducerConcurrency,
      noHandleSignals: false,
      pollInterval: config.workerPollInterval,
      taskList: {
        [getTaskName('event-producer')]: async (payload) => {
          await produceEvents(payload as EventProducerTaskPayload);
        },
      },
    });
  },
};

export default task;
