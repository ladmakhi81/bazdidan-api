import { ApiProperty } from '@nestjs/swagger';
import { CreateClientRequestDTO } from '../request/create-client-request.dto';
import { Type } from 'class-transformer';
import { UserResponseDTO } from 'src/user/dtos';
import { AdvertisingHomeResponseDTO } from 'src/advertising-home/dtos';

export class ClientRequestDetailResponseDTO {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  searchOptions: CreateClientRequestDTO;

  @ApiProperty({ required: true })
  creator: UserResponseDTO;

  @ApiProperty({ required: true })
  createdAt: Date;

  @ApiProperty({
    required: true,
    isArray: true,
    type: () => AdvertisingHomeResponseDTO,
  })
  @Type(() => AdvertisingHomeResponseDTO)
  result: AdvertisingHomeResponseDTO[];
}
