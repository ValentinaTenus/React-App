/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'postgres',
    connection: 'postgres://postgres:1994@localhost:9098/tasks'
  },
};
