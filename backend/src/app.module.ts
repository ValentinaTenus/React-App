import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KnexModule } from 'nest-knexjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CardsModule } from './cards/cards.module';
import { ConfigKeys } from './config/enums/enums';
import { ListsModule } from './lists/lists.module';
import { ActivityModule } from './activity/activity.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    KnexModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        config: {
          client: configService.get<string>(ConfigKeys.DB_CLIENT),
          version: ConfigKeys.POSTRGRES_VERSION,
          useNullAsDefault: true,
          connection: {
            host: configService.get<string>(ConfigKeys.DB_HOST),
            port: configService.get<number>(ConfigKeys.DB_PORT),
            user: configService.get<string>(ConfigKeys.DB_USER),
            password: configService.get<string>(ConfigKeys.DB_PASSWORD),
            database: configService.get<string>(ConfigKeys.DB_DATABASE),
          },
        },
      }),
    }),
    CardsModule,
    ListsModule,
    ActivityModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
