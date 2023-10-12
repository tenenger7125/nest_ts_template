import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService, JwtVerifyOptions } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { JWTInvalidSignatureException } from '@/exceptions/token.exception';

import { TokenInformationDto } from './token.dto';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

type TokenType = typeof ACCESS_TOKEN | typeof REFRESH_TOKEN;

@Injectable()
export class TokenService {
  COOKIE_DEFAULT_OPTIONS = {
    httpOnly: true,
  };

  ACCESS_TOKEN_CONFIG = {
    KEY: ACCESS_TOKEN,
    SECRET: this.configService.get('JWT_ACCESS_TOKEN_SECRET'),
    EXPIRE_TIME: this.configService.get('JWT_ACCESS_TOKEN_EXPIRATION_TIME'),
  } as const;

  REFRESH_TOKEN_CONFIG = {
    KEY: REFRESH_TOKEN,
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
    const { jwtVerifyOptions } = this.getTokenOptions(ACCESS_TOKEN);

    return this.tokenDecoding(accessToken, jwtVerifyOptions);
  }

  refreshTokenDecoding(refreshToken: string) {
    const { jwtVerifyOptions } = this.getTokenOptions(REFRESH_TOKEN);

    return this.tokenDecoding(refreshToken, jwtVerifyOptions);
  }

  validateAccessToken(accessToken: string) {
    const { jwtVerifyOptions } = this.getTokenOptions(ACCESS_TOKEN);

    return this.validateToken(accessToken, jwtVerifyOptions);
  }

  validateRefreshToken(refreshToken: string) {
    const { jwtVerifyOptions } = this.getTokenOptions(REFRESH_TOKEN);

    return this.validateToken(refreshToken, jwtVerifyOptions);
  }

  addAccessToken(res: Response, value: object) {
    const { jwtVerifyOptions, cookieKey, cookieSetOption } = this.getTokenOptions(ACCESS_TOKEN);
    const token = this.jwtService.sign(value, jwtVerifyOptions);

    res.cookie(cookieKey, token, cookieSetOption);
  }

  addRefreshToken(res: Response, value: object) {
    const { jwtVerifyOptions, cookieKey, cookieSetOption } = this.getTokenOptions(REFRESH_TOKEN);
    const token = this.jwtService.sign(value, jwtVerifyOptions);

    res.cookie(cookieKey, token, cookieSetOption);
  }

  deleteAccessToken(res: Response) {
    const { cookieKey, cookieDeleteOption } = this.getTokenOptions(ACCESS_TOKEN);

    res.cookie(cookieKey, null, cookieDeleteOption);
  }

  deleteRefreshToken(res: Response) {
    const { cookieKey, cookieDeleteOption } = this.getTokenOptions(REFRESH_TOKEN);

    res.cookie(cookieKey, null, cookieDeleteOption);
  }

  private getTokenOptions(type: TokenType) {
    const cookieKey = type === ACCESS_TOKEN ? this.ACCESS_TOKEN_CONFIG.KEY : this.REFRESH_TOKEN_CONFIG.KEY;
    const jwtVerifyOptions =
      type === ACCESS_TOKEN
        ? { secret: this.ACCESS_TOKEN_CONFIG.SECRET, expiresIn: this.ACCESS_TOKEN_CONFIG.EXPIRE_TIME }
        : { secret: this.REFRESH_TOKEN_CONFIG.SECRET, expiresIn: this.REFRESH_TOKEN_CONFIG.EXPIRE_TIME };
    const cookieSetOption = {
      ...this.COOKIE_DEFAULT_OPTIONS,
      maxAge: type === ACCESS_TOKEN ? this.ACCESS_TOKEN_CONFIG.EXPIRE_TIME : this.REFRESH_TOKEN_CONFIG.EXPIRE_TIME,
    };
    const cookieDeleteOption = { ...this.COOKIE_DEFAULT_OPTIONS, maxAge: 0 };

    return {
      cookieKey,
      jwtVerifyOptions,
      cookieSetOption,
      cookieDeleteOption,
    };
  }

  private tokenDecoding(token: string, jwtVerifyOptions: JwtVerifyOptions) {
    try {
      const decoded = this.jwtService.verify<TokenInformationDto>(token, jwtVerifyOptions);

      return decoded;
    } catch (err) {
      throw new JWTInvalidSignatureException();
    }
  }

  private validateToken(token: string, jwtVerifyOptions: JwtVerifyOptions) {
    if (!token) return false;

    const { exp } = this.tokenDecoding(token, jwtVerifyOptions);
    if (this.isExpire(exp)) return false;

    return true;
  }
}
