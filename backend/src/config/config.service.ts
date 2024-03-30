import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class MyService {
  constructor(private configService: ConfigService) {}

  getDatabaseConnectionString(): string {
    return this.configService.get<string>('DB.CONNECTION_STRING');
  }

  getPort(): number {
    return this.configService.get<number>('APP.PORT');
  }
}
