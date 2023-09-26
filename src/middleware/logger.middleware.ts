import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(req: Request, res: Response, next: NextFunction) {
    const {
      headers: { host, 'user-agent': userAgent },
      method,
      ip,
      cookies: _,
    } = req;
    const now = new Date();

    res.on('finish', () => {
      const { statusCode } = res;
      const { url } = req;
      const ellipses = new Date().getTime() - now.getTime();

      this.logger.log(`${method} ${host + url} ${statusCode} ${ip} ${userAgent}`);
      this.logger.log(`${ellipses}ms... 시간이 걸렸습니다!`);
    });

    next();
  }
}
