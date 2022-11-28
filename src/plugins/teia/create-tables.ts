import db from '../../lib/db';

export default async function createTables() {
  await db.schema
    .createTable('teia_users', (table) => {
      table.string('user_address', 36).notNullable();
      table.text('name');
      table.text('metadata_uri');
      table.boolean('is_split');

      table.index('name');
      table.primary(['user_address']);
    })
    .createTable('teia_split_contracts', (table) => {
      table.string('contract_address', 36).notNullable();
      table.string('administrator_address', 36).notNullable();
      table.bigInteger('total_shares');

      table.primary(['contract_address']);
    })
    .createTable('teia_shareholders', (table) => {
      table.string('contract_address', 36).notNullable();
      table.string('shareholder_address', 36).notNullable();
      table.bigInteger('shares');
      table.string('holder_type');

      table.primary(['contract_address', 'shareholder_address', 'holder_type']);
    })
    .createTable('teia_signatures', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.string('shareholder_address', 36).notNullable();

      table.primary(['fa2_address', 'token_id', 'shareholder_address']);
    })
    .createTable('teia_tokens_meta', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.boolean('is_signed').notNullable();
      table.jsonb('accessibility');
      table.text('content_rating');

      table.primary(['fa2_address', 'token_id']);
    });
}
