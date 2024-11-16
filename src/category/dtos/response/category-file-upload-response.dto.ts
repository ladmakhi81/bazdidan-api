import { ApiProperty } from '@nestjs/swagger';

export class CategoryFileUploadResponseDTO {
  @ApiProperty({ required: true })
  filename: string;
}
