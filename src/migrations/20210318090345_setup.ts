import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  return knex.schema
    .createTable('tokens', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.text('metadata_uri');
      table.enum('metadata_status', ['unprocessed', 'processed', 'error']).notNullable().defaultTo('unprocessed');
      table.bigInteger('editions');
      table.bigInteger('burned_editions');
      table.timestamp('minted_at');
      table.string('minter_address', 36);
      table.string('artist_address', 36);
      table.text('symbol');
      table.text('name');
      table.text('description');
      table.text('artifact_uri');
      table.text('display_uri');
      table.text('thumbnail_uri');
      table.text('external_uri');
      table.text('mime_type');
      table.jsonb('artifact_metadata');
      table.jsonb('formats');
      table.jsonb('creators');
      table.jsonb('contributors');
      table.jsonb('assets');
      table.text('rights');
      table.text('right_uri');
      table.text('eightbid_creator_name');
      table.text('eightbid_rgb');
      table.jsonb('attributes');
      table.bigInteger('price');
      table.bigInteger('mint_price');
      table.bigInteger('last_sales_price');
      table.bigInteger('highest_sales_price');
      table.bigInteger('lowest_sales_price');
      table.bigInteger('first_sales_price');
      table.timestamp('last_sale_at');
      table.bigInteger('sales_count');
      table.jsonb('royalties');

      table.index('metadata_uri');
      table.index('artifact_uri');
      table.index('metadata_status');
      table.index('minter_address');
      table.index('artist_address');
      table.index('mime_type');
      table.primary(['fa2_address', 'token_id']);
    })
    .createTable('holdings', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.string('holder_address', 36).notNullable();
      table.bigInteger('amount').notNullable();

      table.index('holder_address');
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').onDelete('CASCADE');
      table.primary(['fa2_address', 'token_id', 'holder_address']);
    })
    .createTable('tags', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.text('tag').notNullable();

      table.index('tag');
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').onDelete('CASCADE');
      table.primary(['fa2_address', 'token_id', 'tag']);
    })
    .createTable('listings', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.text('type').notNullable();
      table.timestamp('created_at').notNullable();
      table.string('contract_address', 36).notNullable();
      table.string('seller_address', 36).notNullable();
      table.bigInteger('price').notNullable();
      table.bigInteger('amount').notNullable();
      table.bigInteger('amount_left').notNullable();
      table.bigInteger('swap_id');
      table.bigInteger('ask_id');
      table.bigInteger('offer_id');
      table.bigInteger('start_price');
      table.bigInteger('end_price');
      table.timestamp('end_time');
      table.boolean('burn_on_end');
      table.text('currency');
      table.enum('status', ['active', 'sold_out', 'canceled']).notNullable();

      table.index('fa2_address');
      table.index('token_id');
      table.index('status');
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').onDelete('CASCADE');
    })
    .createTableIfNotExists('offers', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.text('type').notNullable();
      table.timestamp('created_at').notNullable();
      table.string('contract_address', 36).notNullable();
      table.string('buyer_address', 36).notNullable();
      table.bigInteger('price').notNullable();
      table.enum('status', ['active', 'fulfilled', 'canceled']).notNullable();
      table.bigInteger('bid_id');
      table.bigInteger('offer_id');
      table.bigInteger('amount');
      table.text('currency');

      table.index('fa2_address');
      table.index('token_id');
      table.index('status');
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').onDelete('CASCADE');
    })
    .createTable('events', (table) => {
      table.string('id').notNullable();
      table.bigInteger('opid').notNullable();
      table.bigInteger('level').notNullable();
      table.timestamp('timestamp').notNullable();
      table.text('type');
      table.string('fa2_address', 36);
      table.text('token_id');
      table.enum('implements', ['SALE']);
      table.string('from_address', 36);
      table.string('to_address', 36);
      table.bigInteger('amount');
      table.string('seller_address', 36);
      table.string('buyer_address', 36);
      table.bigInteger('swap_id');
      table.bigInteger('price');
      table.bigInteger('royalties');
      table.bigInteger('editions');
      table.text('metadata_uri');
      table.text('token_name');
      table.text('creator_name');
      table.text('token_description');
      table.text('rgb');
      table.bigInteger('ask_id');
      table.bigInteger('bid_id');
      table.bigInteger('auction_id');
      table.timestamp('start_time');
      table.timestamp('end_time');
      table.bigInteger('start_price');
      table.bigInteger('current_price');
      table.bigInteger('end_price');
      table.bigInteger('bid');
      table.bigInteger('reserve');
      table.bigInteger('extension_time');
      table.bigInteger('price_increment');
      table.string('highest_bidder_address', 36);
      table.string('bidder_address', 36);
      table.string('artist_address', 36);
      table.bigInteger('collection_id');
      table.bigInteger('issuer_id');
      table.bigInteger('iteration');
      table.string('owner_address', 36);
      table.string('holder_address', 36);
      table.string('currency', 36);
      table.bigInteger('offer_id');
      table.boolean('is_mint');
      table.boolean('burn_on_end');

      table.index('implements');
      table.index('type');
      table.index('from_address');
      table.index('to_address');
      table.index('seller_address');
      table.index('buyer_address');
      table.index('artist_address');
      table.index('owner_address');
      table.index('swap_id');
      table.index('ask_id');
      table.index('bid_id');
      table.index('collection_id');
      table.index('fa2_address');
      table.index('token_id');
      table.index(['opid']);
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').deferrable('deferred');
      table.primary(['id']);
    })
    .createTable('token_metadata', (table) => {
      table.text('uri').notNullable();
      table.jsonb('data');
      table.enum('status', ['unprocessed', 'processed', 'error']).notNullable().defaultTo('unprocessed');

      table.unique(['uri']);
    })
    .createTable('rarible_activity', (table) => {
      table.text('id').notNullable();
      table.enum('type', ['MINT', 'BID', 'LIST', 'SELL', 'CANCEL_LIST', 'CANCEL_BID']).notNullable();
      table.timestamp('timestamp');
      table.jsonb('data');

      table.index('timestamp');
      table.primary(['id']);
    })
    .createTable('assets', (table) => {
      table.text('artifact_uri');
      table.text('filename');
      table.integer('filesize');
      table.text('mime_type');
      table.integer('width');
      table.integer('height');
      table.integer('duration');
      table.text('codec');
      table.enum('type', ['original', 'thumbnail']).notNullable();

      table.primary(['artifact_uri', 'filename']);
    });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema
    .dropTableIfExists('assets')
    .dropTableIfExists('tokens')
    .dropTableIfExists('holdings')
    .dropTableIfExists('tags')
    .dropTableIfExists('listings')
    .dropTableIfExists('offers')
    .dropTableIfExists('events')
    .dropTableIfExists('token_metadata')
    .dropTableIfExists('rarible_activity');
}
