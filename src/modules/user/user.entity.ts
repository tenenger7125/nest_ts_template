import { Entity, PrimaryColumn, Column, OneToMany, JoinColumn } from 'typeorm';

import { Movie } from '../movies/movies.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @OneToMany(() => Movie, (movie) => movie.user)
  movies: Movie[];
}
