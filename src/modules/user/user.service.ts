import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import {
  UserAddFailedException,
  UserDetailsGetFailedException,
  UsersGetFailedException,
} from '@/exceptions/user.exception';

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

    return user;
  }

  async getUserDetails(email: string) {
    const userDetails = await this.userRepository.findOne({ where: { email }, relations: { movies: true } });
    if (!userDetails) throw new UserDetailsGetFailedException();

    return userDetails;
  }

  async getUsers() {
    const users = await this.userRepository.find();
    if (users.length === 0) throw new UsersGetFailedException();

    return users;
  }

  async addUser(addUserDto: AddUserDto) {
    try {
      const test = await this.userRepository.insert(addUserDto);
      console.log(test);

      return addUserDto;
    } catch (err) {
      throw new UserAddFailedException();
    }
  }
}
