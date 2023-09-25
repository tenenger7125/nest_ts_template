import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { AddUserDto } from './user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getUser(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) throw new Error('일치하는 유저가 없습니다.');

    return user;
  }

  async getUsers() {
    return await this.userRepository.find();
  }

  async addUser(addUserDto: AddUserDto) {
    return await this.userRepository.insert(addUserDto);
  }
}
