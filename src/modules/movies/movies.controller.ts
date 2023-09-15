// nest 입력하면, nest의 명령어를 보여준다.
// nest g co를 입력하면 controller 양식을 생성해준다. + app.modules에 있는 controllers의 배열에 자동으로 추가된다.

import {
  Controller,
  Param,
  Body,
  Get,
  Post,
  Delete,
  Put,
  Patch,
} from '@nestjs/common';
import { Movie } from './movies.entity';
import { MoviesService } from './movies.service';
import { addMovieDto } from './movies.dto';

@Controller('movies') // 전체 url의 entry point이다. 접근시 /movies로 시작해야한다.
export class MoviesController {
  // 만약 @Get('search')가 @Get(':id') 위치보다 밑에 있다면, nest는 id를 search로 판단하기 때문에 꼭 dynamic route가 있다면 꼭 인지하고 고려하자!
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  getMovies(): Movie[] {
    // DB 데이터를 그대로 넘겨준다고 생각하면 Movie[]를 entities에서 Movie 데이터 타입을 가져와야한다!
    return this.movieService.getMovies();
  }

  @Get(':id')
  getMovie(@Param('id') movieId: number) {
    console.log(typeof movieId);
    return this.movieService.getMovie(movieId);
  }
  // Param 전체를 가져올 수 있다. 위의 코드가 더 가독성이 좋은거 같다.
  // @Get('id')
  // getOne(@Param() params: { movieId: number }): string {
  //   return `This will return one movie with the id ${params.movieId}`;
  // }

  // @Post()
  // add() {
  //   return 'This will create a movie';
  // }

  @Post()
  addMovie(@Body() movieData: addMovieDto) {
    // Omit<Movie, 'id'> 이렇게 하는 것도 좋지만, dto라는 폴더에서 클라이언트가 전달해야할 데이터 타입을 지정해주도록 한다.
    return this.movieService.addMovie(movieData);
  }

  @Put(':id')
  @Patch(':id')
  updateMovie(@Param('id') movieId: number, @Body() movieData: Partial<Movie>) {
    // Partial<Movie> 이렇게 하는 것도 좋지만, dto라는 폴더에서 클라이언트가 전달해야할 데이터 타입을 지정해주도록 한다.
    return this.movieService.updateMovie(movieId, movieData);
  }

  @Delete(':id')
  deleteMovie(@Param('id') movieId: number) {
    return this.movieService.deleteMovie(movieId);
  }
}

// 컨트롤러, 모듈, 프로바이더 코드 예시를 보여줘서 코드 일관성을 유지할 수 있도록 하는게 가장 좋아보인다. 그래야 나중에 새로운 개발자가 추가되더라도 코드 일관성을 유지할 수 있을 거 같다.
// README.md에 작성? Or 인수인계 폴더 내부에 별도 파일?

// 메서드 명명 컨벤션(prefix)
// @Get => get, fetch, retrieve
// @Post => add, create, insert
// @Put => set, replace
// @Update => update, modify
// @Delete => delete, remove

// 메서드 예시
// 예시 : getMovie
// 예시 : getMovies

// 예시 : addMovie
// 예시 : addMovies

// 예시 : setMovie
// 예시 : updateMovie

// 예시 : deleteMovie
// 예시 : deleteMovies

// 데코레이터
// @Param : url의 param 부분
// @Body : payload => front와 연관있음
// @Query : url의 querystring 부분
