import { getWorkerUtils, getTaskName } from './lib/utils';
import { tasksByName } from './tasks/index';

const indexer = {
  spawnWorkers: async (taskName: string) => {
    await tasksByName[taskName].spawnWorkers();
  },

  addJob: async (taskName: string, payload: unknown) => {
    const workerUtils = await getWorkerUtils();
    return workerUtils.addJob(taskName, payload);
  },
};

export default indexer;
