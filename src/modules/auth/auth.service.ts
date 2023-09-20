import { Injectable } from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { SignInDto, SignUpDto } from './auth.dto';

const encoding = async (contents: string) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(contents, salt);

  return hash;
};

const isDifferences = async (contents: string, hash: string) => bcrypt.compareSync(contents, hash);
@Injectable()
export class AuthService {
  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const dbPassword = await encoding(password);
    //^ db에서 email과 매칭되는 유저 가져오기(use typeorm)
    //~ 만약 매칭되는 유저가 없으면 에러 throw

    //^ signInDto의 password와, 유저의 암호화된 비밀번호를 복호화하여, 비교
    // const isDiff = isDifferences(password, dbPassword);
    //~ 만약 비밀번호가 다르면 에러 throw
    // if (isDiff) throw new Error('비밀번호가 다릅니다.'); //! exception에서 가져오기

    //^ jwt 생성(access_token, refresh_token)
    //~ jwt 생성 후 header에 쿠키 추가

    return { success: true };
  }
  async signUp(signUpDto: SignUpDto) {
    const { email, password, name } = signUpDto;
    //^ db에서 email과 매칭되는 유저 가져오기
    //~ 만약 매칭되는 유저가 있으면 에러 throw

    //^ password 암호화
    const decodingPassword = await encoding(password);

    //^ db에 email, password, name 저장
    console.log(decodingPassword);
    return { success: true };
  }
}
