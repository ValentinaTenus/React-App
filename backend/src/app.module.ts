import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KnexModule } from 'nest-knexjs';
import { CardsModule } from './cards/cards.module';
import { ListsModule } from './lists/lists.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRoot({
      config: {
        client: 'postgres',
        version: '15.2',
        useNullAsDefault: true,
        connection: {
          host: 'localhost',
          port: 9098,
          user: 'postgres',
          password: '1994',
          database: 'tasks',
        },
      },
    }),
    CardsModule,
    ListsModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
