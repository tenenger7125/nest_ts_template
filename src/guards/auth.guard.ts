import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable } from 'rxjs';

import { AuthService } from '@/modules/auth/auth.service';

import { TokenInformationDto } from '../modules/token/token.dto';

export interface LocalsRequest extends Request {
  decoded: TokenInformationDto;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const res = context.switchToHttp().getRequest<Response>();
    const req = context.switchToHttp().getRequest<LocalsRequest>();
    const { accessToken = '', refreshToken = '' } = req.cookies;

    try {
      const decoded = this.authService.validate(res, { accessToken, refreshToken });
      req.decoded = decoded;

      return !!decoded;
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
