import { ApiProperty } from '@nestjs/swagger';
import { AdvertisingHomeType, UserModel } from '@prisma/client';
import { Transform } from 'class-transformer';

export class GetAllRequestsConditionDTO {
  userType?: UserModel;

  id?: number;

  @ApiProperty({ required: false, enum: AdvertisingHomeType })
  advertisingHomeType?: AdvertisingHomeType;

  @ApiProperty({ required: false })
  roomCount?: number;

  @ApiProperty({ required: false })
  price?: number;

  @ApiProperty({ required: false })
  meterage?: number;

  @ApiProperty({ required: false })
  categoryId?: number;

  @ApiProperty({ required: false })
  latitude?: number;

  @ApiProperty({ required: false })
  longtitude?: number;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  hasBalcony?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  hasParking?: boolean;

  @ApiProperty({ required: false })
  @Transform(({ value }) => value === 'true')
  hasElevator?: boolean;
}
