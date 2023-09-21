import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

import { Request } from 'express';
import { Observable } from 'rxjs';

import { AuthService } from '@/modules/auth/auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();
    const { accessToken = '', refreshToken = '' } = req.cookies;

    return this.authService.authorization({ accessToken, refreshToken });
  }
}
