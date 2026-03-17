import { Module } from '@nestjs/common';
import { AccountModule } from '../account/account.module';
import { EventController } from './event.controller';
import { EventService } from './event.service';

@Module({
  imports: [AccountModule],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
