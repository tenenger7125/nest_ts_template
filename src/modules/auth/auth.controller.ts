import { Controller, Post, Body, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { AuthGuard } from '@/guards/auth.guard';

import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto, @Res({ passthrough: true }) res: Response) {
    return await this.authService.signIn(signInDto, res);
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authService.signUp(signUpDto);
  }
}
