import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

import { CardsService } from './cards.service';
import { CardsController } from './cards.controller';
import { ActivityService } from 'src/activity/activity.service';

@Module({
  imports: [KnexModule],
  providers: [CardsService, ActivityService],
  controllers: [CardsController],
})
export class CardsModule {}
