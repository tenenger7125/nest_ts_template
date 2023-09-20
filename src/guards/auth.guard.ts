import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const access_token = req.cookies?.access_token ?? '';

    return this.authorization(access_token);
  }

  private authorization(accessToken: string) {
    console.log('authorization accessToken: ', accessToken);
    //^ 1. cookie에 access_token 확인(email 확인)
    //^ 1-1. access_token 만료 확인
    //^ 1-2. access_token 디코딩
    //^ 1-2-1. access_token 인증된 서명인지 확인
    //^ 1-2-2. access_token 로그인 + refresh_token 발급 => return true

    //^ 2. cookie에 refresh_token 확인
    //^ 2-1. refresh_token 만료 확인
    //^ 2-2. refresh_token 디코딩
    //^ 2-2-1. refresh_token 인증된 서명인지 확인
    //^ 2-2-2. refresh_token 재발급 + access_token 발급 => return true

    //* 쿠키에 있는 jwt (access_token)을 디코딩하는 데코레이터가 필요할듯?

    return true;
  }
}
