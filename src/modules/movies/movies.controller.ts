import { Controller, Get } from '@nestjs/common';

import { MoviesService } from './movies.service';

@Controller('movie')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovies() {
    return await this.movieService.getMovies();
  }
}

// 컨트롤러, 모듈, 프로바이더 코드 예시를 보여줘서 코드 일관성을 유지할 수 있도록 하는게 가장 좋아보인다. 그래야 나중에 새로운 개발자가 추가되더라도 코드 일관성을 유지할 수 있을 거 같다.
// README.md에 작성? Or 인수인계 폴더 내부에 별도 파일?

//* 메서드 명명 컨벤션(prefix)
// @Get => get, fetch, retrieve
// @Post => add, create, insert
// @Put => set, replace
// @Update => update, modify
// @Delete => delete, remove

//* 메서드 예시
// 예시 : getMovie
// 예시 : getMovies

// 예시 : addMovie
// 예시 : addMovies

// 예시 : setMovie
// 예시 : updateMovie

// 예시 : deleteMovie
// 예시 : deleteMovies

//* 데코레이터
// @Param : url의 param 부분
// @Body : payload => front와 연관있음
// @Query : url의 querystring 부분
