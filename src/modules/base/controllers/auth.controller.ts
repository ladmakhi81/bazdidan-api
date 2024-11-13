import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  AuthResponseDTO,
  ForgetPasswordDTO,
  LoginDTO,
  SignupDTO,
} from '../dtos/auth';
import { Authentication } from 'src/core/decorators/auth.decorator';

@Controller('/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User Signup Successfully',
    type: AuthResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User Phone Duplicated',
  })
  signup(@Body() dto: SignupDTO) {
    return this.authService.signup(dto);
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Login Successfully',
    type: AuthResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Phone or Password Is Incorrect',
  })
  login(@Body() dto: LoginDTO) {
    return this.authService.login(dto);
  }

  @Patch('forget-password')
  @HttpCode(HttpStatus.OK)
  @Authentication()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Password Change Successully',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User Password is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not Found',
  })
  forgetPassword(
    @Body() dto: ForgetPasswordDTO,
    @Req() request: Express.Request,
  ) {
    return this.authService.forgetPassword(request.user.id, dto);
  }
}