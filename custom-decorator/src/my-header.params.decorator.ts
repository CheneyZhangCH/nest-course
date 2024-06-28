import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express'

export const MyHeaderParams = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>()
        return key ? request.headers[key.toLocaleLowerCase()] : request.header;
    }
)