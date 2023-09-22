import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request, Response } from 'express';
import { Observable } from 'rxjs';

import { AuthService } from '@/modules/auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const res = context.switchToHttp().getRequest<Response>();
    const req = context.switchToHttp().getRequest<Request>();
    const { accessToken = '', refreshToken = '' } = req.cookies;

    try {
      return this.authService.validate(res, { accessToken, refreshToken });
    } catch (err) {
      throw new Error(err.message);
    }
  }
}
