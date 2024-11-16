import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserByIdDTO {
  @IsOptional()
  @IsString({ message: 'نام کاربر باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, { message: 'نام کاربر باید حداقل 3 کاراکتر داشته باشد' })
  @ApiProperty({ required: false })
  firstName: string;

  @IsOptional()
  @IsString({ message: 'نام خانوادگی کاربر باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, {
    message: 'نام خانوادگی کاربر باید حداقل 3 کاراکتر داشته باشد',
  })
  @ApiProperty({ required: false })
  lastName: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'گذرواژه کاربر باید حداقل 8 کاراکتر باشد' })
  @ApiProperty({ required: false })
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(8, { message: 'گذرواژه کاربر باید حداقل 8 کاراکتر باشد' })
  @ApiProperty({ required: false })
  currentPassword: string;

  @IsOptional()
  @IsString({ message: 'عکس پروفایل باید تشکیل شده از حروف باشد' })
  @ApiProperty({ required: false })
  profileImage?: string;

  @IsOptional()
  @IsString({ message: 'آدرس کاربر الزامی میباشد' })
  @MinLength(10, {
    message: 'آدرس کاربر باید حداقل 10 حرف داشته باشد',
  })
  @ApiProperty({ required: false })
  address: string;

  @IsOptional()
  @IsString({ message: 'توضیحات مربوط به کاربر باید تشکیل شده از رشته باشد' })
  @MinLength(10, {
    message: 'توضیحات مربوط به کاربر باید حداقل 10 حرف داشته باشد',
  })
  @ApiProperty({ required: false })
  bio: string;
}
