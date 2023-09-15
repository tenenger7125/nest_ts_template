import { HttpStatus, HttpException } from '@nestjs/common';

import { ErrorSchema } from '@/constants/errorSchema';

export class ForbiddenException extends HttpException {
  constructor(errorCode: ErrorSchema) {
    super(errorCode, HttpStatus.FORBIDDEN);
  }
}
