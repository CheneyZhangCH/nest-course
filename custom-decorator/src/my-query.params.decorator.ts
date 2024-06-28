import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express'

export const MyQueryParams = createParamDecorator(
    (key: string, ctx: ExecutionContext) => {
        const request = ctx.switchToHttp().getRequest<Request>()
        return request.query[key]
    }
)