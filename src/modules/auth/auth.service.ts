import { Injectable } from '@nestjs/common';

import { Response } from 'express';

import { TokenService } from '@/modules/token/token.service';
import { UserService } from '@/modules/user/user.service';

import {
  DuplicatedUserFoundException,
  PasswordMatchFailedException,
  UserGetFailedException,
} from '@/exceptions/user.exception';

import { SignInDto, SignUpDto, TokenDto } from './auth.dto';

@Injectable()
export class AuthService {
  ACCESS_TOKEN = 'accessToken';
  REFRESH_TOKEN = 'refreshToken';

  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  validate({ accessToken, refreshToken }: TokenDto) {
    return this.tokenService.validateAccessToken(accessToken) || this.tokenService.validateRefreshToken(refreshToken);
  }

  async signIn(res: Response, signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.userService.getUser(email);
    if (!user) throw new UserGetFailedException();

    const { password: encodedPassword, ...rest } = user;
    const isEqual = this.tokenService.isEquals(password, encodedPassword);
    if (!isEqual) throw new PasswordMatchFailedException();

    this.tokenService.addAccessToken(res, rest);
    this.tokenService.addRefreshToken(res, rest);

    return rest;
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;

    const user = await this.userService.getUser(email);
    if (user) throw new DuplicatedUserFoundException();

    const newUser = { ...signUpDto, password: this.tokenService.encoding(password) };
    await this.userService.addUser(newUser);

    return newUser;
  }
}
