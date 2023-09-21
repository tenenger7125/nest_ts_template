import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])], // db의 레포지토리를 불러오는 동작
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
