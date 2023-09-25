// nest g s => 로 서비스 양식을 만들어준다!

import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/modules/user/user.entity';

import { Movie } from './movies.entity';

// const generateMovieId = (movies: Movie[]) => Math.max(...movies.map((movie) => movie.id), 0) + 1;

@Injectable()
export class MoviesService {
  constructor(@InjectRepository(Movie) private movieRepository: Repository<Movie>) {}
  //* 목업 데이터

  async getMovies() {
    const userMovie = await this.movieRepository
      .createQueryBuilder('movie')
      .innerJoinAndSelect(User, 'user', 'movie.email = user.email')
      .select(['movie.title as title', 'user.email as email', 'user.name as name'])
      .where('movie.email = :email', { email: 'test@test.com' })
      .getRawMany();

    if (userMovie.length === 0) throw new Error('일치하는 영화 데이터가 없습니다.');

    // const movies = await this.movieRepository.find();

    return userMovie;
  }

  // getMovie(movieId: number): Movie | undefined {
  //   const movie = this.movies.find((movie) => movie.id === movieId);
  //   if (!movie) throw new MovieGetFailedException();

  //   return movie;
  // }

  // addMovie(movieData: addMovieDto): Movie {
  //   const newMovie = { id: generateMovieId(this.movies), ...movieData };
  //   try {
  //     this.movies = [...this.movies, newMovie];
  //   } catch (err) {
  //     throw new MovieAddFailedException();
  //   }

  //   return newMovie;
  // }

  // updateMovie(movieId: number, movieData: UpdateMovieDto): Movie | undefined {
  //   let updatedMovie;
  //   this.movies = this.movies.map((movie) =>
  //     movie.id === movieId ? (updatedMovie = { ...movie, ...movieData }) : movie,
  //   );

  //   if (!updatedMovie) throw new MovieUpdateFailedException();

  //   return updatedMovie;
  // }

  // deleteMovie(movieId: number): Movie | undefined {
  //   let deletedMovie;
  //   this.movies = this.movies.filter((movie) => (movie.id === movieId ? (deletedMovie = movie) : false));

  //   if (!deletedMovie) throw new MovieDeleteFailedException();

  //   return deletedMovie;
  // }
}
