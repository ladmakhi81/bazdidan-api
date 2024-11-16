import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty({ message: 'نام کاربر الزامی میباشد' })
  @IsString({ message: 'نام کاربر باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, { message: 'نام کاربر باید حداقل 3 کاراکتر داشته باشد' })
  @ApiProperty({ required: true })
  firstName: string;

  @IsNotEmpty({ message: 'نام خانوادگی کاربر الزامی میباشد' })
  @IsString({ message: 'نام خانوادگی کاربر باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, {
    message: 'نام خانوادگی کاربر باید حداقل 3 کاراکتر داشته باشد',
  })
  @ApiProperty({ required: true })
  lastName: string;

  @IsNotEmpty({ message: 'شماره تماس کاربر الزامی میباشد' })
  @IsPhoneNumber('IR', { message: 'فرمت شماره تماس کاربر نادرست میباشد' })
  @ApiProperty({ required: true })
  phone: string;

  @IsNotEmpty({ message: 'گذرواژه کاربر الزامی میباشد' })
  @IsString()
  @MinLength(8, { message: 'گذرواژه کاربر باید حداقل 8 کاراکتر باشد' })
  @ApiProperty({ required: true })
  password: string;

  @IsNotEmpty({ message: 'نوع کاربری کاربر الزامی میباشد' })
  @IsEnum(UserModel, { message: 'نوع کاربری وارد شده نادرست میباشد' })
  @ApiProperty({ required: true })
  model: UserModel;

  @IsOptional()
  @IsString({ message: 'عکس پروفایل باید تشکیل شده از حروف باشد' })
  @ApiProperty({ required: false })
  profileImage?: string;

  @IsOptional()
  @IsString({ message: 'توضیحات مربوط به کاربر باید تشکیل شده از رشته باشد' })
  @MinLength(10, {
    message: 'توضیحات مربوط به کاربر باید حداقل 10 حرف داشته باشد',
  })
  @ApiProperty({ required: false })
  bio?: string;

  @IsOptional()
  @IsString({ message: 'آدرس کاربر الزامی میباشد' })
  @MinLength(10, {
    message: 'آدرس کاربر باید حداقل 10 حرف داشته باشد',
  })
  @ApiProperty({ required: false })
  address?: string;
}
