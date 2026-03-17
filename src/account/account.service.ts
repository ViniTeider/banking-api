import { Injectable } from '@nestjs/common';
import { AccountDto } from './dto/account.dto';
import { DomainBadRequestError } from '../domain/errors/domain-bad-request';
import { AccountNotFoundError } from '../domain/errors/account-not-found';

@Injectable()
export class AccountService {
  private accounts = new Map<string, AccountDto>();

  reset(): void {
    this.accounts = new Map();
  }

  getBalance(id: string): { balance: number } {
    const account = this.getAccountOrThrow(id);
    return { balance: account.balance };
  }

  deposit(id: string, amount: number): AccountDto {
    this.ensurePositiveAmount(amount);
    const account = this.accounts.get(id) ?? { id, balance: 0 };
    account.balance += amount;
    this.accounts.set(id, account);
    return { ...account };
  }

  withdraw(id: string, amount: number): AccountDto {
    this.ensurePositiveAmount(amount);
    const account = this.getAccountOrThrow(id);
    this.ensureSufficientBalance(account, amount);
    account.balance -= amount;
    this.accounts.set(id, account);
    return { ...account };
  }

  transfer(
    originId: string,
    destinationId: string,
    amount: number,
  ): { origin: AccountDto; destination: AccountDto } {
    this.ensurePositiveAmount(amount);
    if (originId === destinationId) {
      throw new DomainBadRequestError(
        'origin and destination must be different',
      );
    }

    const origin = this.withdraw(originId, amount);
    const destination = this.deposit(destinationId, amount);
    return { origin, destination };
  }

  private getAccountOrThrow(id: string): AccountDto {
    const account = this.accounts.get(id);
    if (!account) throw new AccountNotFoundError();
    return account;
  }

  private ensurePositiveAmount(amount: number): void {
    if (amount <= 0) {
      throw new DomainBadRequestError('amount must be greater than zero');
    }
  }

  private ensureSufficientBalance(account: AccountDto, amount: number): void {
    if (account.balance < amount) {
      throw new DomainBadRequestError('insufficient balance');
    }
  }
}
