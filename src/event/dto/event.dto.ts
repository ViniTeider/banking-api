export enum EventType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class GenericEventDto {
  type: EventType;
  destination?: string;
  amount: number;
  origin?: string;
}
