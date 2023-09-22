import { IsNumber, IsString } from 'class-validator';

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
