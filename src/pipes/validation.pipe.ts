import { ValidationPipe as NestValidationPipe, ValidationError, BadRequestException } from '@nestjs/common';

import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

export class ValidationPipe extends NestValidationPipe {
  public createExceptionFactory() {
    //* 예외처리 핸들러 반환값의 일관성을 위해 Bad Request만 처리하고 있습니다. 만약 다른 errorStatusCode를 사용하려면 관련된 소스코드를 수정해야합니다.
    return (validationErrors: ValidationError[] = []) => {
      if (this.isDetailedOutputDisabled) return new HttpErrorByCode[this.errorHttpStatusCode]();

      const errors = this.flattenValidationErrors(validationErrors);

      return new BadRequestException(errors[0]);
    };
  }
}
