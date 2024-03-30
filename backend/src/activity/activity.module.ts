import { Module } from '@nestjs/common';
import { KnexModule } from 'nest-knexjs';
import { ActivityController } from './activity.controller';
import { ActivityService } from './activity.service';

@Module({
  imports: [KnexModule],
  controllers: [ActivityController],
  providers: [ActivityService],
})
export class ActivityModule {}
