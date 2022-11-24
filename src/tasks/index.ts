import keyBy from 'lodash/keyBy';
import eventProducerTask from './event-producer/event-producer';
import fetchMetadataTask from './fetch-metadata/fetch-metadata';
import rebuildTask from './rebuild/rebuild';

export const tasks = [eventProducerTask, fetchMetadataTask, rebuildTask];

export const tasksByName = keyBy(tasks, 'name');
