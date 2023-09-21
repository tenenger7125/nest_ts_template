import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { User } from '@/modules/user/user.entity';

@Injectable()
export class DatabaseService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get('DB_HOST'),
      port: this.configService.get('DB_PORT'),
      username: this.configService.get('DB_USERNAME'),
      password: this.configService.get('DB_PASSWORD'),
      database: this.configService.get('DB_DATABASE'),
      entities: [User],
      synchronize: this.configService.get('DB_SYNCHRONIZE'), // dev: true / prod: false
      retryAttempts: 3,
      logging: this.configService.get('DB_LOGGING'), // dev: true / prod: false
    };
  }
}
