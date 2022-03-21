import db from '../db';
import { Asset } from '../../types';

const TABLE = 'assets';

export async function add(assets: Array<Asset>) {
  await db(TABLE).insert(assets).onConflict(['artifact_uri', 'filename']).ignore();
}

export async function getByField(fieldName: string, value: string) {
  return db(TABLE).select('*').where(fieldName, '=', value);
}
