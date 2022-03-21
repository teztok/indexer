import db from '../db';
import { Token } from '../../types';

const TABLE = 'tokens';

export async function add(tokens: Token | Array<Token>) {
  await db(TABLE).insert(tokens).onConflict(['fa2_address', 'token_id']).ignore();
}

export async function update(token: Token) {
  return db(TABLE).where('fa2_address', '=', token.fa2_address).andWhere('token_id', '=', token.token_id).update(token);
}

// TODO: naming
export async function get(fa2Address: string, tokenId: string) {
  return db(TABLE).select('*').where('fa2_address', '=', fa2Address).andWhere('token_id', '=', tokenId).first();
}

export async function getByField(fieldName: string, value: string) {
  return db(TABLE).select('*').where(fieldName, '=', value);
}
