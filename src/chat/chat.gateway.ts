import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebsocketGuard } from 'src/auth/guards/websocket.guard';
import { ChatService } from './chat.service';
import { CreateMessageDTO, JoinRoomDTO, SeenMessageDTO } from './dtos';

@WebSocketGateway({ cors: { origin: '*' }, namespace: 'chat' })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() wsServer: Server;

  constructor(private readonly chatService: ChatService) {}

  handleConnection(client: Socket) {
    console.log(`${client.id} is connected`);
  }

  @SubscribeMessage('join_room')
  @UseGuards(WebsocketGuard)
  async joinRoom(
    @ConnectedSocket() client: Socket,
    @MessageBody() { roomName }: JoinRoomDTO,
  ) {
    const chat = await this.chatService.findChatByRoomName(roomName);
    const authUserId = client.authUser.id;
    const userUnableToJoinRoom =
      chat.firstUser.id !== authUserId && chat.secondUser.id !== authUserId;

    if (!chat || userUnableToJoinRoom) {
      client.emit('exception', { error: true, message: 'چت مجاز نیست' });
      return;
    }
    if (!client.rooms.has(roomName)) {
      client.join(roomName);
      this.wsServer
        .to(roomName)
        .emit('new_user_join', { roomName, user: client.authUser });
      return;
    }
  }

  @SubscribeMessage('send_message')
  @UseGuards(WebsocketGuard)
  async sendMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() dto: CreateMessageDTO,
  ) {
    const message = await this.chatService.createMessage(client.authUser, dto);
    const roomName = message.chat.roomName;
    this.wsServer.to(roomName).emit('new_message', { message });
  }

  @SubscribeMessage('seen_message')
  async seenMessage(@MessageBody() dto: SeenMessageDTO) {
    await this.chatService.seenMessage(dto.messageId);
    const chat = await this.chatService.findChatByRoomName(dto.roomName);
    this.wsServer
      .to(chat.roomName)
      .emit('message_seen_successfully', { messageId: dto.messageId });
  }

  handleDisconnect(client: Socket) {
    console.log(`${client.id} is disconnected`);
  }
}
