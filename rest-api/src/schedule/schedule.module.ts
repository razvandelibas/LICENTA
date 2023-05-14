import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { ScheduleController } from './schedule.controller';
import { ScheduleService } from './schedule.service';

@Module({
  imports:[DatabaseModule],
  controllers: [ScheduleController],
  providers: [ScheduleService]
})
export class ScheduleModule {}
