import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateChatRoomDTO {
  @IsNotEmpty({
    message: 'وارد کردن شناسه شخصی که با آن گفتگو را شروع کردید الزامی میباشد',
  })
  @IsInt({
    message: 'وارد کردن شناسه شخصی که با آن گفتگو را شروع کردید الزامی میباشد',
  })
  @ApiProperty({ required: true })
  secondUserId: number;

  @IsNotEmpty({ message: 'مشخص کردن آگهی مربوط به گفتگو الزامی میباشد' })
  @IsInt({ message: 'مشخص کردن آگهی مربوط به گفتگو الزامی میباشد' })
  @ApiProperty({ required: true })
  advertisingHomeId: number;
}
