import differenceBy from 'lodash/differenceBy';
import difference from 'lodash/difference';
import db from '../db';
import { TokenEvent, Event } from '../../types';
import { AnyEvent } from '../../tasks/event-producer/handlers/index';

const TABLE = 'events';

export async function add(events: Array<Event | TokenEvent>) {
  await db(TABLE).insert(events).onConflict('id').ignore();
}

export async function getLatestLevel() {
  const { max } = await db(TABLE).max('level').first<{ max: string }>();

  return parseInt(max, 10);
}

export async function getNotExistingEvents(events: Array<AnyEvent>): Promise<Array<AnyEvent>> {
  const existingEvents = await db(TABLE)
    .select('id')
    .whereIn(
      'id',
      events.map(({ id }) => id)
    );
  return differenceBy(events, existingEvents, ({ id }) => id);
}

export async function getMatchingEvents(events: Array<Partial<Event>>): Promise<Array<Event>> {
  const queryBuilder = db(TABLE);

  for (let i = 0; i < events.length; i++) {
    if (i === 0) {
      queryBuilder.where(events[i]);
    } else {
      queryBuilder.orWhere(events[i]);
    }
  }

  return await queryBuilder;
}

export async function getTokenEvents(fa2Address: string, tokenId: string) {
  return db(TABLE)
    .select('*')
    .where('fa2_address', '=', fa2Address)
    .andWhere('token_id', '=', tokenId)
    .orderBy('timestamp')
    .orderBy('opid');
}
