// class-validator를 통해 타입 유효성 검사를 할 수 있다.
// 해당 라이브러리에서 제공되는 데코레이터를 사용하면 가독성이 좋아질듯?
/**
 * 예시
 * @IsNotEmpty()
 * @IsString()
 * @IsEmail()
 * email: string
 */

// 유효성 검사를 위해 유효성 검사용 pipe를 연결해줘야한다.

import { IsString } from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';

export class addMovieDto {
  @IsString()
  title: string;
}

// nestjs의 mapped-types가 클래스의 필드값을 partialType으로 해준다! => 편리~
export class UpdateMovieDto extends PartialType(addMovieDto) {}
