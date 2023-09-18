import { HttpStatus } from '@nestjs/common';

import { ERROR_CODES } from '@/constants/errorCodes';

import { BaseException } from './base.exception';

const { FAILED_TO_GET_MOVIE, FAILED_TO_ADD_MOVIE, FAILED_TO_UPDATE_MOVIE, FAILED_TO_DELETE_MOVIE } = ERROR_CODES;

export class MovieGetFailedException extends BaseException {
  constructor() {
    super({ message: FAILED_TO_GET_MOVIE, status: HttpStatus.NOT_FOUND });
  }
}

export class MovieAddFailedException extends BaseException {
  constructor() {
    super({ message: FAILED_TO_ADD_MOVIE, status: HttpStatus.NOT_FOUND });
  }
}

export class MovieUpdateFailedException extends BaseException {
  constructor() {
    super({ message: FAILED_TO_UPDATE_MOVIE, status: HttpStatus.NOT_FOUND });
  }
}

export class MovieDeleteFailedException extends BaseException {
  constructor() {
    super({ message: FAILED_TO_DELETE_MOVIE, status: HttpStatus.NOT_FOUND });
  }
}
