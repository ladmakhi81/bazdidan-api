import { PickType } from '@nestjs/swagger';
import { UpdateUserByIdDTO } from 'src/user/dtos';

export class ForgetPasswordDTO extends PickType(UpdateUserByIdDTO, [
  'currentPassword',
  'password',
]) {}
