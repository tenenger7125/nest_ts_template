import { Controller, Get, Param, Post, Body, Req, Put, Patch, Delete } from '@nestjs/common';

import { ApiTags, ApiCookieAuth } from '@nestjs/swagger';

import { LocalsRequest } from '@/interceptors/cookie.interceptor';

import { ApiAddMovie, ApiGetMovieById, ApiGetMovies } from '@/decorators/swagger/movie.decorator';

import { MoviesService } from './movies.service';
import { UpdateMovieDto, AddMovieDto } from './movies.dto';

@Controller('movie')
@ApiTags('영화 API (로그인 필수)')
@ApiCookieAuth('accessToken')
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  @ApiGetMovies()
  async getMovies() {
    return await this.movieService.getMovies();
  }

  @Get(':id')
  @ApiGetMovieById()
  getMovie(@Param('id') id: number) {
    return this.movieService.getMovie(id);
  }

  @Post()
  @ApiAddMovie()
  async addMovie(@Req() req: LocalsRequest, @Body() addMovieDto: AddMovieDto) {
    const { email } = req.decoded;

    return await this.movieService.addMovie(email, addMovieDto);
  }

  @Put(':id')
  @Patch(':id')
  async updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return await this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  async deleteMovie(@Param('id') id: number) {
    return await this.movieService.deleteMovie(id);
  }
}
