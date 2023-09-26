import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';

import { User } from '../user/user.entity';

@Entity({ name: 'movies' })
export class Movie {
  @PrimaryColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  email: string;

  @ManyToOne(() => User, (user) => user.movies)
  @JoinColumn({ name: 'email' }) // movie 테이블에서 user 테이블과 연결될 컬럼 지정(자동으로 userEmail 컬럼 생성 => email 컬럼으로 강제 지정)
  user: User;
}
