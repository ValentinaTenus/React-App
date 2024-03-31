import { Injectable } from '@nestjs/common';
import { InjectConnection } from 'nest-knexjs';
import { Knex } from 'knex';

import { ActivityService } from '../activity/activity.service';
import { DatabaseColumnName, DatabaseTableName } from '../common/database/enums/enums';
import { ActivityChangeTypes, SortDirection } from '../common/enums/enums';
import { type Card, type CreateCardDto, type UpdateCardDto } from './types/types';

@Injectable()
export class CardsService {
  constructor(
    @InjectConnection() private readonly knex: Knex,
    private readonly activityService: ActivityService,
  ) {}

  async findAll(): Promise<Card[]> {
    return this.knex(DatabaseTableName.CARDS)
      .orderBy(DatabaseColumnName.CREATED_AT, SortDirection.ASC)
      .select('*');
  }

  async findOne(id: string): Promise<Card> {
    return this.knex(DatabaseTableName.CARDS).where({ id }).first();
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const newCard = (await this.knex(DatabaseTableName.CARDS)
      .insert(createCardDto)
      .returning('*')) as Card[];

    const newActivityEntry = {
      cardId: newCard[0].id,
      cardName: newCard[0].name,
      changeType: ActivityChangeTypes.CREATED,
      oldValue: null,
      newValue: newCard[0].name,
    };
    await this.activityService.create(newActivityEntry);

    return newCard[0];
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const cardToUpdate: Card = await this.findOne(id);
    const parsedDueDate = updateCardDto.dueDate &&  new Date(updateCardDto.dueDate);
    const updatedCard = (await this.knex(DatabaseTableName.CARDS)
      .where({ id })
      .update({...updateCardDto, dueDate: parsedDueDate})
      .returning('*')) as Card[];
    const activityEntries = [];

    if (updatedCard[0].description !== cardToUpdate.description) {
      activityEntries.push({
        cardId: cardToUpdate.id,
        cardName: cardToUpdate.name,
        changeType: cardToUpdate.description
          ? ActivityChangeTypes.CHANGED_DESCRIPTION
          : ActivityChangeTypes.ADD_DESCRIPTION,
        oldValue: cardToUpdate.description,
        newValue: updatedCard[0].description,
      });
    }

    if (updatedCard[0].name !== cardToUpdate.name) {
      activityEntries.push({
        cardId: id,
        cardName: cardToUpdate.name,
        changeType: cardToUpdate.name && ActivityChangeTypes.RENAMED,
        oldValue: cardToUpdate.name,
        newValue: updatedCard[0].name,
      });
    }

    if ( updateCardDto.dueDate &&
      new Date(cardToUpdate.dueDate).getTime() !==
      parsedDueDate.getTime()
    ) {
      activityEntries.push({
        cardId: id,
        cardName: cardToUpdate.name,
        changeType: cardToUpdate.dueDate
          ? ActivityChangeTypes.CHANGED_DUE_DATE
          : ActivityChangeTypes.ADDED_DUE_DATE,
        oldValue: cardToUpdate.dueDate,
        newValue: updatedCard[0].dueDate,
      });
    }

    if (updatedCard[0].priority.toString() !== cardToUpdate.priority) {
      activityEntries.push({
        cardId: id,
        cardName: cardToUpdate.name,
        changeType: cardToUpdate.priority
          ? ActivityChangeTypes.CHANGED_PRIORITY
          : ActivityChangeTypes.ADDED_PRIORITY,
        oldValue: cardToUpdate.priority,
        newValue: updatedCard[0].priority,
      });
    }

    if (updatedCard[0].status !== cardToUpdate.status) {
      activityEntries.push({
        cardId: id,
        cardName: cardToUpdate.name,
        changeType: ActivityChangeTypes.MOVED,
        oldValue: cardToUpdate.status,
        newValue: updatedCard[0].status,
      });
    }

    await Promise.all(
      activityEntries.map((entry) => this.activityService.create(entry)),
    );

    return updatedCard[0];
  }

  async delete(id: string): Promise<Card> {
    const cardToDelete = await this.findOne(id);
    const newActivityEntry = {
      cardId: id,
      cardName: cardToDelete.name,
      changeType: ActivityChangeTypes.DELETED,
      oldValue: cardToDelete.name,
      newValue: null,
    };
    await this.activityService.create(newActivityEntry);

    const deletedCard = await this.knex(DatabaseTableName.CARDS)
      .where({ id })
      .del()
      .returning('*');

    return deletedCard[0];
  }
}
