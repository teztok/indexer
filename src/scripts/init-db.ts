import path from 'path';
import db from '../lib/db';

(async () => {
  try {
    await db.migrate.latest({ directory: path.join(__dirname, '../migrations') });
    await db.destroy();
  } catch (err) {
    console.log('failed to update database scheme', err);
  }
})();
