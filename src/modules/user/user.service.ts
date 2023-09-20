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
    return await this.userRepository.findOne({ where: { email } });
  }

  async getUsers() {
    const users = await this.userRepository.find();
    console.log('users: ', users);
    return users;
  }

  async addUser(addUserDto: AddUserDto) {
    const result = await this.userRepository.insert(addUserDto);
    return result;
  }
}
