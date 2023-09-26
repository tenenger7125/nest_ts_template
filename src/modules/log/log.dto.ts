import { IsBoolean, IsDateString, IsString } from 'class-validator';

export class LogDto {
  @IsDateString()
  createAt: Date;

  @IsString()
  email: string;

  @IsString()
  ip: string;

  @IsString()
  method: string;

  @IsString()
  url: string;

  @IsString()
  requestHeader: string;

  @IsString()
  requestBody: string;

  @IsString()
  responseBody: string;

  @IsString()
  device: string;

  @IsString()
  browser: string;

  @IsString()
  os: string;

  @IsBoolean()
  isSuccess: boolean;

  @IsString()
  elapsedTime: number;

  @IsString()
  statusCode: number;

  @IsString()
  errorMessage: string;

  @IsString()
  note: string;
}
