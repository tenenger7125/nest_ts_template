import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { User } from '../user/user.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { Movie } from './movies.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, User])],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
