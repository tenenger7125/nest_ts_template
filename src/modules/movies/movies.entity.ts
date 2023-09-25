import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  email: string;
}
