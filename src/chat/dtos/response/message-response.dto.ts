import { ApiProperty } from '@nestjs/swagger';
import { ChatResponseDTO } from './chat-response.dto';
import { UserResponseDTO } from 'src/user/dtos';
import { AdvertisingHomeResponseDTO } from 'src/advertising-home/dtos';

export class MessageResponseDTO {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  content: string;

  @ApiProperty({ required: true })
  chat: ChatResponseDTO;

  @ApiProperty({ required: true })
  seen: boolean;

  @ApiProperty({ required: false })
  repliedMessage: MessageResponseDTO;

  @ApiProperty({ required: true })
  receiver: UserResponseDTO;

  @ApiProperty({ required: true })
  sender: UserResponseDTO;

  @ApiProperty({ required: true })
  advertisingHome: AdvertisingHomeResponseDTO;

  @ApiProperty({ required: true })
  createdAt: Date;
}
