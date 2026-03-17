import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from '../account/account.service';
import { EventType } from './dto/event.dto';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EventService, AccountService],
    }).compile();

    service = module.get<EventService>(EventService);
  });

  it('should process deposit', () => {
    const result = service.processEvent({
      type: EventType.DEPOSIT,
      destination: 100,
      amount: 20,
    });

    expect(result).toEqual({ destination: { id: 100, balance: 20 } });
  });

  it('should create account on deposit if it doesnt exists', () => {
    const result = service.processEvent({
      type: EventType.DEPOSIT,
      destination: 999,
      amount: 50,
    });

    expect(result).toEqual({ destination: { id: 999, balance: 50 } });
  });

  it('should process withdraw', () => {
    service.processEvent({
      type: EventType.DEPOSIT,
      destination: 100,
      amount: 30,
    });

    const result = service.processEvent({
      type: EventType.WITHDRAW,
      origin: 100,
      amount: 10,
    });

    expect(result).toEqual({ origin: { id: 100, balance: 20 } });
  });

  it('should check if account doesnt exists on withdraw', () => {
    expect(() =>
      service.processEvent({
        type: EventType.WITHDRAW,
        origin: 999,
        amount: 10,
      }),
    ).toThrow('account not found');
  });

  it('should check if account has sufficient balance on withdraw', () => {
    service.processEvent({
      type: EventType.DEPOSIT,
      destination: 100,
      amount: 30,
    });

    expect(() =>
      service.processEvent({
        type: EventType.WITHDRAW,
        origin: 100,
        amount: 50,
      }),
    ).toThrow('insufficient balance');
  });

  it('should process transfer', () => {
    service.processEvent({
      type: EventType.DEPOSIT,
      destination: 100,
      amount: 40,
    });

    const result = service.processEvent({
      type: EventType.TRANSFER,
      origin: 100,
      destination: 200,
      amount: 15,
    });

    expect(result).toEqual({
      origin: { id: 100, balance: 25 },
      destination: { id: 200, balance: 15 },
    });
  });

  it('should check if accounts exists on transfer', () => {
    expect(() =>
      service.processEvent({
        type: EventType.TRANSFER,
        origin: 999,
        destination: 200,
        amount: 10,
      }),
    ).toThrow('account not found');
  });

  it('should check if origin account has sufficient balance on transfer', () => {
    service.processEvent({
      type: EventType.DEPOSIT,
      destination: 100,
      amount: 20,
    });

    expect(() =>
      service.processEvent({
        type: EventType.TRANSFER,
        origin: 100,
        destination: 200,
        amount: 50,
      }),
    ).toThrow('insufficient balance');
  });
});
