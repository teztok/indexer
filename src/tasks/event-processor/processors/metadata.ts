import uniqBy from 'lodash/uniqBy';
import { Processor, MetadataEvent } from '../../../types';
import { getWorkerUtils, getTaskName } from '../../../lib/utils';
import * as metadataDao from '../../../lib/daos/metadata';

const MetadataProcessor: Processor = {
  accept: (event) => 'metadata_uri' in event,

  exec: async (events) => {
    const uniqEvents: Array<MetadataEvent> = uniqBy(events, (event) => (event as MetadataEvent).metadata_uri) as Array<MetadataEvent>;
    const notExistingUris = await metadataDao.getNotExistingUris(uniqEvents.map(({ metadata_uri }) => metadata_uri));
    const workerUtils = await getWorkerUtils();

    const rows = notExistingUris.map((uri) => {
      const row: metadataDao.MetadataRow = {
        uri: uri,
        status: 'unprocessed',
        data: null,
      };

      return row;
    });

    if (rows.length) {
      await metadataDao.add(rows);

      for (const uri of notExistingUris) {
        await workerUtils.addJob(
          getTaskName('fetch-metadata'),
          { metadata_uri: uri },
          { jobKey: `resolve-metadata-${uri}`, maxAttempts: 6 }
        );
      }
    }
  },
};

export default MetadataProcessor;
