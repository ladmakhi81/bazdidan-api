import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const Pagination = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest() as Request;
    const { limit = 10, page = 0 } = request.query;
    return {
      limit: Number(limit),
      page: Number(page),
    };
  },
);
