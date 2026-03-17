export class AccountNotFoundError extends Error {
  constructor() {
    super('account not found');
    this.name = 'AccountNotFoundError';
  }
}
