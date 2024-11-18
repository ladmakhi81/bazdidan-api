import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateChatRoomDTO, CreateMessageDTO } from './dtos';
import { User } from '@prisma/client';
import { UserService } from 'src/user/user.service';
import { AdvertisingHomeService } from 'src/advertising-home/advertising-home.service';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class ChatService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly userService: UserService,
    private readonly advertisingHomeService: AdvertisingHomeService,
    private readonly i18n: I18nService,
  ) {}

  async getMessagesByAdvertisingHomeId(
    page: number,
    limit: number,
    advertisingHomeId: number,
  ) {
    const count = await this.prismaService.chatMessage.count({
      where: { chat: { advertisingHomeId } },
    });
    const content = await this.prismaService.chatMessage.findMany({
      where: { chat: { advertisingHomeId } },
      skip: page * limit,
      take: limit,
      include: { sender: true, receiver: true, repliedMessage: true },
    });
    return { content, count };
  }

  async createChatRoom(creator: User, dto: CreateChatRoomDTO) {
    const roomName = `room_${creator.id}_${dto.secondUserId}`;

    const room = await this.findChatByRoomName(roomName);

    if (room) {
      return room;
    }

    const secondUser = await this.userService.getUserProfileById(
      dto.secondUserId,
      false,
    );
    const advertisingHome =
      await this.advertisingHomeService.getAdvertisingHomeById(
        dto.advertisingHomeId,
        false,
      );

    return this.prismaService.chat.create({
      data: {
        roomName,
        firstUserId: creator.id,
        secondUserId: secondUser.id,
        advertisingHomeId: advertisingHome.id,
      },
      include: {
        firstUser: true,
        secondUser: true,
        advertisingHome: true,
      },
    });
  }

  async seenMessage(messageId: number) {
    const message = await this.findMessageById(messageId);
    await this.prismaService.chatMessage.update({
      where: { id: message.id },
      data: { seen: true },
    });
  }

  async createMessage(sender: User, dto: CreateMessageDTO) {
    const receiver = await this.userService.getUserProfileById(
      dto.receiverId,
      false,
    );
    if (dto.repliedMessageId) {
      const repliedMessage = await this.findMessageById(dto.repliedMessageId);
      dto.repliedMessageId = repliedMessage.id;
    }
    const chat = await this.findByChatId(dto.chatId);
    return this.prismaService.chatMessage.create({
      data: {
        content: dto.content,
        chatId: chat.id,
        receiverId: receiver.id,
        seen: false,
        repliedMessageId: dto.repliedMessageId,
        senderId: sender.id,
      },
      include: {
        chat: {
          include: { firstUser: true, secondUser: true, advertisingHome: true },
        },
        sender: true,
        receiver: true,
        repliedMessage: true,
      },
    });
  }

  findChatByRoomName(roomName: string) {
    return this.prismaService.chat.findFirst({
      where: { roomName },
      include: {
        firstUser: true,
        secondUser: true,
        advertisingHome: true,
      },
    });
  }

  async findByChatId(id: number) {
    const chat = await this.prismaService.chat.findUnique({ where: { id } });
    if (!chat) {
      throw new NotFoundException(
        this.i18n.t('messages.errors.chat.not_found'),
      );
    }
    return chat;
  }

  async findMessageById(id: number) {
    const message = await this.prismaService.chatMessage.findUnique({
      where: { id },
    });
    if (!message) {
      throw new NotFoundException(
        this.i18n.t('messages.errors.chat.not_found_message'),
      );
    }
    return message;
  }
}
