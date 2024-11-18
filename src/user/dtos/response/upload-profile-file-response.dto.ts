import { ApiProperty } from '@nestjs/swagger';

export class UploadProfileFileResponseDTO {
  @ApiProperty({ required: true })
  fileName: string;
}
