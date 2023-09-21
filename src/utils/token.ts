//* createAuthToken 함수로 accessTokenSecret, refreshTokenSecret 값을 생성했습니다.
export const createAuthToken = (round: number) => {
  const allChar = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_-=+[]{}|;:,./<>?`~';

  return Array.from({ length: round }, () => allChar[Math.floor(Math.random() * allChar.length)]).join('');
};
