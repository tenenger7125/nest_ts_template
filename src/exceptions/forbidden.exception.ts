import { HttpStatus, HttpException } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(errorCode: string) {
    super(errorCode, HttpStatus.FORBIDDEN);
  }
}
