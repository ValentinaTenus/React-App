import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { DatabaseTableName } from '../common/database/enums/enums';
import { CreateListDto, UpdateListDto } from './dto/dto';

@Injectable()
export class ListsService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<any[]> {
    try {
      const lists = await this.knex(DatabaseTableName.LISTS)
      .orderBy('createdAt', 'asc').select('*');

      for (const list of lists) {
        const cards = await this.knex(DatabaseTableName.CARDS).where(
          'listId',
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

  async findOne(id: string): Promise<any> {
    return this.knex(DatabaseTableName.LISTS).where({ id }).first();
  }

  async create(createListDto: CreateListDto): Promise<any> {
    return this.knex(DatabaseTableName.LISTS)
      .insert(createListDto)
      .returning('*');
  }

  async update(id: string, updateListDto: UpdateListDto): Promise<any> {
    return this.knex(DatabaseTableName.LISTS)
      .where({ id })
      .update(updateListDto)
      .returning('*');
  }

  async delete(id: string): Promise<any> {
    return this.knex(DatabaseTableName.LISTS)
      .where({ id })
      .del()
      .returning('*');
  }
}
