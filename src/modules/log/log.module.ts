import { Module, Global } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';

import { LogService } from './log.service';
import { Log } from './log.entity';

@Global()
@Module({
  imports: [TypeOrmModule.forFeature([Log])],
  providers: [LogService],
  exports: [LogService],
})
export class LogModule {}
