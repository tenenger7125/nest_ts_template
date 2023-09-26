import { Controller, Get, Req } from '@nestjs/common';

import { LocalsRequest } from '@/interceptors/cookie.interceptor';

import { UserGetFailedException } from '../../exceptions/user.exception';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Req() req: LocalsRequest) {
    const { email } = req.decoded;
    const user = await this.userService.getUser(email);
    if (!user) throw new UserGetFailedException();

    const { password: _, ...rest } = user;

    return rest;
  }

  @Get('details')
  async getUserDetails(@Req() req: LocalsRequest) {
    const { email } = req.decoded;
    const { password: _, ...rest } = await this.userService.getUserDetails(email);

    return rest;
  }

  @Get('all')
  async getUsers() {
    const users = await this.userService.getUsers();

    return users.map(({ password: _, ...rest }) => rest);
  }
}
