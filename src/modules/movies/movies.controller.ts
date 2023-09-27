import { Controller, Get, Param, Post, Body, Req, Put, Patch, Delete } from '@nestjs/common';

import { Request } from 'express';

import {
  ApiAddMovie,
  ApiDeleteMovie,
  ApiGetMovieById,
  ApiGetMovies,
  ApiMovieSetting,
  ApiUpdateMovie,
} from '@/decorators/swagger/movie.decorator';

import { MoviesService } from './movies.service';
import { UpdateMovieDto, AddMovieDto } from './movies.dto';

@Controller('movie')
@ApiMovieSetting()
export class MoviesController {
  constructor(private readonly movieService: MoviesService) {}

  @Get()
  @ApiGetMovies()
  async getMovies() {
    return await this.movieService.getMovies();
  }

  @Get(':id')
  @ApiGetMovieById()
  async getMovie(@Param('id') id: number) {
    return await this.movieService.getMovie(id);
  }

  @Post()
  @ApiAddMovie()
  async addMovie(@Req() req: Request, @Body() addMovieDto: AddMovieDto) {
    const { email } = req.decoded;

    return await this.movieService.addMovie(email, addMovieDto);
  }

  @Put(':id')
  @Patch(':id')
  @ApiUpdateMovie()
  async updateMovie(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto) {
    return await this.movieService.updateMovie(id, updateMovieDto);
  }

  @Delete(':id')
  @ApiDeleteMovie()
  async deleteMovie(@Param('id') id: number) {
    return await this.movieService.deleteMovie(id);
  }
}
