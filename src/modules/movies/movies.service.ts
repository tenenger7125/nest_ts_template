// nest g s => 로 서비스 양식을 만들어준다!

import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  MovieAddFailedException,
  MovieDeleteFailedException,
  MovieGetFailedException,
  MovieUpdateFailedException,
} from '@/exceptions/movie.exception';

import { UpdateMovieDto, AddMovieDto } from './movies.dto';
import { Movie } from './movies.entity';

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) {}

  async getMovies() {
    const movies = await this.movieRepository.find({ where: { email: 'test@test.com' }, relations: { user: true } });
    //^ 아래 주석 코드는 movies와 전혀 상관 없는 코드. 다만 entity 정보를 얻기 위한 코드이다.
    // const movies = await this.movieRepository.find({ where: { email: 'test@test.com' }, relations: { user: true } });
    // const test1 = await this.movieRepository
    //   .createQueryBuilder('movie')
    // .innerJoinAndSelect(User, 'user', 'user.email = movie.email')
    //   .innerJoin(User, 'user', 'movie.email = user.email')
    //   .select(['movie.id', 'user.email', 'user.name'])
    //   .getMany();
    // console.log(test1);
    return movies;
  }

  async getMovie(id: number) {
    const movie = await this.movieRepository.findOne({ where: { id } });
    if (!movie) throw new MovieGetFailedException();

    return movie;
  }

  async addMovie(email: string, addMovieDto: AddMovieDto) {
    try {
      const addedMovie = await this.movieRepository.save({ ...addMovieDto, email });

      return addedMovie;
    } catch (err) {
      throw new MovieAddFailedException();
    }
  }

  async updateMovie(id: number, updateMovieDto: UpdateMovieDto) {
    try {
      await this.movieRepository.update(id, updateMovieDto);
      const updatedMovie = await this.getMovie(id);

      return updatedMovie;
    } catch (err) {
      throw new MovieUpdateFailedException();
    }
  }

  async deleteMovie(id: number) {
    try {
      const deletedMovie = await this.getMovie(id);
      await this.movieRepository.delete(id);

      return deletedMovie;
    } catch (err) {
      throw new MovieDeleteFailedException();
    }
  }
}
