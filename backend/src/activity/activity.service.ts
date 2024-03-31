import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

import { DatabaseColumnName, DatabaseTableName } from '../common/database/enums/enums';
import { type Activity, type CreateActivityDto } from './types/types';
import { SortDirection } from 'src/common/enums/sort-direction.enum';

@Injectable()
export class ActivityService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<Activity[]> {
    return this.knex(DatabaseTableName.ACTIVITY)
      .orderBy(DatabaseColumnName.CREATED_AT, SortDirection.DESC)
      .select('*');
  }

  async findByCardId(id: string): Promise<Activity[]> {
    return this.knex(DatabaseTableName.ACTIVITY)
      .where(DatabaseColumnName.CARD_ID, id)
      .orderBy(DatabaseColumnName.CREATED_AT, SortDirection.DESC)
      .returning('*');
  }

  async create(createActivity: CreateActivityDto): Promise<Activity> {
    return this.knex(DatabaseTableName.ACTIVITY)
      .insert(createActivity)
      .returning('*')[0];
  }
}
