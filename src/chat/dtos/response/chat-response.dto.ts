import { ApiProperty } from '@nestjs/swagger';
import { AdvertisingHomeResponseDTO } from 'src/advertising-home/dtos';
import { UserResponseDTO } from 'src/user/dtos';

export class ChatResponseDTO {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  roomName: string;

  @ApiProperty({ required: true })
  firstUser: UserResponseDTO;

  @ApiProperty({ required: true })
  secondUser: UserResponseDTO;

  @ApiProperty({ required: true })
  advertisingHome: AdvertisingHomeResponseDTO;
}
