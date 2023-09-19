import { IsAlpha, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsAlpha()
  @MinLength(8)
  @MaxLength(16)
  password: string;
}
