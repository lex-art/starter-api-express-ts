import type { Knex } from "knex";
// Update with your config settings.

export const config: { [key: string]: Knex.Config } = {
  // Update with your config settings.
  development: {
    client: 'postgresql',
    connection: "mpostgresqlysql://for-tests:RY2alo08@HQl@postgresql-for-tests.alwaysdata.net/for-tests_pg",
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds:{
      directory: './seeds/dev'
    }
  },

  staging: {
    client: 'postgresql',
    connection: process.env.DATA_BASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds:{
      directory: './seeds/stg'
    }
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATA_BASE_URL,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations'
    },
    seeds:{
      directory: './seeds/prod'
    }
  }
};



