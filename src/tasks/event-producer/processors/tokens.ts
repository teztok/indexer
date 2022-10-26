import uniqBy from 'lodash/uniqBy';
import { Processor, TokenEvent } from '../../../types';
import { getWorkerUtils, getTaskName } from '../../../lib/utils';

const TokenProcessor: Processor = {
  accept: (event) => 'fa2_address' in event && 'token_id' in event,

  exec: async (events) => {
    const uniqEvents: Array<TokenEvent> = uniqBy<TokenEvent>(
      events as Array<TokenEvent>,
      (event) => `${event.fa2_address}-${event.token_id}`
    );
    const workerUtils = await getWorkerUtils();

    for (const event of uniqEvents) {
      await workerUtils.addJob(
        getTaskName('rebuild-token'),
        { fa2_address: event.fa2_address, token_id: event.token_id },
        { jobKey: `rebuild-token-${event.fa2_address}-${event.token_id}`, maxAttempts: 2 }
      );
    }
  },
};

export default TokenProcessor;
