import { Module } from '@nestjs/common';
import { ClientRequestController } from './client-request.controller';
import { ClientRequestService } from './client-request.service';
import { UserModule } from 'src/user/user.module';
import { ClientRequestResultService } from './client-request-result.service';
import { SseModule } from 'src/shared/sse/sse.module';

@Module({
  imports: [UserModule, SseModule],
  controllers: [ClientRequestController],
  providers: [ClientRequestService, ClientRequestResultService],
})
export class ClientRequestModule {}
