import indexer from './indexer';

async function run() {
  const taskName = process.argv[2];
  await indexer.spawnWorkers(taskName);
}

run();
