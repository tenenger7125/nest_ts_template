import { Module } from '@nestjs/common';

import { ConfigModule as NestConfigModule } from '@nestjs/config';

@Module({
  imports: [
    NestConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      envFilePath: `.env.${process.env.NODE_ENV}`, // npm run start:dev => .env.dev 파일 load / npm run start:prod => .env.prod 파일 load
    }),
  ],
})
export class ConfigModule {}
