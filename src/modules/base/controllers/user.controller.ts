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
import {
  ApiExtraModels,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserService } from '../services/user.service';
import {
  CreateUserDTO,
  UpdateUserByIdDTO,
  UserDetailedResponseDTO,
  UserResponseDTO,
} from '../dtos/user';
import { Pagination } from 'src/core/decorators/pagination.decorator';
import { PaginationQuery } from 'src/shared/types/pagination.type';
import { GetUsersQueryDTO } from '../dtos/user/request/get-users-query.dto';
import { ApiResponseDTO } from 'src/shared/dtos/api-response.dto';
import { PaginationResponseDTO } from 'src/shared/dtos/pagination-response.dto';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('create-user')
  @HttpCode(HttpStatus.CREATED)
  @ApiExtraModels(ApiResponse, UserResponseDTO)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'User Successfully Created',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(UserResponseDTO),
            },
          },
        },
      ],
    },
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
  @ApiExtraModels(ApiResponseDTO, UserResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Updated Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(UserResponseDTO),
            },
          },
        },
      ],
    },
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
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(UserResponseDTO),
            },
          },
        },
      ],
    },
  })
  deleteUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.deleteUserById(id);
  }

  @Get('/page')
  @HttpCode(HttpStatus.OK)
  @ApiExtraModels(
    ApiResponseDTO,
    PaginationResponseDTO,
    UserDetailedResponseDTO,
  )
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return Users Lists Pagination',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDTO) },
        {
          properties: {
            data: {
              allOf: [
                { $ref: getSchemaPath(PaginationResponseDTO) },
                {
                  properties: {
                    content: {
                      type: 'array',
                      items: { $ref: getSchemaPath(UserDetailedResponseDTO) },
                    },
                  },
                },
              ],
            },
          },
        },
      ],
    },
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
  @ApiExtraModels(ApiResponseDTO, UserDetailedResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'User Found Successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDTO) },
        {
          properties: {
            data: { $ref: getSchemaPath(UserDetailedResponseDTO) },
          },
        },
      ],
    },
  })
  getUserProfileById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserProfileById(id);
  }
}
