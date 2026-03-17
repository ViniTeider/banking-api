import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';

export enum EventType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class CreateEventDTO {
  @IsEnum(EventType)
  type: EventType;

  @IsOptional()
  @IsString()
  destination?: string;

  @IsOptional()
  @IsString()
  origin?: string;

  @IsNumber()
  @IsPositive()
  amount: number;
}
