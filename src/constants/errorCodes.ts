// DB가 가지고 있어서 무결성을 갖는게 좋아 보일듯?

export const ERROR_CODES = {
  EMAIL_NOT_FOUND: '이메일을 찾을 수 없습니다.',
  NOT_AUTHENTICATED: '비인가된 사용자입니다.',
  EMAIL_EXISTS: '이메일이 존재합니다.',
  JWT_INVALID_TOKEN: 'JWT 토큰이 유효합니다.',
  JWT_USER_NOT_FOUND: '유저의 JWT 토큰을 찾을 수 없습니다.',
  JWT_EXPIRED: 'JWT 토큰이 만료되었습니다.',
  JWT_INVALID_SIGNATURE: 'JWT 토큰의 서명이 불일치합니다.',
  USER_NOT_FOUND: '유저를 찾을 수 없습니다.',
} as const;
