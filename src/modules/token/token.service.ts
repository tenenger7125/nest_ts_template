import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

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

  async validateSignature(token: string, res: Response, tokenType: 'access' | 'refresh') {
    const upperTokenType = tokenType.toUpperCase();

    try {
      const decoded = this.jwtService.verify<TokenInformationDto>(token, {
        secret: this.configService.get(`JWT_${upperTokenType}_TOKEN_SECRET`),
      });

      return decoded;
    } catch (err) {
      this.deleteAccessToken(res);
      this.deleteRefreshToken(res);

      throw new Error('인증된 서명이 아닙니다.');
    }
  }

  async validateAccessToken(res: Response, accessToken: string) {
    if (!accessToken) return false;

    const { exp } = await this.validateSignature(accessToken, res, 'access');
    if (this.isExpire(exp)) throw new Error('액세스 토큰이 만료되었습니다.');

    return true;
  }

  async validateRefreshToken(res: Response, refreshToken: string) {
    if (!refreshToken) throw new Error('리프레시 토큰이 없습니다.');

    const { email, exp } = await this.validateSignature(refreshToken, res, 'refresh');
    if (this.isExpire(exp)) throw new Error('리프레시 토큰이 만료되었습니다.');

    this.addAccessToken(res, { email });
    this.addRefreshToken(res, { email });

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
    res.cookie(this.ACCESS_TOKEN_CONFIG.KEY, '');
  }

  deleteRefreshToken(res: Response) {
    res.cookie(this.REFRESH_TOKEN_CONFIG.KEY, '');
  }
}
