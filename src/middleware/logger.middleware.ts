import { Injectable, Logger, NestMiddleware } from '@nestjs/common';

import { Response, NextFunction } from 'express';

import { LogService } from '@/modules/log/log.service';
import { LocalsRequest } from '@/interceptors/cookie.interceptor';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  constructor(private readonly logService: LogService) {}

  //! 지금은 에러를 미들웨어에서 못받는다.
  //^ 미들웨어에서는 console에 로그를 표현해주는 로직을 구현
  //^ 인터셉터에서는 db에 로그를 저장해주기 위한 로직을 구현(에러메시지까지 포함하려면 꼭 그래야만 한다.)

  use(req: LocalsRequest, res: Response, next: NextFunction) {
    const {
      headers: { host, 'user-agent': userAgent },
      method,
      ip,
    } = req;
    const now = new Date();
    const originSend = res.send;
    const { browser, isMobile, os } = req.useragent ?? { browser: 'unknown', isMobile: 'unknown', os: 'unknown' };
    const device = isMobile ? 'mobile' : isMobile === false ? 'pc' : 'unknown';

    let responseBody = '';
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
        responseBody,
        elapsedTime,
        isSuccess,
        errorMessage: '',
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
