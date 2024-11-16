import { ApiProperty } from '@nestjs/swagger';
import { UserModel } from '@prisma/client';

export class UserResponseDTO {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  phone: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  model: UserModel;

  @ApiProperty()
  isCompleteProfileAccount: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty({ required: false })
  profileImage?: string;

  @ApiProperty({ required: false })
  address?: string;

  @ApiProperty({ required: false })
  bio?: string;
}

export class UserDetailedResponseDTO extends UserResponseDTO {
  @ApiProperty({ default: [] })
  advertisingHomes: any;

  @ApiProperty({ default: [] })
  sendMessages: any;

  @ApiProperty({ default: [] })
  receivedMessages: any;
}
