#!/usr/bin/env node
import '../bootstrap';
import minimist from 'minimist';
import { processEvents } from '../tasks/event-producer/event-producer';
import { AnyEvent } from '../tasks/event-producer/handlers';
import db from '../lib/db';

const argv = minimist(process.argv.slice(2));

if (!argv.type) {
  console.log(`usage: ./build/scripts/process-events.js --type=<event-type>`);
  process.exit();
}

async function run() {
  const events = await db<AnyEvent>('events').select('*').where('type', '=', argv.type);

  for (let i = 0; i < events.length; i++) {
    const event = events[i];

    try {
      await processEvents([event]);
      console.log(`processed event ${i} with id ${event.id}`);
    } catch (err) {
      console.log(`failed to process event ${i}`, err, event);
    }
  }
}

run();
