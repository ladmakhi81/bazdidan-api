import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateMessageDTO {
  @IsNotEmpty({ message: 'وارد کردن شناسه دریافت کننده پیام الزامی میباشد' })
  @IsInt({ message: 'شناسه دریافت کننده پیام باید عدد باشد' })
  @ApiProperty({ required: true })
  receiverId: number;

  @IsNotEmpty({ message: 'وارد کردن شناسه گروه گفتگو الزامی میباشد' })
  @IsInt({ message: 'شناسه گروه گفتگو باید عدد باشد' })
  @ApiProperty({ required: true })
  chatId: number;

  @IsNotEmpty({ message: 'وارد کردن متن پیام الزامی میباشد' })
  @IsString({ message: 'محتوای پیام باید رشته باشد' })
  @ApiProperty({ required: true })
  content: string;

  @IsOptional()
  @IsInt({ message: 'شناسه پیام ریپلای شده باید عدد باشد' })
  @ApiProperty({ required: false })
  repliedMessageId: number;
}
