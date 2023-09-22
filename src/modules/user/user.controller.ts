import { Controller, Get, UseGuards, Req } from '@nestjs/common';

import { AuthGuard, LocalsRequest } from '@/guards/auth.guard';

import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser(@Req() req: LocalsRequest) {
    // decoded를 여기서 받아야한다...!
    const { email } = req.decoded;

    return await this.userService.getUser(email);
  }
}
