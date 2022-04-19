import got from 'got';
import get from 'lodash/get';
import chunk from 'lodash/chunk';
import { run } from 'graphile-worker';
import dbConfig from '../../knexfile';
import * as raribleDao from '../../lib/daos/rarible';
import { getTaskName } from '../../lib/utils';
import { Task } from '../../types';

interface ActivitiesResult {
  continuation?: string;
  activities: Array<{ id: string; date: string }>;
}

const RARIBLE_ACTIVITY_TYPES = ['MINT', 'BID', 'LIST', 'SELL', 'CANCEL_LIST', 'CANCEL_BID'];

export async function getRaribleActivity(type: string, stopId?: string) {
  const allActivities = [];
  let continuation = null;

  do {
    const searchParams: Record<string, string> = {
      blockchains: 'TEZOS',
      type,
    };

    if (continuation) {
      searchParams.continuation = continuation;
    }

    const result = await got(`https://api.rarible.org/v0.1/activities/all`, {
      searchParams,
    }).json<ActivitiesResult>();

    continuation = result.continuation;

    for (const activity of result.activities) {
      if (stopId && activity.id === stopId) {
        console.log('fetched', type, get(allActivities[allActivities.length - 1], 'date'), allActivities.length);
        return allActivities;
      } else {
        allActivities.push(activity);
      }
    }

    console.log('fetched', type, get(allActivities[allActivities.length - 1], 'date'), allActivities.length);
  } while (continuation);

  return allActivities;
}

export async function updateRaribleActivity() {
  for (const activityType of RARIBLE_ACTIVITY_TYPES) {
    const latestStoredActivity = await raribleDao.getLatestActivityByType(activityType);
    const stopId = latestStoredActivity ? latestStoredActivity.id : undefined;

    const activities = await getRaribleActivity(activityType, stopId);
    const rows = activities.map((activity) => ({ id: activity.id, timestamp: activity.date, type: activityType, data: activity }));
    const chunks = chunk(rows, 50);

    for (const rowsChunk of chunks) {
      await raribleDao.add(rowsChunk);
    }
  }
}

const task: Task = {
  name: 'rarible-fetch',

  spawnWorkers: async () => {
    await run({
      connectionString: dbConfig.connection,
      concurrency: 1,
      noHandleSignals: false,
      pollInterval: 500,
      taskList: {
        [getTaskName('rarible-fetch')]: async (payload) => {},
      },
    });
  },
};

export default task;
