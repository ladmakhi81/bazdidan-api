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
    const response = host.switchToHttp().getRequest() as Response;
    response.json({
      error: true,
      statusCode: exception.getStatus() || HttpStatus.INTERNAL_SERVER_ERROR,
      timestamp: new Date().toISOString(),
      message: exception.getResponse() ?? 'Internal Server Error',
    });
  }
}
