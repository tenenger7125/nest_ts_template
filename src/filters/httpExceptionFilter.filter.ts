import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException) // HttpException는 예외가 발생했을 때만 찾고 있음을 nest에게 알린다.
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();
    const req = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const { message } = exception;

    // +예외가 발생하면, DB에 로그를 쌓고 싶다..!

    res.status(status).json({
      message,
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: req.url,
    });
  }
}
