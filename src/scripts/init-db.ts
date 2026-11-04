import '../bootstrap';
import path from 'path';
import db from '../lib/db';
import { getWorkerUtils } from '../lib/utils';

(async () => {
  try {
    // Installs the graphile_worker schema. The migrations create a function
    // returning rows of graphile_worker.jobs, so it has to exist first. On an
    // existing database this is a no-op.
    const workerUtils = await getWorkerUtils();
    await workerUtils.release();

    await db.migrate.latest({ directory: path.join(__dirname, '../migrations') });
    await db.destroy();
  } catch (err) {
    console.log('failed to update database scheme', err);
    process.exitCode = 1;
  }
})();
