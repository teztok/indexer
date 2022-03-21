import db from '../db';

export interface RaribleActivityRow {
  id: string;
  type: string;
  timestamp: string;
  data: unknown;
}

const TABLE = 'rarible_activity';

export async function add(rows: Array<RaribleActivityRow>) {
  await db(TABLE).insert(rows).onConflict('id').ignore();
}

export async function getLatestActivityByType(type: string) {
  return db(TABLE).select('*').where('type', '=', type).orderBy('timestamp', 'desc').first();
}
