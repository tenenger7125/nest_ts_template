import { Controller, Get } from '@nestjs/common';

import { MoviesService } from './movies.service';

@Controller('movie')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  async getMovies() {
    return await this.movieService.getMovies();
  }

  // @Get(':id')
  // getMovie(@Param('id') movieId: number) {
  //   return this.movieService.getMovie(movieId);
  // }

  // @Post()
  // addMovie(@Body() movieData: addMovieDto) {
  //   return this.movieService.addMovie(movieData);
  // }

  // @Put(':id')
  // @Patch(':id')
  // updateMovie(@Param('id') movieId: number, @Body() movieData: UpdateMovieDto) {
  //   return this.movieService.updateMovie(movieId, movieData);
  // }

  // @Delete(':id')
  // deleteMovie(@Param('id') movieId: number) {
  //   return this.movieService.deleteMovie(movieId);
  // }
}
