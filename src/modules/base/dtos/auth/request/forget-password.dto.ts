import { PickType } from '@nestjs/swagger';
import { UpdateUserByIdDTO } from 'src/modules/base/dtos/user';

export class ForgetPasswordDTO extends PickType(UpdateUserByIdDTO, [
  'currentPassword',
  'password',
]) {}
