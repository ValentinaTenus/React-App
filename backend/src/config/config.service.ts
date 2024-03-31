import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ConfigKeys } from './enums/enums';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  getDatabaseConnectionString(): string {
    return this.configService.get<string>(ConfigKeys.DB_CONNECTION_STRING);
  }

  getPort(): number {
    return this.configService.get<number>(ConfigKeys.APP_PORT);
  }
}
