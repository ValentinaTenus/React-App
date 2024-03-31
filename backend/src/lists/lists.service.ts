import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

import { DatabaseTableName, DatabaseColumnName } from '../common/database/enums/enums';
import { SortDirection } from '../common/enums/enums';
import { type CreateListDto, type List, type UpdateListDto } from './types/types';

@Injectable()
export class ListsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<List[]> {
    try {
      const lists = await this.knex(DatabaseTableName.LISTS)
        .orderBy(DatabaseColumnName.CREATED_AT, SortDirection.ASC)
        .select('*');

      for (const list of lists) {
        const cards = await this.knex(DatabaseTableName.CARDS).where(
          DatabaseColumnName.LIST_ID,
          list.id,
        );
        list.cards = cards;
        list.cardsAmount = cards.length;
      }

      return lists;
    } catch (error) {
      console.error('Error fetching lists and cards:', error);
      throw error;
    }
  }

  async findOne(id: string): Promise<List> {
    return this.knex(DatabaseTableName.LISTS).where({ id }).first();
  }

  async create(createListDto: CreateListDto): Promise<List[]> {
    return this.knex(DatabaseTableName.LISTS)
      .insert(createListDto)
      .returning('*');
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<List[]> {
    return this.knex(DatabaseTableName.LISTS)
      .where({ id })
      .update(updateListDto)
      .returning('*');
  }

  async delete(id: string): Promise<List[]> {
    return this.knex(DatabaseTableName.LISTS)
      .where({ id })
      .del()
      .returning('*');
  }
}
