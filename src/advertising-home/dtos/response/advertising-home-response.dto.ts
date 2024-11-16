import { ApiProperty } from '@nestjs/swagger';
import { CategoryResponseDTO } from 'src/category/dtos';
import { UserResponseDTO } from 'src/user/dtos';

export class AdvertisingHomeResponseDTO {
  @ApiProperty({ required: true })
  id: number;

  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: true })
  description: string;

  @ApiProperty({ required: true })
  address: string;

  @ApiProperty({ required: true })
  longtitude: number;

  @ApiProperty({ required: true })
  latitude: number;

  @ApiProperty({ required: true })
  category: CategoryResponseDTO;

  @ApiProperty({ required: true })
  categoryId: number;

  @ApiProperty({ required: true })
  creator: UserResponseDTO;

  @ApiProperty({ required: true })
  creatorId: number;

  @ApiProperty({ required: true })
  tags: string[];

  @ApiProperty({ required: true })
  media: string[];

  @ApiProperty({ required: true })
  meta: Record<string, any>;

  @ApiProperty({ required: true })
  createdAt: Date;

  @ApiProperty({ required: true })
  updatedAt: Date;
}
