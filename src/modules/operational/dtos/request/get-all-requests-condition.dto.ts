import { ApiProperty } from '@nestjs/swagger';
import { AdvertisingHomeType, UserModel } from '@prisma/client';

export class GetAllRequestsConditionDTO {
  userType?: UserModel;

  id?: number;

  @ApiProperty({ required: true, enum: AdvertisingHomeType })
  advertisingHomeType: AdvertisingHomeType;

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
  hasBalcony?: boolean;

  @ApiProperty({ required: false })
  hasParking?: boolean;

  @ApiProperty({ required: false })
  hasElevator?: boolean;
}
