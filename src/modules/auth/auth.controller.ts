import { Controller, Post, Body, Res } from '@nestjs/common';

import { Response } from 'express';

import { Public } from '@/decorators/role.decorator';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  @Public()
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signIn(res, signInDto);
  }

  @Post('signup')
  @Public()
  async signUp(@Body() signUpDto: SignUpDto) {
    return await this.authService.signUp(signUpDto);
  }
}
