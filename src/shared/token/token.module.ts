import { Global, Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TokenService } from './token.service';

@Global()
@Module({
  providers: [JwtService, TokenService],
  exports: [JwtService, TokenService],
})
export class TokenModule {}
