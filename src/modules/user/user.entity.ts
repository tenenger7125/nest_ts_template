import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryColumn()
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;
}
