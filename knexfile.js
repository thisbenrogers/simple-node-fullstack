// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {

  development: {
    client: 'pg',
    connection: 'postgres://localhost/simpleFullstack',
    migrations: {
      directory: './data/migrations',
    },
    seeds: {
      directory: './data/seeds',
    },
    pool: {
      min: 2,
      max: 10
    },
  },


  production: {
    client: 'pg',
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: { rejectUnauthorized: false },
    },
    migrations: {
      directory: './data/migrations',
    },
    pool: {
      min: 2,
      max: 10
    },
  }

};
