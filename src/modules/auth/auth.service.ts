import { Injectable } from '@nestjs/common';

import { LoginDto } from './auth.dto';

@Injectable()
export class AuthService {
  login(loginDto: LoginDto) {
    //^ 아이디와 비밀번호가 db에 존재하는지 확인
    console.log(loginDto);
    // jwt 생성 후 header에 쿠키로 실어보냄
    return { success: true };
  }
}
