import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { TokenService } from '../shared/token/token.service';
import { ForgetPasswordDTO, LoginDTO, SignupDTO } from './dtos';
import { CreateUserDTO, UpdateUserByIdDTO } from 'src/user/dtos';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly tokenService: TokenService,
  ) {}

  async signup(dto: SignupDTO) {
    const user = await this.userService.createUser(dto as CreateUserDTO);
    const token = await this.tokenService.generateToken({
      userId: user.id,
      userModel: user.model,
    });
    return token;
  }

  async login({ password, phone }: LoginDTO) {
    const user = await this.userService.findUserByPhoneAndPassword(
      phone,
      password,
    );
    const token = await this.tokenService.generateToken({
      userId: user.id,
      userModel: user.model,
    });
    return token;
  }

  async forgetPassword(id: number, dto: ForgetPasswordDTO) {
    await this.tokenService.destroyTokens(id);
    await this.userService.updateUserById(id, dto as UpdateUserByIdDTO);
  }

  getProfile(id: number) {
    return this.userService.getUserProfileById(id);
  }
}
