import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Reflector } from '@nestjs/core';
import { Request } from 'express';
import { Observable } from 'rxjs';

import { AuthService } from '@/modules/auth/auth.service';

import { META_DATA_KEY } from '@/constants/metaDataKeys';

import { TokenInformationDto } from '../modules/token/token.dto';
export interface LocalsRequest extends Request {
  decoded: TokenInformationDto;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly authService: AuthService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<LocalsRequest>();
    const { accessToken = '', refreshToken = '' } = req.cookies;

    const role = this.reflector.get<string>(META_DATA_KEY.ROLE, context.getHandler());

    if (role?.includes('public')) return true;

    //^ 역할 별 guard 추가 예정!

    const isValid = this.authService.validate({ accessToken, refreshToken });
    if (!isValid) throw new Error('권한이 없는 요청입니다.'); //! exception 추가하기

    return true;
  }
}
