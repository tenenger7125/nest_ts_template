import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { UserService } from '@/modules/user/user.service';

import { SignInDto, SignUpDto } from './auth.dto';

const encoding = (contents: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(contents, salt);

  return hash;
};

const isEquals = (contents: string, hash: string) => bcrypt.compareSync(contents, hash);

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    //^ db에서 email과 매칭되는 유저 가져오기(use typeorm)
    const user = await this.userService.getUser(email);
    //~ 만약 매칭되는 유저가 없으면 에러 throw
    if (!user) throw new Error('등록되지 않은 사용자입니다.');

    //^ signInDto의 password와, 유저의 암호화된 비밀번호를 복호화하여, 비교
    const isEqual = isEquals(password, encoding(password));
    //~ 만약 비밀번호가 다르면 에러 throw
    if (!isEqual) throw new Error('비밀번호가 다릅니다.'); //! exception에서 가져오기

    //^ jwt 생성(access_token, refresh_token)
    //~ jwt 생성 후 header에 쿠키 추가

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
}
