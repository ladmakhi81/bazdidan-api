import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/modules/base/dtos/user';

export class SignupDTO extends PickType(CreateUserDTO, [
  'firstName',
  'lastName',
  'password',
  'phone',
  'model',
]) {}
