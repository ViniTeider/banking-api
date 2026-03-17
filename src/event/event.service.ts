import { Injectable } from '@nestjs/common';
import { AccountService } from '../account/account.service';
import { EventType, CreateEventDTO } from './dto/event.dto';
import { DomainBadRequestError } from '../domain/errors/domain-bad-request';

@Injectable()
export class EventService {
  constructor(private readonly accountService: AccountService) {}

  processEvent(event: CreateEventDTO) {
    switch (event.type) {
      case EventType.DEPOSIT:
        return this.handleDeposit(event);
      case EventType.WITHDRAW:
        return this.handleWithdraw(event);
      case EventType.TRANSFER:
        return this.handleTransfer(event);
      default:
        throw new DomainBadRequestError('invalid event type');
    }
  }

  private handleDeposit(event: CreateEventDTO) {
    if (event.destination === undefined) {
      throw new DomainBadRequestError('destination is required for deposit');
    }

    const destination = this.accountService.deposit(
      event.destination,
      event.amount,
    );
    return { destination };
  }

  private handleWithdraw(event: CreateEventDTO) {
    if (event.origin === undefined) {
      throw new DomainBadRequestError('origin is required for withdraw');
    }

    const origin = this.accountService.withdraw(event.origin, event.amount);
    return { origin };
  }

  private handleTransfer(event: CreateEventDTO) {
    if (event.origin === undefined || event.destination === undefined) {
      throw new DomainBadRequestError(
        'origin and destination are required for transfer',
      );
    }

    return this.accountService.transfer(
      event.origin,
      event.destination,
      event.amount,
    );
  }
}
