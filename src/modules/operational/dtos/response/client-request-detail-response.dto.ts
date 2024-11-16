import { ApiProperty } from '@nestjs/swagger';
import { CreateClientRequestDTO } from '../request/create-client-request.dto';
import { UserResponseDTO } from 'src/modules/base/dtos/user';
import { AdvertisingHomeResponseDTO } from 'src/modules/base/dtos/advertising-home';
import { Type } from 'class-transformer';

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
