import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Response } from 'express';
import { map, Observable } from 'rxjs';

export class ApiResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const response = context.switchToHttp().getResponse() as Response;
    return next.handle().pipe(
      map((data) => ({
        error: false,
        data,
        message: null,
        timestamp: new Date().toISOString(),
        statusCode: response.statusCode,
      })),
    );
  }
}
