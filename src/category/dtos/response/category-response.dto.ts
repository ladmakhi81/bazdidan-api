import { ApiProperty } from '@nestjs/swagger';

export class CategoryResponseDTO {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  name: string;

  @ApiProperty({ required: true })
  image: string;
}
