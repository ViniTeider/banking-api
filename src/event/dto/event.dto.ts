import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export enum EventType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class GenericEventDto {
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
