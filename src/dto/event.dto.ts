import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsNumber, IsOptional, Min } from 'class-validator';

export enum EventType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class GenericEventDto {
  @IsEnum(EventType)
  type: EventType;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  destination?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  origin?: number;

  @Type(() => Number)
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  amount: number;
}
