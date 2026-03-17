export enum EventType {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw',
  TRANSFER = 'transfer',
}

export class GenericEventDto {
  type: EventType;
  destination?: number;
  amount: number;
  origin?: number;
}
