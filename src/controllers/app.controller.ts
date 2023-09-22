import { Controller, Get, Param } from '@nestjs/common';

import { AppService } from '@/services/app.service';

@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('docs')
  getDocs(@Param('version') version: number) {
    if (version === 5)
      return {
        url: 'https://docs.nestjs.com/v5/',
        statusCode: 301,
      };
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('hi/world')
  getHi(): string {
    return this.appService.getHi();
  }
}
