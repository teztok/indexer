import keyBy from 'lodash/keyBy';
import eventProducerTask from './event-producer/event-producer';
import fetchMetadataTask from './fetch-metadata/fetch-metadata';
import rebuildTokenTask from './rebuild-token/rebuild-token';

export const tasks = [eventProducerTask, fetchMetadataTask, rebuildTokenTask];

export const tasksByName = keyBy(tasks, 'name');
