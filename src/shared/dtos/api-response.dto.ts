import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';

export class ApiResponseDTO<T> {
  @ApiProperty({ required: true })
  error: boolean;

  @ApiProperty({ required: true })
  message: string | null;

  @ApiProperty({ required: true })
  timestamp: Date;

  @ApiProperty({ required: true })
  statusCode: HttpStatus;

  @ApiProperty({ required: false })
  data?: T;
}
