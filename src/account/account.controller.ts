import { Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('balance')
  getBalance(@Query('account_id') id: string): { balance: number } {
    return this.accountService.getBalance(id);
  }

  @Post('reset')
  @HttpCode(200)
  reset(): void {
    this.accountService.reset();
  }
}
