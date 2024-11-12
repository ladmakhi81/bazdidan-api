import { Module } from '@nestjs/common';
import { ClientRequestController } from './controllers/client-request.controller';
import { ClientRequestService } from './services/client-request.service';

@Module({
  controllers: [ClientRequestController],
  providers: [ClientRequestService],
})
export class OperationalModule {}
