import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { AaaException } from './aaa.exception';
import { Request, Response } from 'express';

@Catch(AaaException)
export class AaaFilter<T> implements ExceptionFilter {
  catch(exception: AaaException, host: ArgumentsHost) {
    console.log(exception)
    console.log(host)
    if (host.getType() === 'http') {
      const ctx = host.switchToHttp()
      const request = ctx.getRequest<Request>()
      const response = ctx.getResponse<Response>()
      response.status(500).json({
        aaa: exception.aaa,
        bbb: exception.bbb,
      })
    }
  }
}
