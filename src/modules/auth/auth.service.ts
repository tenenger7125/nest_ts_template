import { Injectable } from '@nestjs/common';

import { Response } from 'express';

import { TokenService } from '@/modules/token/token.service';
import { UserService } from '@/modules/user/user.service';

import { SignInDto, SignUpDto, TokenDto } from './auth.dto';

@Injectable()
export class AuthService {
  ACCESS_TOKEN = 'accessToken';
  REFRESH_TOKEN = 'refreshToken';

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signIn(res: Response, signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.getUser(email);
    if (!user) throw new Error('등록되지 않은 사용자입니다.');

    const isEqual = this.tokenService.isEquals(password, user.password);
    if (!isEqual) throw new Error('비밀번호가 다릅니다.');

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...userInfo } = user;

    this.tokenService.addAccessToken(res, userInfo);
    this.tokenService.addRefreshToken(res, userInfo);

    return userInfo;
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const user = await this.userService.getUser(email);
    if (user) throw new Error('이미 존재하는 이메일입니다.');

    const newUser = { ...signUpDto, password: this.tokenService.encoding(password) };
    await this.userService.addUser(newUser);

    return newUser;
  }

  validate(res: Response, { accessToken, refreshToken }: TokenDto) {
    return (
      this.tokenService.validateAccessToken(res, accessToken) ||
      this.tokenService.validateRefreshToken(res, refreshToken)
    );
  }
}
