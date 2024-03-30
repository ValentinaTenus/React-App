import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';

import { ListsController } from './lists.controller';
import { ListsService } from './lists.service';

@Module({
  imports: [KnexModule],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
