import '../bootstrap';
import { handlers } from '../tasks/event-producer/handlers/index';

const marketplaceMappings: Record<string, string> = {
  HEN: 'hic et nunc',
  FXHASH: 'fxhash',
  OBJKT: 'objkt.com',
  VERSUM: 'versum',
  '8BID': '8bidou',
  TYPED: 'typed',
  '8SCRIBO': '8scribo',
  RARIBLE: 'rarible',
  KALAMINT: 'kalamint',
};

const eventsDocJson = handlers.map((handler) => {
  const pieces = handler.type.split('_');
  let marketplaceKey = null;
  let marketplaceName = null;
  let description = null;
  let fields = null;
  let isSalesEvent = false;
  let isTokenEvent = false;

  if (pieces[0] && pieces[0] in marketplaceMappings) {
    marketplaceKey = pieces[0];
    marketplaceName = marketplaceMappings[pieces[0]];
  }

  description = handler.meta.eventDescription;

  if (handler.meta.eventFields) {
    fields = handler.meta.eventFields.map(([fieldName, fieldType, fieldDescription]) => ({
      name: fieldName,
      type: fieldType,
      description: fieldDescription,
    }));

    isSalesEvent = fields.some(({ name }) => name === 'implements');
    isTokenEvent = fields.some(({ name }) => name === 'fa2_address') && fields.some(({ name }) => name === 'token_id');
  }

  return {
    type: handler.type,
    marketplaceKey,
    marketplaceName,
    description,
    isSalesEvent,
    isTokenEvent,
    fields,
  };
});

console.log(JSON.stringify(eventsDocJson, null, 2));
