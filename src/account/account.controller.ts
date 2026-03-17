import { Controller, Get, ParseIntPipe, Query } from '@nestjs/common';
import { AccountService } from './account.service';

@Controller()
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @Get('balance')
  getBalance(@Query('account_id', ParseIntPipe) id: number): {
    balance: number;
  } {
    return this.accountService.getBalance(id);
  }
}
