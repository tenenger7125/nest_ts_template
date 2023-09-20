import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';

import { AuthModule } from '@/modules/auth/auth.module';
import { MoviesModule } from '@/modules/movies/movies.module';
import { LoggerMiddleware } from '@/middleware/logger.middleware';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';

@Module({
  imports: [AuthModule, MoviesModule], // 사용할 모듈을 작성해준다.
  controllers: [AppController], // 사용할 컨트롤러를 작성해준다.
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
    // consumer.apply(LoggerMiddleware).forRoutes('*'); 전체 log를 찍고 싶을때 와일드카드를 사용한다.
    // consumer.apply(LoggerMiddleware).forRoutes('*'); 만약, 특정 route와 method일 때만 미들웨어를 동작하고 싶다면 {path: 'string', method: RequestMethod.GET}을 사용하자!
    // consumer.apply(LoggerMiddleware).forRoutes('*'); 단알 문자열, 다중 문자열, RouteInfo 객체, Controller 클래스 및 여러 클래스를 넣어서 동작하도록 할 수 있다.
    // exclude()를 체이닝메서드로 forRoutes 앞에 연결하여, 특정 경로에는 동작하지 않도록 할 수 있다.
    // 만약 여러개의 미들웨어를 넣고 싶다면, 쉼표로 구분하여 apply 인수로 여러개를 넣으면 된다.
    // 만약 전역으로 미들웨어를 넣고 싶다면, main.ts의 app.use(middle)를 넣어서 한번만 바인딩할 수 있따. 이떄 미들웨어는 함수로 작성해야하며, 클래스를 주입할 수 없어 외부 프로바이더를 사용할 수 없다는 단점이 있다.
  }
}
