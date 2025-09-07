import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw(`
    CREATE OR REPLACE FUNCTION update_timestamp() RETURNS TRIGGER
    LANGUAGE plpgsql
    AS
    $$
    BEGIN
        NEW.updated_at = CURRENT_TIMESTAMP;
        RETURN NEW;
    END;
    $$;
  `);

  await knex.schema
    .createTable('tokens', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.text('platform');
      table.string('last_processed_event_id');
      table.timestamp('last_processed_event_timestamp');
      table.bigInteger('last_processed_event_level');
      table.text('metadata_uri');
      table.enum('metadata_status', ['unprocessed', 'processed', 'error']).notNullable().defaultTo('unprocessed');
      table.bigInteger('editions');
      table.bigInteger('burned_editions');
      table.timestamp('minted_at');
      table.string('contract_creator_address', 36);
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
      table.text('rights');
      table.text('right_uri');
      table.text('eightbid_creator_name');
      table.text('eightbid_rgb');
      table.bigInteger('objkt_artist_collection_id');
      table.boolean('fx_is_ticket');
      table.bigInteger('fx_issuer_id');
      table.bigInteger('fx_iteration');
      table.string('fx_ticket_fa2_address', 36);
      table.text('fx_ticket_token_id');
      table.text('fx_collection_name');
      table.text('fx_collection_description');
      table.text('fx_collection_display_uri');
      table.text('fx_collection_thumbnail_uri');
      table.bigInteger('fx_collection_editions');
      table.jsonb('attributes');
      table.jsonb('lowest_price_listing');
      table.bigInteger('price');
      table.bigInteger('last_sales_price');
      table.bigInteger('highest_sales_price');
      table.bigInteger('lowest_sales_price');
      table.bigInteger('first_sales_price');
      table.bigInteger('current_price_to_last_sales_price_diff');
      table.bigInteger('current_price_to_last_sales_price_pct');
      table.bigInteger('current_price_to_highest_sales_price_diff');
      table.bigInteger('current_price_to_highest_sales_price_pct');
      table.bigInteger('current_price_to_lowest_sales_price_diff');
      table.bigInteger('current_price_to_lowest_sales_price_pct');
      table.bigInteger('current_price_to_first_sales_price_diff');
      table.bigInteger('current_price_to_first_sales_price_pct');
      table.bigInteger('highest_offer_price');
      table.timestamp('last_sale_at');
      table.bigInteger('sales_count');
      table.bigInteger('sales_volume');
      table.bigInteger('royalties_total');
      table.text('eightscribo_title');
      table.text('eightscribo_rowone');
      table.text('eightscribo_rowtwo');
      table.text('eightscribo_rowthree');

      table.text('teiacafe_playlist_description');
      table.text('teiacafe_playlist_cover');
      table.text('teiacafe_playlist_curator_fee');
      table.jsonb('teiacafe_playlist');

      table.boolean('is_verified_artist');
      table.timestamp('updated_at').defaultTo(knex.fn.now());

      table.index('updated_at');
      table.index('is_verified_artist');
      table.index('rights');
      table.index('platform');
      table.index('minted_at');
      table.index('editions');
      table.index('price');
      table.index('last_processed_event_timestamp');
      table.index('last_processed_event_level');
      table.index('metadata_uri');
      table.index('artifact_uri');
      table.index('metadata_status');
      table.index('contract_creator_address');
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
      table.timestamp('last_received_at');
      table.timestamp('first_received_at');

      table.index('holder_address');
      table.index('last_received_at');
      table.index('first_received_at');
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
    .createTable('royalty_receivers', (table) => {
      table.string('fa2_address', 36).notNullable();
      table.text('token_id').notNullable();
      table.string('receiver_address', 36).notNullable();
      table.bigInteger('royalties').notNullable();

      table.index('receiver_address');
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').onDelete('CASCADE');
      table.primary(['fa2_address', 'token_id', 'receiver_address']);
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

      table.index('end_time');
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
      table.timestamp('end_time');
      table.text('currency');

      table.index('fa2_address');
      table.index('token_id');
      table.index('status');
      table.index('end_time');
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').onDelete('CASCADE');
    })
    .createTable('events', (table) => {
      table.string('id').notNullable();
      table.bigInteger('opid').notNullable();
      table.bigInteger('level').notNullable();
      table.timestamp('timestamp').notNullable();
      table.text('type');
      table.string('fa2_address', 36);
      table.text('ophash');
      table.text('token_id');
      table.enum('implements', ['SALE']);
      table.string('from_address', 36);
      table.string('to_address', 36);
      table.bigInteger('amount');
      table.string('seller_address', 36);
      table.string('buyer_address', 36);
      table.bigInteger('swap_id');
      table.bigInteger('price');
      table.bigInteger('price_in_eur');
      table.bigInteger('price_in_usd');
      table.bigInteger('price_in_cny');
      table.bigInteger('price_in_jpy');
      table.bigInteger('price_in_krw');
      table.bigInteger('price_in_gbp');
      table.jsonb('quotes');
      table.bigInteger('royalties');
      table.jsonb('royalty_shares');
      table.bigInteger('editions');
      table.text('metadata_uri');
      table.jsonb('metadata');
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
      table.text('eightscribo_title');
      table.text('eightscribo_rowone');
      table.text('eightscribo_rowtwo');
      table.text('eightscribo_rowthree');
      table.text('ledger_type');
      table.boolean('is_verified_artist');
      table.boolean('kalamint_on_sale');
      table.bigInteger('kalamint_editions');
      table.bigInteger('kalamint_edition');
      table.jsonb('custom_data');
      table.string('contract_address', 36);
      table.string('ticket_fa2_address', 36);
      table.text('ticket_token_id');

      table.string('sender_address', 36);
      table.string('initiator_address', 36);
      table.bigInteger('type_hash');
      table.bigInteger('code_hash');

      table.index('level');
      table.index('implements');
      table.index('type');
      table.index('ophash');
      table.index('timestamp');
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
      table.index('issuer_id');
      table.index('fa2_address');
      table.index('token_id');
      table.index(['opid']);
      table.index('contract_address');
      table.foreign(['fa2_address', 'token_id']).references(['fa2_address', 'token_id']).inTable('tokens').deferrable('deferred');
      table.primary(['id']);
    })
    .createTable('token_metadata', (table) => {
      table.text('uri').notNullable();
      table.jsonb('data');
      table.enum('status', ['unprocessed', 'processed', 'error']).notNullable().defaultTo('unprocessed');

      table.unique(['uri']);
    });

  await knex.raw(`
      CREATE TRIGGER update_timestamp
      BEFORE UPDATE
      ON tokens
      FOR EACH ROW
      EXECUTE PROCEDURE update_timestamp();
    `);
}

export async function down(knex: Knex): Promise<void> {
  await knex.raw(`
    DROP FUNCTION IF EXISTS update_timestamp() CASCADE;
  `);

  return knex.schema
    .dropTableIfExists('tokens')
    .dropTableIfExists('holdings')
    .dropTableIfExists('tags')
    .dropTableIfExists('listings')
    .dropTableIfExists('offers')
    .dropTableIfExists('events')
    .dropTableIfExists('token_metadata');
}
