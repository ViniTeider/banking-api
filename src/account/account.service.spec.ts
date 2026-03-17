import { Test, TestingModule } from '@nestjs/testing';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let service: AccountService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AccountService],
    }).compile();

    service = module.get<AccountService>(AccountService);
  });

  it('should return existing account balance', () => {
    expect(service.getBalance(100)).toEqual({ balance: 0 });
  });

  it('should deposit and update balance', () => {
    service.deposit(100, 50);
    expect(service.getBalance(100)).toEqual({ balance: 50 });
  });

  it('should throw when withdrawing more than balance', () => {
    expect(() => service.withdraw(100, 10)).toThrow('insufficient balance');
  });
});
