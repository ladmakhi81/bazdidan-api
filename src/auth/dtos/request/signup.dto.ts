import { PickType } from '@nestjs/swagger';
import { CreateUserDTO } from 'src/user/dtos';

export class SignupDTO extends PickType(CreateUserDTO, [
  'firstName',
  'lastName',
  'password',
  'phone',
  'model',
]) {}
