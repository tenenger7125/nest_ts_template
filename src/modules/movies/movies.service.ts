// nest g s => 로 서비스 양식을 만들어준다!

import { Injectable } from '@nestjs/common';

import {
  MovieGetFailedException,
  MovieAddFailedException,
  MovieUpdateFailedException,
  MovieDeleteFailedException,
} from '@/exceptions/movie.exception';

import { UpdateMovieDto, addMovieDto } from './movies.dto';
import { Movie } from './movies.entity';

const generateMovieId = (movies: Movie[]) => Math.max(...movies.map((movie) => movie.id), 0) + 1;

@Injectable()
export class MoviesService {
  //* 목업 데이터
  private movies = [
    { id: 1, title: 'test1' },
    { id: 2, title: 'test2' },
    { id: 3, title: 'test3' },
  ];

  getMovies(): Movie[] {
    const movies = this.movies;
    if (!movies) throw new MovieGetFailedException();

    return movies;
  }

  getMovie(movieId: number): Movie | undefined {
    const movie = this.movies.find((movie) => movie.id === movieId);
    if (!movie) throw new MovieGetFailedException();

    return movie;
  }

  addMovie(movieData: addMovieDto): Movie {
    const newMovie = { id: generateMovieId(this.movies), ...movieData };
    try {
      this.movies = [...this.movies, newMovie];
    } catch (err) {
      throw new MovieAddFailedException();
    }

    return newMovie;
  }

  updateMovie(movieId: number, movieData: UpdateMovieDto): Movie | undefined {
    let updatedMovie;
    this.movies = this.movies.map((movie) =>
      movie.id === movieId ? (updatedMovie = { ...movie, ...movieData }) : movie,
    );

    if (!updatedMovie) throw new MovieUpdateFailedException();

    return updatedMovie;
  }

  deleteMovie(movieId: number): Movie | undefined {
    let deletedMovie;
    this.movies = this.movies.filter((movie) => (movie.id === movieId ? (deletedMovie = movie) : false));

    if (!deletedMovie) throw new MovieDeleteFailedException();

    return deletedMovie;
  }
}
