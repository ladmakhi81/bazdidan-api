import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateClientRequestEvent } from './events';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CREATE_CLIENT_REQUEST_EVENT_KEY } from './event-keys.constant';
import { SseService } from 'src/shared/sse/sse.service';

@Injectable()
export class ClientRequestResultService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly sseService: SseService,
  ) {}

  @OnEvent(CREATE_CLIENT_REQUEST_EVENT_KEY)
  async createClientRequestResult({
    advertisingHomeId,
    requestId,
  }: CreateClientRequestEvent) {
    const result = await this.prismaService.clientRequestResult.create({
      data: {
        requestId,
        advertisingHomeId,
      },
      include: {
        advertisingHome: true,
        request: { include: { creator: true } },
      },
    });

    this.sseService.sendEvent(result);
  }
}
