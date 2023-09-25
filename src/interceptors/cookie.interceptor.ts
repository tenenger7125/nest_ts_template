/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Response, Request } from 'express';
import { Observable } from 'rxjs';

import { TokenInformationDto } from '@/modules/token/token.dto';
import { TokenService } from '@/modules/token/token.service';

import { META_DATA_KEY } from '@/constants/metaDataKeys';

export interface LocalsRequest extends Request {
  decoded: TokenInformationDto;
}

@Injectable()
export class CookieInterceptor implements NestInterceptor {
  constructor(
    private readonly tokenService: TokenService,
    private readonly reflector: Reflector,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const res = context.switchToHttp().getResponse<Response>();
    const req = context.switchToHttp().getRequest<LocalsRequest>();
    const { accessToken = '', refreshToken = '' } = req.cookies;

    const role = this.reflector.get<string>(META_DATA_KEY.ROLE, context.getHandler());

    if (role?.includes('public')) return next.handle();

    const decoded = accessToken
      ? this.tokenService.accessTokenDecoding(accessToken)
      : this.tokenService.refreshTokenDecoding(refreshToken);

    const value = Object.fromEntries(Object.entries(decoded).filter(([key]) => !['exp', 'iat'].includes(key)));

    this.tokenService.addAccessToken(res, value);
    this.tokenService.addRefreshToken(res, value);

    // this.myService를 사용하여 로직을 처리할 수 있음
    req.decoded = decoded;
    return next.handle();
  }
}
