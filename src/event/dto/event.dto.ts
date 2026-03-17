import { IsEnum, IsNumber, IsOptional, IsString, Min } from 'class-validator';

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
  @Min(0)
  amount: number;
}
