import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
