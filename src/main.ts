import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe()); // dto 유효성 검사를 위해, 유효성 검사 파이프 연결
  await app.listen(3000);
}
bootstrap();
