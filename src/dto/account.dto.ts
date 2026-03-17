import { IsInt, Min, IsNumber } from 'class-validator';

export class AccountDto {
  @IsInt()
  @Min(0)
  id: number;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0)
  balance: number;
}
