import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { JWTInvalidSignatureException } from '@/exceptions/token.exception';

import { TokenInformationDto } from './token.dto';

@Injectable()
export class TokenService {
  COOKIE_DEFAULT_OPTIONS = {
    httpOnly: true,
  };

  ACCESS_TOKEN_CONFIG = {
    KEY: 'accessToken',
    SECRET: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    EXPIRE_TIME: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
  } as const;

  REFRESH_TOKEN_CONFIG = {
    KEY: 'refreshToken',
    SECRET: this.configService.get('JWT_REFRESH_TOKEN_SECRET'),
    EXPIRE_TIME: this.configService.get('JWT_REFRESH_TOKEN_EXPIRATION_TIME'),
  } as const;

  constructor(
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  encoding(contents: string) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(contents, salt);

    return hash;
  }

  isEquals(contents: string, hash: string) {
    return bcrypt.compareSync(contents, hash);
  }

  isExpire(exp: number) {
    const now = new Date().getTime();
    return +exp.toString().padEnd(now.toString().length, '0') < now;
  }

  accessTokenDecoding(accessToken: string) {
    try {
      const decoded = this.jwtService.verify<TokenInformationDto>(accessToken, {
        secret: this.ACCESS_TOKEN_CONFIG.SECRET,
      });

      return decoded;
    } catch (err) {
      throw new JWTInvalidSignatureException();
    }
  }

  refreshTokenDecoding(refreshToken: string) {
    try {
      const decoded = this.jwtService.verify<TokenInformationDto>(refreshToken, {
        secret: this.REFRESH_TOKEN_CONFIG.SECRET,
      });

      return decoded;
    } catch (err) {
      throw new JWTInvalidSignatureException();
    }
  }

  validateAccessToken(accessToken: string) {
    if (!accessToken) return false;

    const { exp } = this.accessTokenDecoding(accessToken);
    if (this.isExpire(exp)) return false;

    return true;
  }

  validateRefreshToken(refreshToken: string) {
    if (!refreshToken) return false;

    const { exp } = this.refreshTokenDecoding(refreshToken);
    if (this.isExpire(exp)) return false;

    return true;
  }

  addAccessToken(res: Response, value: object) {
    const jwtOption = { secret: this.ACCESS_TOKEN_CONFIG.SECRET, expiresIn: this.ACCESS_TOKEN_CONFIG.EXPIRE_TIME };
    const cookieOption = { ...this.COOKIE_DEFAULT_OPTIONS, maxAge: this.ACCESS_TOKEN_CONFIG.EXPIRE_TIME };

    const token = this.jwtService.sign(value, jwtOption);
    res.cookie(this.ACCESS_TOKEN_CONFIG.KEY, token, cookieOption);
  }

  addRefreshToken(res: Response, value: object) {
    const jwtOption = { secret: this.REFRESH_TOKEN_CONFIG.SECRET, expiresIn: this.REFRESH_TOKEN_CONFIG.EXPIRE_TIME };
    const cookieOption = { ...this.COOKIE_DEFAULT_OPTIONS, maxAge: this.REFRESH_TOKEN_CONFIG.EXPIRE_TIME };

    const token = this.jwtService.sign(value, jwtOption);
    res.cookie(this.REFRESH_TOKEN_CONFIG.KEY, token, cookieOption);
  }

  deleteAccessToken(res: Response) {
    res.cookie(this.ACCESS_TOKEN_CONFIG.KEY, '', { ...this.COOKIE_DEFAULT_OPTIONS, maxAge: 0 });
  }

  deleteRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN_CONFIG.KEY, '', { ...this.COOKIE_DEFAULT_OPTIONS, maxAge: 0 });
  }
}
