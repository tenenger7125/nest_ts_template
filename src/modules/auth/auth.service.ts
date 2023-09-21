import { Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Response } from 'express';

import { UserService } from '@/modules/user/user.service';

import { SignInDto, SignUpDto, TokenDto, TokenInformationDto } from './auth.dto';

const encoding = (contents: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(contents, salt);

  return hash;
};

const isEquals = (contents: string, hash: string) => bcrypt.compareSync(contents, hash);

const isExpire = (exp: number) => {
  const now = new Date().getTime();
  return +exp.toString().padEnd(now.toString().length, '0') < now;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async signIn(signInDto: SignInDto, res: Response) {
    const { email, password } = signInDto;
    //^ db에서 email과 매칭되는 유저 가져오기(use typeorm)
    const user = await this.userService.getUser(email);
    //~ 만약 매칭되는 유저가 없으면 에러 throw
    if (!user) throw new Error('등록되지 않은 사용자입니다.'); //! exception에서 가져오기

    //^ signInDto의 password와, 유저의 암호화된 비밀번호를 복호화하여, 비교
    const isEqual = isEquals(password, user.password);
    //~ 만약 비밀번호가 다르면 에러 throw
    if (!isEqual) throw new Error('비밀번호가 다릅니다.'); //! exception에서 가져오기

    //^ jwt 생성(access_token, refresh_token) + header에 쿠키 추가
    this.setToken(email, res, 'access');
    this.setToken(email, res, 'refresh');

    return { success: true };
  }

  async signUp(signUpDto: SignUpDto) {
    const { email, password } = signUpDto;
    //^ db에서 email과 매칭되는 유저 가져오기
    const user = await this.userService.getUser(email);
    //~ 만약 매칭되는 유저가 있으면 에러 throw
    if (user) throw new Error('이미 존재하는 이메일입니다.'); //! exception에서 가져오기

    //^ password 암호화
    //^ db에 email, password, name 저장
    const newUser = { ...signUpDto, password: encoding(password) };
    await this.userService.addUser(newUser);

    return newUser;
  }

  async authorization(tokenDto: TokenDto) {
    const { accessToken, refreshToken } = tokenDto;

    const isValidateAccessToken = await this.validateAccessToken(accessToken);

    if (isValidateAccessToken) {
      //^ 1-2-2. access_token 로그인 + refresh_token 발급 => return true
      return true;
    }

    //^ 2. cookie에 refresh_token 확인
    //^ 2-1. refresh_token 만료 확인
    //^ 2-2. refresh_token 디코딩
    //^ 2-2-1. refresh_token 인증된 서명인지 확인
    //^ 2-2-2. refresh_token 재발급 + access_token 발급 => return true

    //* 쿠키에 있는 jwt (access_token)을 디코딩하는 데코레이터가 필요할듯?

    return true;
  }

  setToken(email: string, res: Response, tokenType: 'access' | 'refresh') {
    const upperTokenType = tokenType.toUpperCase();
    const [secret, expiresTime] = [
      this.configService.get(`JWT_${upperTokenType}_TOKEN_SECRET`),
      this.configService.get(`JWT_${upperTokenType}_TOKEN_EXPIRATION_TIME`),
    ];
    const token = this.jwtService.sign({ email }, { secret, expiresIn: expiresTime });

    res.cookie(`${tokenType}Token`, token, { maxAge: expiresTime, httpOnly: true });
  }

  async validateAccessToken(accessToken: string) {
    //^ 1-2. access_token 디코딩
    //^ 1-2-1. access_token 인증된 서명인지 확인
    //~ 서명이 잘못된 토큰이라면 jwtService에서 throw 해준다.
    const { email, exp } = this.jwtService.verify<TokenInformationDto>(accessToken, {
      secret: this.configService.get(`JWT_ACCESS_TOKEN_SECRET`),
    });

    //^ 1-1. access_token 만료 확인
    if (isExpire(exp)) throw new Error('토큰이 만료되었습니다.'); //! exception에서 가져오기

    //^ 1. cookie에 access_token 확인(email 확인)
    //^ db에서 email과 매칭되는 유저 가져오기(use typeorm)
    const user = await this.userService.getUser(email);
    //~ 만약 매칭되는 유저가 없으면 에러 throw
    if (!user) throw new Error('등록되지 않은 사용자입니다.'); //! exception에서 가져오기

    return true;
  }
}
