import '../bootstrap';
import keyBy from 'lodash/keyBy';
import eventProducerTask from './event-producer/event-producer';
import fetchMetadataTask from './fetch-metadata/fetch-metadata';
import rebuildTask from './rebuild/rebuild';
import { tasks as pluginTasks } from '../plugins/plugins';

export const tasks = [eventProducerTask, fetchMetadataTask, rebuildTask, ...pluginTasks];

export const tasksByName = keyBy(tasks, 'name');
