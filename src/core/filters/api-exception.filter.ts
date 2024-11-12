import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ApiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse() as Response;
    const exceptionResponse = exception?.getResponse() as Record<string, any>;
    const statusCode =
      exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(statusCode).json({
      error: true,
      statusCode,
      timestamp: new Date().toISOString(),
      message: exceptionResponse?.message ?? 'Internal Server Error',
    });
  }
}
