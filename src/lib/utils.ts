import got from 'got';
import { makeWorkerUtils, WorkerUtils } from 'graphile-worker';
import uniqBy from 'lodash/uniqBy';
import crypto from 'crypto';
import get from 'lodash/get';
import dbConfig from '../knexfile';
import config from './config';
import { BigmapDiffs, BigmapDiff, BigmapDiffAction, KeysEnum, Pattern, Transaction, GetTransactionsFilters, Transactions } from '../types';
import { CURRENCY_MAPPINGS } from '../consts';

require('dotenv').config();

export async function getLatestBlockLevel() {
  const count = await got(`${config.tzktApiUrl}/blocks/count`).json<number>();

  return count - 1;
}

let workerUtilsPromise: Promise<WorkerUtils> | null = null;

export async function getWorkerUtils() {
  if (workerUtilsPromise === null) {
    workerUtilsPromise = makeWorkerUtils({
      connectionString: dbConfig.connection,
    });
  }

  return await workerUtilsPromise;
}

function isMatchingDiff(
  diff: BigmapDiff,
  bigmapId: number | null,
  path: string,
  action: BigmapDiffAction | Array<BigmapDiffAction>,
  key?: string
) {
  const actions = Array.isArray(action) ? action : [action];

  return (
    (bigmapId === null || diff.bigmap === bigmapId) &&
    diff.path === path &&
    actions.includes(diff.action) &&
    (key ? diff.content.key === key : true)
  );
}

export function findDiff(
  diffs: BigmapDiffs,
  bigmapId: number | null,
  path: string,
  action: BigmapDiffAction | Array<BigmapDiffAction>,
  key?: string
) {
  return diffs.find((diff) => isMatchingDiff(diff, bigmapId, path, action, key));
}

export function filterDiffs(
  diffs: BigmapDiffs,
  bigmapId: number | null,
  path: string,
  action: BigmapDiffAction | Array<BigmapDiffAction>,
  key?: string
) {
  return diffs.filter((diff) => isMatchingDiff(diff, bigmapId, path, action, key));
}

const PATTERN_TO_PATH: KeysEnum<Pattern> = {
  entrypoint: 'parameter.entrypoint',
  target_address: 'target.address',
};

export function transactionMatchesPattern(transaction: Transaction, pattern: Pattern) {
  return Object.entries(pattern).every(([key, val]) => get(transaction, PATTERN_TO_PATH[key as keyof Pattern]) === val);
}

export function createEventId(handlerName: string, opid: number, idx: number = 0) {
  return crypto.createHash('md5').update(`${handlerName}:${opid}:${idx}`).digest('hex');
}

export async function getTransactions(filters: GetTransactionsFilters, perPage: number = 2000, maxPages: number = 20) {
  const allTransactions: Transactions = [];
  let currentPage = 0;

  do {
    const transactions = await got(`${config.tzktApiUrl}/operations/transactions`, {
      searchParams: {
        ...filters,
        offset: currentPage * perPage,
        limit: perPage,
        status: 'applied',
        select: 'id,level,timestamp,block,hash,counter,sender,target,amount,parameter,status,hasInternals,initiator,storage,diffs',
      },
    }).json<Transactions>();

    allTransactions.push(...transactions);

    if (transactions.length < perPage) {
      break;
    }

    currentPage++;
  } while (currentPage < maxPages);

  return uniqBy(allTransactions, 'id');
}

type ObjktCurrencyTez = { tez: {} };
type ObjktCurrencyFa12 = { fa12: string };
type ObjktCurrency = ObjktCurrencyTez | ObjktCurrencyFa12;

export function extractObjktCurrency(currency: ObjktCurrency) {
  if ('tez' in currency) {
    return 'tez';
  }

  if ('fa12' in currency) {
    if (CURRENCY_MAPPINGS[currency['fa12']]) {
      return CURRENCY_MAPPINGS[currency['fa12']];
    }

    return currency['fa12'];
  }

  return null;
}

export function getTaskName(name: string) {
  const taskNamePrefix = process.env.TASK_NAME_PREFIX;

  if (taskNamePrefix) {
    return `${taskNamePrefix}_${name}`;
  }

  return name;
}
