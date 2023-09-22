import { Module, Global } from '@nestjs/common';

import { TokenModule } from '@/modules/token/token.module';
import { UserModule } from '@/modules/user/user.module';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Global()
@Module({
  imports: [TokenModule, UserModule],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
