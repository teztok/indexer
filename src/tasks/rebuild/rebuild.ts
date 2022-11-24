import '../../bootstrap';
import { run } from 'graphile-worker';
import dbConfig from '../../knexfile';
import config from '../../lib/config';
import { getTaskName } from '../../lib/utils';
import { Task } from '../../types';
import { rebuildToken, RebuildTokenTaskPayload } from './rebuild-token';
import { triggerRebuild } from '../../plugins/plugins';

interface RebuildTaskPayload {
  type: string;
}

export async function rebuild(payload: RebuildTaskPayload | RebuildTokenTaskPayload) {
  if (payload.type === 'token') {
    await rebuildToken(payload as RebuildTokenTaskPayload);
  }

  await triggerRebuild(payload.type, payload);
}

const task: Task = {
  name: 'rebuild',

  spawnWorkers: async () => {
    await run({
      connectionString: dbConfig.connection,
      concurrency: config.rebuildConcurrency,
      noHandleSignals: false,
      pollInterval: config.rebuildPollInterval || config.workerPollInterval,
      taskList: {
        [getTaskName('rebuild')]: async (payload) => {
          await rebuild(payload as RebuildTaskPayload);
        },
      },
    });
  },
};

export default task;
