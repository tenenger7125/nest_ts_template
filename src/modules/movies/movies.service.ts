// nest g s => 로 서비스 양식을 만들어준다!

import { Injectable } from '@nestjs/common';

import { addMovieDto } from './movies.dto';
import { Movie } from './movies.entity';

const generateMovieId = (movies: Movie[]) => Math.max(...movies.map((movie) => movie.id), 0) + 1;

@Injectable()
export class MoviesService {
  private movies = [
    { id: 1, title: 'test1' },
    { id: 2, title: 'test2' },
    { id: 3, title: 'test3' },
  ];

  getMovies(): Movie[] {
    return this.movies;
  }

  getMovie(movieId: number): Movie | undefined {
    return this.movies.find((movie) => movie.id === movieId);
  }

  addMovie(movieData: addMovieDto): Movie {
    const newMovie = { id: generateMovieId(this.movies), ...movieData };

    this.movies = [...this.movies, newMovie];

    return newMovie;
  }

  updateMovie(movieId: number, movieData: Partial<Movie>): Movie | undefined {
    let updatedMovie; // 타입 생각

    this.movies = this.movies.map((movie) =>
      movie.id === movieId ? (updatedMovie = { ...movie, ...movieData }) : movie,
    );

    return updatedMovie;
  }

  deleteMovie(movieId: number): Movie | undefined {
    let deletedMovie;

    // id가 같으면 filter에서 true, id가 다르면 false
    this.movies = this.movies.filter((movie) => (movie.id === movieId ? (deletedMovie = movie) : false));

    return deletedMovie;
  }
}
