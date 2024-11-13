import { ApiProperty } from '@nestjs/swagger';
import { AdvertisingHomeType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class UpdateAdvertisingHomeDTO {
  @IsOptional()
  @ApiProperty({ required: false })
  @IsString({ message: 'عنوان آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, {
    message: 'عنوان آگهی ملکی باید حداقل تشکیل شده از ۳ حرف باشد',
  })
  title?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString({ message: 'توضیحات آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(8, {
    message: 'توضیحات آگهی ملکی باید حداقل تشکیل شده از 8 حرف باشد',
  })
  description?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString({ message: 'آدرس آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(8, {
    message: 'آدرس آگهی ملکی باید حداقل تشکیل شده از 8 حرف باشد',
  })
  address?: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsBoolean({ message: 'وضعیت آگهی ملکی با فعال یا غیرفعال باید مشخص کنید' })
  isPublished?: boolean;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsInt({ message: 'شناسه دسته بندی باید عدد باشد' })
  categoryId?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'طول جغرافیایی باید عدد باشد' },
  )
  latitude?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'عرض جغرافیایی باید عدد باشد' },
  )
  longtitude?: number;

  @IsOptional()
  @IsInt({ message: 'تعداد اتاق ملک باید عدد باشد' })
  @ApiProperty({ required: true })
  roomCount?: number;

  @IsOptional()
  @IsInt({ message: 'متراژ باید عدد باشد' })
  @ApiProperty({ required: true })
  meterage?: number;

  @IsOptional()
  @IsBoolean({ message: 'مشخص کردن وضعیت آسانسور ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasElevator?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'مشخص کردن وضعیت پارکینگ ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasParking?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'مشخص کردن وضعیت انباری ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasStoreRoom?: boolean;

  @IsOptional()
  @IsBoolean({ message: 'مشخص کردن وضعیت بالکن ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasBalcony?: boolean;

  @IsOptional()
  @IsEnum(AdvertisingHomeType, {
    message: 'مشخص کردن نوع آگهی ملکی الزامی میباشد',
  })
  @ApiProperty({ required: true })
  type?: AdvertisingHomeType;

  @IsOptional()
  @ApiProperty({ required: true })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'قیمت ملک باید عدد باشد' },
  )
  price?: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsObject({ message: 'متادیتا های مربوط به آگهی ملکی باید آبجکت باشد' })
  meta?: Record<string, any>;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString({
    each: true,
    message: 'مدیا های مربوط به آگهی ملکی باید تشکیل شده از حروف الفبا باشد',
  })
  media?: string[];

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString({
    each: true,
    message: 'تگ های مربوط به آگهی ملکی باید تشکیل شده از حروف الفبا باشد',
  })
  tags?: string[];
}
