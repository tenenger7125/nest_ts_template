import { PartialType } from '@nestjs/mapped-types';
import { IsString } from 'class-validator';

export class addMovieDto {
  @IsString()
  title: string;
}

export class UpdateMovieDto extends PartialType(addMovieDto) {}
