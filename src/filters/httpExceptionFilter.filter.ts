import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();

    //* 예외가 발생하면, DB에 로그를 쌓고 싶다..!

    res.status(status).json({
      message: exception.message,
      error: exception.name,
      status,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
