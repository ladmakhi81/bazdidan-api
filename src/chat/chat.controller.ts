import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { ChatService } from './chat.service';
import { Authentication } from 'src/shared/decorators/auth.decorator';
import {
  ChatResponseDTO,
  CreateChatRoomDTO,
  CreateMessageDTO,
  MessageResponseDTO,
} from './dtos';
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ApiResponseDTO } from 'src/shared/dtos/api-response.dto';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { PaginationQuery } from 'src/shared/types/pagination.type';
import { PaginationResponseDTO } from 'src/shared/dtos/pagination-response.dto';

@Controller('chat')
@ApiTags('Chats')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('/start-conversation')
  @Authentication()
  @ApiExtraModels(ApiResponseDTO, ChatResponseDTO)
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Conversation Chat Created Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ChatResponseDTO),
            },
          },
        },
      ],
    },
  })
  startConversationBasedOnAdvertisingHome(
    @Body() dto: CreateChatRoomDTO,
    @Req() { user }: Express.Request,
  ) {
    return this.chatService.createChatRoom(user, dto);
  }

  @Post('/send-message')
  @Authentication()
  @HttpCode(HttpStatus.CREATED)
  @ApiExtraModels(ApiResponseDTO, MessageResponseDTO)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Message Send Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(MessageResponseDTO),
            },
          },
        },
      ],
    },
  })
  sendMessage(@Body() dto: CreateMessageDTO, @Req() { user }: Express.Request) {
    return this.chatService.createMessage(user, dto);
  }

  @Get('/messages/:advertisingHomeId')
  @HttpCode(HttpStatus.OK)
  @Authentication()
  @ApiExtraModels(ApiResponseDTO, PaginationResponseDTO, MessageResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'The List Of Messages Based On Advertising Home Id',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              allOf: [
                {
                  $ref: getSchemaPath(PaginationResponseDTO),
                },
                {
                  properties: {
                    content: {
                      type: 'array',
                      items: { $ref: getSchemaPath(MessageResponseDTO) },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
  })
  getMessagesByAdvertisingHomeId(
    @Param('advertisingHomeId') advertisingHomeId: number,
    @Pagination() { limit, page }: PaginationQuery,
  ) {
    return this.chatService.getMessagesByAdvertisingHomeId(
      page,
      limit,
      advertisingHomeId,
    );
  }
}
