import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';

export class LoginDTO {
  @IsNotEmpty({ message: 'شماره تماس کاربر الزامی میباشد' })
  @IsPhoneNumber('IR', { message: 'فرمت شماره تماس کاربر نادرست میباشد' })
  @ApiProperty({ required: true })
  phone: string;

  @IsNotEmpty({ message: 'گذرواژه کاربر الزامی میباشد' })
  @IsString()
  @MinLength(8, { message: 'گذرواژه کاربر باید حداقل 8 کاراکتر باشد' })
  @ApiProperty({ required: true })
  password: string;
}
