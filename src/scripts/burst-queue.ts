import { produceEvents } from '../tasks/event-producer/event-producer';
import { processEvents } from '../tasks/event-processor/event-processor';
import { rebuildToken } from '../tasks/rebuild-token/rebuild-token';
import db from '../lib/db';

const tasks: Record<string, (payload: any) => {}> = {
  'event-producer': produceEvents,
  'event-processor': processEvents,
  'rebuild-token': rebuildToken,
};

async function run() {
  const taskId = process.argv[2];
  if (!(taskId in tasks)) {
    throw new Error('invalid task id');
  }

  const count = process.argv[3] ? parseInt(process.argv[3], 10) : 1000;
  const results = await db
    .select('*')
    .from('graphile_worker.jobs')
    .where('task_identifier', taskId)
    .orderBy('id', process.argv[4] || 'asc')
    .limit(count);

  for (let i = 0; i < results.length; i++) {
    const result = results[i];
    console.log(`processing ${i}`);
    console.time(`task-${i}`);
    try {
      await tasks[taskId]!(result.payload);
      await db('graphile_worker.jobs').where('id', result.id).del();
    } catch (err) {
      console.log('err', err);
    }
    console.timeEnd(`task-${i}`);
  }
}

run();
