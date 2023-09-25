// nest g s => 로 서비스 양식을 만들어준다!

import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '../user/user.entity';
import { Movie } from './movies.entity';

// const generateMovieId = (movies: Movie[]) => Math.max(...movies.map((movie) => movie.id), 0) + 1;

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) {}

  async getMovies() {
    const movies = await this.movieRepository.find({ where: { email: 'test@test.com' } });
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
}
