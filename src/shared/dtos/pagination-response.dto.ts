import { ApiProperty } from '@nestjs/swagger';

export class PaginationResponseDTO<T> {
  @ApiProperty({ readOnly: true })
  count: number;

  @ApiProperty({ readOnly: true })
  content: T[];
}
