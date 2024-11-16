import { ApiProperty } from '@nestjs/swagger';
import { AdvertisingHomeType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateAdvertisingHomeDTO {
  @IsNotEmpty({ message: 'وارد کردن عنوان آگهی ملکی الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsString({ message: 'عنوان آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, {
    message: 'عنوان آگهی ملکی باید حداقل تشکیل شده از ۳ حرف باشد',
  })
  title: string;

  @IsNotEmpty({ message: 'وارد کردن توضیحات آگهی ملکی الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsString({ message: 'توضیحات آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(8, {
    message: 'توضیحات آگهی ملکی باید حداقل تشکیل شده از 8 حرف باشد',
  })
  description: string;

  @IsNotEmpty({ message: 'وارد کردن آدرس آگهی ملکی الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsString({ message: 'آدرس آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(8, {
    message: 'آدرس آگهی ملکی باید حداقل تشکیل شده از 8 حرف باشد',
  })
  address: string;

  @IsNotEmpty({ message: 'وارد کردن وضعیت آگهی ملکی الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsBoolean({ message: 'وضعیت آگهی ملکی با فعال یا غیرفعال باید مشخص کنید' })
  isPublished: boolean;

  @IsNotEmpty({ message: 'وارد کردن دسته بندی آگهی ملکی الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsInt({ message: 'شناسه دسته بندی باید عدد باشد' })
  categoryId: number;

  @IsNotEmpty({ message: 'وارد کردن طول جغرافیایی آگهی ملکی الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'طول جغرافیایی باید عدد باشد' },
  )
  latitude: number;

  @IsNotEmpty({ message: 'وارد کردن عرض جغرافیایی آگهی ملکی الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'عرض جغرافیایی باید عدد باشد' },
  )
  longtitude: number;

  @IsNotEmpty({ message: 'وارد کردن قیمت پایه این ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'قیمت ملک باید عدد باشد' },
  )
  price: number;

  @IsNotEmpty({ message: 'وارد کردن تعداد اتاق ملک الزامی میباشد' })
  @IsInt({ message: 'تعداد اتاق ملک باید عدد باشد' })
  @ApiProperty({ required: true })
  roomCount: number;

  @IsNotEmpty({ message: 'وارد کردن متراژ ملک الزامی میباشد' })
  @IsInt({ message: 'متراژ باید عدد باشد' })
  @ApiProperty({ required: true })
  meterage: number;

  @IsNotEmpty({ message: 'مشخص کردن وضعیت آسانسور ملک الزامی میباشد' })
  @IsBoolean({ message: 'مشخص کردن وضعیت آسانسور ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasElevator: boolean;

  @IsNotEmpty({ message: 'مشخص کردن وضعیت پارکینگ ملک الزامی میباشد' })
  @IsBoolean({ message: 'مشخص کردن وضعیت پارکینگ ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasParking: boolean;

  @IsNotEmpty({ message: 'مشخص کردن وضعیت انباری ملک الزامی میباشد' })
  @IsBoolean({ message: 'مشخص کردن وضعیت انباری ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasStoreRoom: boolean;

  @IsNotEmpty({ message: 'مشخص کردن وضعیت بالکن ملک الزامی میباشد' })
  @IsBoolean({ message: 'مشخص کردن وضعیت بالکن ملک الزامی میباشد' })
  @ApiProperty({ required: true })
  hasBalcony: boolean;

  @IsNotEmpty({ message: 'مشخص کردن نوع آگهی ملکی الزامی میباشد' })
  @IsEnum(AdvertisingHomeType, {
    message: 'مشخص کردن نوع آگهی ملکی الزامی میباشد',
  })
  @ApiProperty({ required: true })
  type: AdvertisingHomeType;

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
