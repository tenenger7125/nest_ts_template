import { Controller, Get, UseGuards } from '@nestjs/common';

import { AuthGuard } from '@/guards/auth.guard';

import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getUser() {
    return await this.userService.getUser('test123@test.com');
  }
}
