import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';
import { DatabaseTableName } from '../common/database/enums/enums';
import { type Activity, type CreateActivityDto } from './dto/dto';

@Injectable()
export class ActivityService {
  constructor(@InjectConnection() private readonly knex: Knex) {}

  async findAll(): Promise<Activity[]> {
    return this.knex(DatabaseTableName.ACTIVITY)
      .orderBy('createdAt', 'desc')
      .select('*');
  }

  async findByCardId(id: string): Promise<Activity[]> {
    return this.knex(DatabaseTableName.ACTIVITY)
      .where('cardId', id)
      .orderBy('createdAt', 'desc')
      .returning('*');
  }

  async create(createActivity: CreateActivityDto): Promise<Activity[]> {
    return this.knex(DatabaseTableName.ACTIVITY)
      .insert(createActivity)
      .returning('*');
  }
}
