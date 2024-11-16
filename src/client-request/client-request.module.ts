import { Module } from '@nestjs/common';
import { ClientRequestController } from './client-request.controller';
import { ClientRequestService } from './client-request.service';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [UserModule],
  controllers: [ClientRequestController],
  providers: [ClientRequestService],
})
export class ClientRequestModule {}
