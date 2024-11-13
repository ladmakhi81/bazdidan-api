import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
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
  title: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString({ message: 'توضیحات آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(8, {
    message: 'توضیحات آگهی ملکی باید حداقل تشکیل شده از 8 حرف باشد',
  })
  description: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsString({ message: 'آدرس آگهی ملکی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(8, {
    message: 'آدرس آگهی ملکی باید حداقل تشکیل شده از 8 حرف باشد',
  })
  address: string;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsBoolean({ message: 'وضعیت آگهی ملکی با فعال یا غیرفعال باید مشخص کنید' })
  isPublished: boolean;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsInt({ message: 'شناسه دسته بندی باید عدد باشد' })
  categoryId: number;

  @IsOptional()
  @ApiProperty({ required: false })
  @IsNumber(
    { allowNaN: false, allowInfinity: false },
    { message: 'طول جغرافیایی باید عدد باشد' },
  )
  latitude: number;

  @IsOptional()
  @ApiProperty({ required: false })
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
