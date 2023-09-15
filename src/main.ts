import { ValidationPipe } from '@nestjs/common';

import { NestFactory } from '@nestjs/core';

import { HttpExceptionFilter } from '@/filters/httpExceptionFilter.filter';

import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
};

bootstrap();
