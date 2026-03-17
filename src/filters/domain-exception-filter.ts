import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { Response } from 'express';
import { AccountNotFoundError } from '../domain/errors/account-not-found';
import { DomainBadRequestError } from '../domain/errors/domain-bad-request';

@Catch(AccountNotFoundError, DomainBadRequestError)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(
    exception: AccountNotFoundError | DomainBadRequestError,
    host: ArgumentsHost,
  ) {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof AccountNotFoundError) {
      response.status(404).send(0);
      return;
    }

    response.status(400).json({ message: exception.message });
  }
}
