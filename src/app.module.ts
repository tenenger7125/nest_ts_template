import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { APP_GUARD } from '@nestjs/core';

import { AuthModule } from '@/modules/auth/auth.module';
import { DatabaseModule } from '@/modules/database/database.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';
import { AuthGuard } from '@/guards/auth.guard';

import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AuthGuard }],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
