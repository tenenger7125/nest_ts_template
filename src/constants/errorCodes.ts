export const ERROR_CODES = {
  VALIDATE_FAILED: 'validate failed',
  NOT_AUTHENTICATED: 'unauthenticated user',
  EMAIL_EXISTS: 'already email existed',
  JWT_INVALID_TOKEN: 'jwt token is invalid',
  JWT_USER_NOT_FOUND: 'jwt token not found',
  JWT_EXPIRED: 'jwt token expired',
  JWT_INVALID_SIGNATURE: 'jwt signature is invalid',
  USER_NOT_FOUND: 'user is not signed',
  FAILED_TO_GET_MOVIE: 'failed to get movie',
  FAILED_TO_ADD_MOVIE: 'failed to add movie',
  FAILED_TO_UPDATE_MOVIE: 'failed to update movie',
  FAILED_TO_DELETE_MOVIE: 'failed to delete movie',
} as const;
