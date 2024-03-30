import { type Knex } from 'knex';

import {
  DatabaseColumnName,
  DatabaseTableName,
} from '../common/database/enums/enums';

async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable(DatabaseTableName.LISTS, (table) => {
    table
      .uuid(DatabaseColumnName.ID)
      .unique()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table.string(DatabaseColumnName.NAME).notNullable();
    table
      .dateTime(DatabaseColumnName.CREATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
    table
      .dateTime(DatabaseColumnName.UPDATED_AT)
      .notNullable()
      .defaultTo(knex.fn.now());
  });
}

function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists(DatabaseTableName.LISTS);
}

export { down, up };
