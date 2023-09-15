import { Module } from '@nestjs/common';

import { MoviesModule } from '@/modules/movies/movies.module';
import { MoviesService } from '@/modules/movies/movies.service';
import { AppController } from '@/controllers/app.controller';
import { AppService } from '@/services/app.service';

@Module({
  imports: [MoviesModule], // 사용할 모듈을 작성해준다.
  controllers: [AppController], // 사용할 컨트롤러를 작성해준다.
  providers: [AppService, MoviesService],
})
export class AppModule {}
