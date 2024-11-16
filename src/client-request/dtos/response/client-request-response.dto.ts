import { ApiProperty } from '@nestjs/swagger';
import { CreateClientRequestDTO } from '../request/create-client-request.dto';
import { UserResponseDTO } from 'src/user/dtos';

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
