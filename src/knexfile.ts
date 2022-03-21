require('dotenv').config();

export default {
  client: 'pg',
  connection: `postgresql://${process.env.POSTGRES_USER}:${process.env.POSTGRES_PASSWORD}@${process.env.POSTGRES_HOST || '127.0.0.1'}:${
    process.env.POSTGRES_PORT
  }/${process.env.POSTGRES_DB}`,
  pool: {
    min: 2,
    max: 4,
  },
  migrations: {
    tableName: 'knex_migrations',
  },
};
