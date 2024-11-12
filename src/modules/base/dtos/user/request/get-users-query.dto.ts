import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@prisma/client';

class BaseQuery {
  @ApiProperty({ required: false })
  equal?: string;

  @ApiProperty({ required: false })
  startsWith?: string;

  @ApiProperty({ required: false })
  endsWith?: string;
}

export class GetUsersQueryDTO {
  @ApiProperty({ required: false })
  firstName: BaseQuery;

  @ApiProperty({ required: false })
  lastName: BaseQuery;

  @ApiProperty({ required: false })
  phone: string;

  @ApiProperty({ required: false })
  model: UserModel;

  @ApiProperty({ required: false })
  isCompleteProfile: boolean;
}
