import { NestFactory } from '@nestjs/core';
import * as cookieParser from 'cookie-parser';
import * as useragent from 'express-useragent';

import { ValidationPipe } from '@/pipes/validation.pipe';
import { HttpExceptionFilter } from '@/filters/httpExceptionFilter.filter';

import { setupSwagger } from './config/swagger';
import { AppModule } from './app.module';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  setupSwagger(app);

  app.use(cookieParser());
  app.use(useragent.express());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      stopAtFirstError: true,
    }),
  );

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
};

bootstrap();
