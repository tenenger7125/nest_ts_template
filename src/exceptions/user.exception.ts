import { HttpStatus } from '@nestjs/common';

import { ERROR_CODES } from '@/constants/errorCodes';

import { BaseException } from './base.exception';

export class UserGetFailedException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.FAILED_TO_GET_USER, status: HttpStatus.NOT_FOUND });
  }
}

export class UserDetailsGetFailedException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.FAILED_TO_GET_USER_DETAILS, status: HttpStatus.NOT_FOUND });
  }
}

export class UsersGetFailedException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.FAILED_TO_GET_USERS, status: HttpStatus.NOT_FOUND });
  }
}

export class UserAddFailedException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.FAILED_TO_ADD_USER, status: HttpStatus.CREATED });
  }
}

export class UserUpdateFailedException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.FAILED_TO_UPDATE_USER, status: HttpStatus.NOT_MODIFIED });
  }
}

export class UserDeleteFailedException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.FAILED_TO_DELETE_USER, status: HttpStatus.BAD_REQUEST });
  }
}

export class PasswordMatchFailedException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.FAILED_TO_MATCH_CHECK_PASSWORD, status: HttpStatus.BAD_REQUEST });
  }
}

export class DuplicatedUserFoundException extends BaseException {
  constructor() {
    super({ message: ERROR_CODES.DUPLICATED_USER_FOUND, status: HttpStatus.BAD_REQUEST });
  }
}
