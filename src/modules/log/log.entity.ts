import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Log {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'create_at' })
  createAt: Date;

  @Column()
  email: string;

  @Column()
  ip: string;

  @Column()
  method: string;

  @Column()
  url: string;

  @Column({ name: 'request_header' })
  requestHeader: string;

  @Column({ name: 'request_body' })
  requestBody: string;

  @Column({ name: 'response_body' })
  responseBody: string;

  @Column()
  device: string;

  @Column()
  browser: string;

  @Column()
  os: string;

  @Column({ name: 'is_success' })
  isSuccess: boolean;

  @Column({ name: 'elapsed_time' })
  elapsedTime: number;

  @Column({ name: 'status_code' })
  statusCode: number;

  @Column({ name: 'note' })
  note: string;
}
