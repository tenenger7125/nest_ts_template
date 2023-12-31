import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';

import { AuthModule } from '@/modules/auth/auth.module';
import { DatabaseModule } from '@/modules/database/database.module';
import { LogModule } from '@/modules/log/log.module';
import { MoviesModule } from '@/modules/movies/movies.module';
import { TokenModule } from '@/modules/token/token.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { AuthGuard } from '@/guards/auth.guard';
import { CookieInterceptor } from '@/interceptors/cookie.interceptor';

import { ConfigModule } from '@/config/config.module';

@Module({
  imports: [ConfigModule, DatabaseModule, AuthModule, TokenModule, MoviesModule, LogModule],
  providers: [
    { provide: APP_GUARD, useClass: AuthGuard },
    { provide: APP_INTERCEPTOR, useClass: CookieInterceptor },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
