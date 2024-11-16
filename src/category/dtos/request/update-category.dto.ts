import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateCategoryDTO {
  @IsOptional()
  @IsString({ message: 'نام دسته بندی باید تشکیل شده از حروف الفبا باشد' })
  @MinLength(3, { message: 'نام دسته بندی باید حداقل از ۳ حرف تشکیل شده باشد' })
  @ApiProperty({ required: false })
  name?: string;

  @IsOptional()
  @IsString({ message: 'عکس دسته بندی باید تشکیل شده از حروف الفبا باشد' })
  @ApiProperty({ required: false })
  image?: string;
}
