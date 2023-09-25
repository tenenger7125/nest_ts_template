import { Controller, Get, Req } from '@nestjs/common';

import { LocalsRequest } from '@/interceptors/cookie.interceptor';

import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Req() req: LocalsRequest) {
    const { email } = req.decoded;

    return await this.userService.getUser(email);
  }
}
