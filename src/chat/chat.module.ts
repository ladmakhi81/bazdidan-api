import { Module } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { AdvertisingHomeModule } from 'src/advertising-home/advertising-home.module';
import { UserModule } from 'src/user/user.module';
import { ChatGateway } from './chat.gateway';

@Module({
  imports: [AdvertisingHomeModule, UserModule],
  providers: [ChatService, ChatGateway],
  controllers: [ChatController],
})
export class ChatModule {}
