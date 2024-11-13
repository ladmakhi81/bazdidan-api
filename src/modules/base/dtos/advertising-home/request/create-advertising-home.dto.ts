import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
