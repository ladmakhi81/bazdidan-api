import { ApiProperty } from '@nestjs/swagger';
import { UserResponseDTO } from 'src/modules/base/dtos/user';
import { CreateClientRequestDTO } from '../request/create-client-request.dto';

export class ClientRequestResponseDTO {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  searchOptions: CreateClientRequestDTO;

  @ApiProperty({ required: true })
  creator: UserResponseDTO;

  @ApiProperty({ required: true })
  createdAt: Date;
}
