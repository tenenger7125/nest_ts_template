import { IsEmail, IsNotEmpty, IsNumber, IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class SignInDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(16)
  password: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/[ㄱ-힣]{2,}/)
  name: string;
}

export class TokenDto {
  @IsString()
  accessToken: string;

  @IsString()
  refreshToken: string;
}

export class TokenInformationDto {
  @IsString()
  email: string;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
