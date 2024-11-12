import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import {
  CreateUserDTO,
  UpdateUserByIdDTO,
  UserDetailedResponseDTO,
  UserResponseDTO,
} from '../dtos/user';
import { Pagination } from 'src/core/decorators/pagination.decorator';
import { PaginationQuery } from 'src/core/types/pagination.type';
import { GetUsersQueryDTO } from '../dtos/user/request/get-users-query.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User Successfully Created',
    type: UserResponseDTO,
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'User Phone Duplicated',
  })
  createUser(@Body() dto: CreateUserDTO) {
    return this.userService.createUser(dto);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not Found By Provided ID',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'User Password is incorrect',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Updated Successfully',
    type: UserResponseDTO,
  })
  updateUserById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateUserByIdDTO,
  ) {
    return this.userService.updateUserById(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not Found By Provided ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Deleted Successfully',
    type: UserResponseDTO,
  })
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  @Get('/page')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return Users Lists Pagination',
    type: UserDetailedResponseDTO,
    isArray: true,
  })
  getUsersPage(
    @Query() condition: GetUsersQueryDTO,
    @Pagination() { limit, page }: PaginationQuery,
  ) {
    return this.userService.getUsersPage(page, limit, condition);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'User Not Found By Provided ID',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Found Successfully',
    type: UserDetailedResponseDTO,
  })
  getUserProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserProfileById(id);
  }
}
