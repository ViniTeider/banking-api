import { Module } from '@nestjs/common';
import { AccountModule } from './account/account.module';
import { EventModule } from './event/event.module';

@Module({
  imports: [AccountModule, EventModule],
})
export class AppModule {}
