import { ApiProperty } from '@nestjs/swagger';
import { AdvertisingHomeType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateClientRequestDTO {
  @IsOptional()
  @IsInt({ message: 'دسته بندی باید از نوع عددی باشد' })
  @ApiProperty({ required: false })
  categoryId?: number;

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'عرض جغرافیایی باید از نوع عددی باشد' },
  )
  @ApiProperty({ required: false })
  latitude?: number;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'طول جغرافیایی باید از نوع عددی باشد' },
  )
  @ApiProperty({ required: false })
  longtitude?: number;

  @IsOptional()
  @IsNumber(
    { allowInfinity: false, allowNaN: false },
    { message: 'قیمت باید از نوع عددی باشد' },
  )
  @ApiProperty({ required: false })
  price?: number;

  @IsOptional()
  @IsInt({ message: 'تعداد اتاق باید از نوع عددی باشد' })
  @ApiProperty({ required: false })
  roomCount?: number;

  @IsOptional()
  @IsInt({ message: 'متراژ باید از نوع عددی باشد' })
  @ApiProperty({ required: false })
  meterage?: number;

  @IsOptional()
  @IsBoolean({ message: 'وضعیت داشتن آسانسور نادرست میباشد' })
  @ApiProperty({ required: false })
  hasElevator?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'وضعیت داشتن پارکینگ نادرست میباشد' })
  @ApiProperty({ required: false })
  hasParking?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'وضعیت داشتن انباری نادرست میباشد' })
  @ApiProperty({ required: false })
  hasStoreRoom?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'وضعیت داشتن بالکن نادرست میباشد' })
  @ApiProperty({ required: false })
  hasBalcony?: boolean;

  @IsNotEmpty()
  @IsEnum(AdvertisingHomeType, { message: 'نوع آگهی نادرست میباشد' })
  @ApiProperty({ required: true, enum: AdvertisingHomeType })
  type: AdvertisingHomeType;
}
