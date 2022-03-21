import difference from 'lodash/difference';
import db from '../db';

export interface MetadataRow {
  uri: string;
  status: string;
  data: string | null;
}

const TABLE = 'token_metadata';

export async function add(rows: Array<MetadataRow>) {
  await db(TABLE).insert(rows).onConflict('uri').ignore();
}

export async function update(uri: string, status: string, data: unknown = null) {
  return db(TABLE).where('uri', '=', uri).update({
    status,
    data,
  });
}

export async function getNotExistingUris(uris: Array<string>): Promise<Array<string>> {
  const results = await db(TABLE).select('uri').whereIn('uri', uris);
  const existingUris = results.map(({ uri }) => uri);

  return difference(uris, existingUris);
}

export async function getByUri(uri: string) {
  return db(TABLE).select('*').where('uri', '=', uri).first();
}
