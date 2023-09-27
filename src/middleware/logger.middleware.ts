import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Response, NextFunction } from 'express';

import { LogService } from '@/modules/log/log.service';
import { LocalsRequest } from '@/interceptors/cookie.interceptor';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  constructor(private readonly logService: LogService) {}

  use(req: LocalsRequest, res: Response, next: NextFunction) {
    const {
      headers: { host, 'user-agent': userAgent },
      method,
      ip,
    } = req;
    const now = new Date();
    const { browser, isMobile, os } = req.useragent ?? { browser: 'unknown', isMobile: 'unknown', os: 'unknown' };
    const device = isMobile ? 'mobile' : isMobile === false ? 'pc' : 'unknown';
    const originSend = res.send;

    let responseBody: { [index: string]: unknown };
    res.send = function (body: any) {
      responseBody = body;
      return originSend.call(this, body);
    };

    res.on('finish', async () => {
      const { statusCode } = res;
      const { decoded, path, headers, body: requestBody } = req;
      const url = host + path;
      const createAt = new Date();
      const elapsedTime = createAt.getTime() - now.getTime();
      const isSuccess = statusCode >= 200 && statusCode < 300;
      const { email } = decoded ?? { email: 'unknown' };

      await this.logService.save({
        email,
        createAt,
        ip,
        method,
        url,
        requestHeader: JSON.stringify(headers),
        requestBody,
        statusCode,
        responseBody: JSON.stringify(responseBody),
        elapsedTime,
        isSuccess,
        device,
        browser,
        os,
        note: '',
      });

      this.logger.log(`${method} ${url} ${statusCode} ${ip} ${userAgent}`);
      this.logger.log(`${elapsedTime}ms 이 걸렸습니다!`);
    });

    next();
  }
}
