import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCategoryDTO {
  @IsNotEmpty({ message: 'نام دسته بندی الزامی میباشد' })
  @IsString({ message: 'نام دسته بندی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, { message: 'نام دسته بندی باید حداقل از ۳ حرف تشکیل شده باشد' })
  @ApiProperty({ required: true })
  name: string;

  @IsNotEmpty({ message: 'عکس دسته بندی الزامی میباشد' })
  @IsString({ message: 'عکس دسته بندی باید تشکیل شده از حروف الفبا باشد' })
  @ApiProperty({ required: true })
  image: string;
}
