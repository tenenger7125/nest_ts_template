import { HttpStatus } from '@nestjs/common';

import { ERROR_CODES } from '@/constants/errorCodes';

import { BaseException } from './base.exception';

export class JWTInvalidSignatureException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.JWT_INVALID_SIGNATURE, status: HttpStatus.NOT_FOUND });
  }
}
