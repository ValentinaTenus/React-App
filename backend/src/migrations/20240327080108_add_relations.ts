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
  await knex.schema.alterTable(DatabaseTableName.CARDS, (table) => {
    table
      .uuid(DatabaseColumnName.LIST_ID)
      .references(DatabaseColumnName.ID)
      .inTable(DatabaseTableName.LISTS)
      .onUpdate(RelationRule.CASCADE)
      .onDelete(RelationRule.SET_NULL);
  });
}

async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable(DatabaseTableName.CARDS, (table) => {
    table.dropColumn(DatabaseColumnName.LIST_ID);
  });
}

export { down, up };
