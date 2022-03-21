import { run } from 'graphile-worker';
import { processors } from './processors/index';
import dbConfig from '../../knexfile';
import config from '../../lib/config';
import { Task, Event } from '../../types';

interface EventProcessorTaskPayload {
  events: Array<Event>;
}

export async function processEvents(payload: EventProcessorTaskPayload) {
  for (const processor of processors) {
    const acceptedEvents = payload.events.filter((event) => processor.accept(event));

    if (acceptedEvents.length) {
      await processor.exec(acceptedEvents);
    }
  }
}

const task: Task = {
  name: 'event-processor',

  spawnWorkers: async () => {
    await run({
      connectionString: dbConfig.connection,
      concurrency: config.eventProcessorConcurrency,
      noHandleSignals: false,
      pollInterval: config.workerPollInterval,
      taskList: {
        'event-processor': async (payload) => {
          await processEvents(payload as EventProcessorTaskPayload);
        },
      },
    });
  },
};

export default task;
