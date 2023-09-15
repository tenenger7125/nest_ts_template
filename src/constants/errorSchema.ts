import { Injectable } from '@nestjs/common';

// DB가 가지고 있어서 무결성을 갖는게 좋아 보일듯?
// 일단 이걸 클래스로~
@Injectable()
export class ErrorSchema {
  EmailNotFound: {
    message: '이메일을 찾을 수 없습니다.';
    errorCode: 1;
  };
  NotAuthenticated: {
    message: '비인가된 사용자입니다.';
    errorCode: 2;
  };
  EmailExists: {
    message: '이메일이 존재합니다.';
    errorCode: 3;
  };
  JwtInvalidToken: {
    message: 'JWT 토큰이 유효합니다.';
    errorCode: 4;
  };
  JwtUserNotFound: {
    message: '유저의 JWT 토큰을 찾을 수 없습니다.';
    errorCode: 5;
  };
  JwtExpired: {
    message: 'JWT 토큰이 만료되었습니다.';
    errorCode: 6;
  };
  JwtInvalidSignature: {
    message: 'JWT 토큰의 서명이 불일치합니다.';
    errorCode: 7;
  };
  UserNotFound: {
    message: '유저를 찾을 수 없습니다.';
    errorCode: 8;
  };
}
