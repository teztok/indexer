import '../../bootstrap';
import groupBy from 'lodash/groupBy';
import uniqBy from 'lodash/uniqBy';
import uniq from 'lodash/uniq';
import chunk from 'lodash/chunk';
import keyBy from 'lodash/keyBy';
import isFunction from 'lodash/isFunction';
import isArray from 'lodash/isArray';
import { run } from 'graphile-worker';
import { handlers as defaultHandlers, AnyEvent } from './handlers/index';
import { processors } from './processors/index';
import {
  Pattern,
  Patterns,
  Transaction,
  Transactions,
  GetTransactionsFilters,
  Event,
  TokenEvent,
  Token,
  Origination,
  Originations,
  Task,
  TransactionHandler,
  OriginationHandler,
} from '../../types';
import { transactionMatchesPattern, getBlockQuotes, getTransactions, getOriginations, getTaskName } from '../../lib/utils';
import * as eventsDao from '../../lib/daos/events';
import logger from '../../lib/logger';
import config from '../../lib/config';
import dbConfig from '../../knexfile';
import db from '../../lib/db';
import {
  triggerEventsProduced,
  transactionHandlers as pluginTransactionHandlers,
  originationHandlers as pluginOriginationHandlers,
} from '../../plugins/plugins';

interface EventProducerTaskPayload {
  filters: GetTransactionsFilters;
  overwriteEvents?: boolean;
  overwriteLevel?: boolean;
}

interface Operation {
  hash: string;
  transactions: Transactions;
}

type TransactionAcceptFn = (transaction: Transaction, operation: Operation) => boolean;

interface TransactionProcessItem {
  handler: TransactionHandler<AnyEvent>;
  transaction: Transaction;
  operation: Operation;
}

interface OriginationProcessItem {
  handler: OriginationHandler<AnyEvent>;
  origination: Origination;
}

const transactionHandlers: Array<TransactionHandler<AnyEvent>> = defaultHandlers.filter(({ source }) => source === 'transaction') as Array<
  TransactionHandler<AnyEvent>
>;

const originationHandlers: Array<OriginationHandler<AnyEvent>> = defaultHandlers.filter(({ source }) => source === 'origination') as Array<
  OriginationHandler<AnyEvent>
>;

function toTransactionAcceptFn(accept: Pattern | Patterns | TransactionAcceptFn): TransactionAcceptFn {
  if (isFunction(accept)) {
    return accept as TransactionAcceptFn;
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

export function transactionsToEvents(transactions: Transactions = [], handlers: Array<TransactionHandler<AnyEvent>>) {
  const operations = Object.values<Transactions>(groupBy(transactions, 'hash')).map<Operation>((operationTransactions) => ({
    hash: operationTransactions[0].hash,
    transactions: operationTransactions,
  }));

  const operationsByHash = keyBy(operations, 'hash');
  const processQueue: Array<TransactionProcessItem> = [];

  for (const transaction of transactions) {
    for (const handler of handlers) {
      const operation = operationsByHash[transaction.hash];

      if (toTransactionAcceptFn(handler.accept)(transaction, operation)) {
        processQueue.push({
          handler,
          transaction,
          operation,
        });
      }
    }
  }

  const events: Array<AnyEvent> = [];

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

export function originationsToEvents(originations: Originations = [], handlers: Array<OriginationHandler<AnyEvent>>) {
  const processQueue: Array<OriginationProcessItem> = [];

  for (const origination of originations) {
    for (const handler of handlers) {
      if (handler.accept(origination)) {
        processQueue.push({
          handler,
          origination,
        });
      }
    }
  }

  const events: Array<AnyEvent> = [];

  for (const processItem of processQueue) {
    try {
      const event = processItem.handler.exec(processItem.origination);
      events.push(...(isArray(event) ? event : [event]));
    } catch (err) {
      logger.error(
        `handler "${processItem.handler.type}" failed to process origination ${processItem.origination.id}: ${(err as Error).message}`
      );
    }
  }

  return events;
}

const ignoredContractAddressesObj: Record<string, boolean> = config.ignoredContractAddresses.reduce(
  (lookup, address) => ({ [address]: true, ...lookup }),
  {}
);

export async function processEvents(events: Array<AnyEvent>) {
  for (const processor of processors) {
    const acceptedEvents = events.filter((event) => processor.accept(event));

    if (acceptedEvents.length) {
      await processor.exec(acceptedEvents);
    }
  }

  await triggerEventsProduced(events);
}

export async function addQuotesToEvents(events: Array<AnyEvent>) {
  const blockLevels = uniq(events.map((event) => event.level).filter((level) => level));

  for (const level of blockLevels) {
    const quotes = await getBlockQuotes(level, ['btc', 'eth', 'eur', 'usd', 'cny', 'jpy', 'krw', 'gbp']);

    try {
      for (const event of events) {
        event.quotes = quotes;

        if ('price' in event && event.price && (!('currency' in event) || !event.currency || ['tez', 'otez'].includes(event.currency))) {
          const price = parseInt(event.price, 10);

          if (quotes.eur) {
            // note that the user needs to devide this by 1000000, since price is in muTEZ
            event.price_in_eur = String((price * quotes.eur).toFixed(0));
          }

          if (quotes.usd) {
            event.price_in_usd = String((price * quotes.usd).toFixed(0));
          }

          if (quotes.cny) {
            event.price_in_cny = String((price * quotes.cny).toFixed(0));
          }

          if (quotes.jpy) {
            event.price_in_jpy = String((price * quotes.jpy).toFixed(0));
          }

          if (quotes.krw) {
            event.price_in_krw = String((price * quotes.krw).toFixed(0));
          }

          if (quotes.gbp) {
            event.price_in_gbp = String((price * quotes.gbp).toFixed(0));
          }
        }
      }
    } catch (err) {
      logger.error(`failed to set quotes in events of block-level ${level}`, err);
    }
  }
}

export async function produceEvents(payload: EventProducerTaskPayload) {
  const transactions = await getTransactions(payload.filters);
  const originations = await getOriginations(payload.filters);

  let events = [
    ...originationsToEvents(originations, [...originationHandlers, ...pluginOriginationHandlers]),
    ...transactionsToEvents(transactions, [...transactionHandlers, ...pluginTransactionHandlers]),
  ];

  events = events.filter((event) => {
    if (!('fa2_address' in event)) {
      return true;
    }

    if (config.allowedContractAddresses && Array.isArray(config.allowedContractAddresses)) {
      return (config.allowedContractAddresses as Array<string>).includes((event as TokenEvent).fa2_address);
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

  await addQuotesToEvents(events);

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
