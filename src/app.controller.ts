import { Controller, Get } from '@nestjs/common';

@Controller('app')
export class AppController {
  @Get('method')
  method() {
    return { message: 'hello world' };
  }
}
