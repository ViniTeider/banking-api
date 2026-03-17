import { Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('balance')
  getBalance(@Query('account_id') id: string): number {
    return this.accountService.getBalance(id).balance;
  }

  @Post('reset')
  @HttpCode(200)
  reset(): string {
    this.accountService.reset();
    return 'OK';
  }
}
