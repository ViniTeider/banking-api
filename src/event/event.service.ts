import { BadRequestException, Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { EventType, GenericEventDto } from './dto/event.dto';

@Injectable()
export class EventService {
  constructor(private readonly accountService: AccountService) {}

  processEvent(event: GenericEventDto) {
    switch (event.type) {
      case EventType.DEPOSIT: {
        return this.handleDeposit(event);
      }

      case EventType.WITHDRAW: {
        return this.handleWithdraw(event);
      }

      case EventType.TRANSFER: {
        return this.handleTransfer(event);
      }

      default:
        throw new BadRequestException('invalid event type');
    }
  }

  private handleDeposit(event: GenericEventDto) {
    if (event.destination === undefined) {
      throw new BadRequestException('destination is required for deposit');
    }

    const destination = this.accountService.deposit(
      event.destination,
      event.amount,
    );
    return { destination };
  }

  private handleWithdraw(event: GenericEventDto) {
    if (event.origin === undefined) {
      throw new BadRequestException('origin is required for withdraw');
    }

    const origin = this.accountService.withdraw(event.origin, event.amount);
    return { origin };
  }

  private handleTransfer(event: GenericEventDto) {
    if (event.origin === undefined || event.destination === undefined) {
      throw new BadRequestException(
        'origin and destination are required for transfer',
      );
    }

    const result = this.accountService.transfer(
      event.origin,
      event.destination,
      event.amount,
    );

    return result;
  }
}
