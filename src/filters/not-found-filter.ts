import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(NotFoundException)
export class NotFoundFilter implements ExceptionFilter {
  catch(_exception: NotFoundException, host: ArgumentsHost) {
    host.switchToHttp().getResponse<Response>().status(404).send(0);
  }
}
