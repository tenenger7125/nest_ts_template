import { Injectable } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { LogDto } from './log.dto';
import { Log } from './log.entity';

@Injectable()
export class LogService {
  constructor(@InjectRepository(Log) private readonly logRepository: Repository<Log>) {}

  async save(logDto: LogDto) {
    try {
      await this.logRepository.save(logDto);
    } catch (err) {
      throw new Error('로그 저장에 실패했습니다.'); //! exception 추가
    }
  }
}
