import { type Knex } from 'knex';

import {
  DatabaseColumnName,
  DatabaseTableName,
} from '../common/database/enums/enums';

const RelationRule = {
  CASCADE: 'CASCADE',
  SET_NULL: 'SET NULL',
};

async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  return knex.schema.createTable(DatabaseTableName.ACTIVITY, (table) => {
    table
      .uuid(DatabaseColumnName.ID)
      .unique()
      .primary()
      .defaultTo(knex.raw('uuid_generate_v4()'));
    table
      .uuid(DatabaseColumnName.CARD_ID)
      .references(DatabaseColumnName.ID)
      .inTable(DatabaseTableName.CARDS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
    table.string(DatabaseColumnName.CARD_NAME).notNullable();
    table.string(DatabaseColumnName.CHANGE_TYPE).notNullable();
    table.string(DatabaseColumnName.OLD_VALUE);
    table.string(DatabaseColumnName.NEW_VALUE);
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
  return knex.schema.dropTableIfExists(DatabaseTableName.ACTIVITY);
}

export { down, up };
