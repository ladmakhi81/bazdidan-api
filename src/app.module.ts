import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AdvertisingHomeModule } from './advertising-home/advertising-home.module';
import { ClientRequestModule } from './client-request/client-request.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './shared/token/token.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { SseModule } from './shared/sse/sse.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    AdvertisingHomeModule,
    ClientRequestModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TokenModule,
    EventEmitterModule.forRoot(),
    SseModule,
    ChatModule,
  ],
})
export class AppModule {}
