import { HttpException } from '@nestjs/common';

export class BaseException extends HttpException {
  constructor(args: { message: string; status: number }) {
    super(args, args.status);
  }
}
