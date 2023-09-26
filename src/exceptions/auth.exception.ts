import { HttpStatus } from '@nestjs/common';

import { ERROR_CODES } from '@/constants/errorCodes';

import { BaseException } from './base.exception';

export class UnauthorizedRequestException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.UNAUTHORIZED_REQUEST, status: HttpStatus.UNAUTHORIZED });
  }
}
