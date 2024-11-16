import { Module } from '@nestjs/common';
import { ClientRequestController } from './controllers/client-request.controller';
import { ClientRequestService } from './services/client-request.service';
import { TokenService } from '../base/services/token.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../base/services/user.service';

@Module({
  controllers: [ClientRequestController],
  providers: [ClientRequestService, TokenService, JwtService, UserService],
})
export class OperationalModule {}
