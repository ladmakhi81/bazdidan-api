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
  Sse,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBody,
  ApiConsumes,
  ApiExtraModels,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import {
  CreateUserDTO,
  UpdateUserByIdDTO,
  UploadProfileFileResponseDTO,
  UserDetailedResponseDTO,
  UserResponseDTO,
} from './dtos';
import { ApiResponseDTO } from 'src/shared/dtos/api-response.dto';
import { PaginationResponseDTO } from 'src/shared/dtos/pagination-response.dto';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { GetUsersQueryDTO } from './dtos/request/get-users-query.dto';
import { PaginationQuery } from 'src/shared/types/pagination.type';
import { Authentication } from 'src/shared/decorators/auth.decorator';
import { SseService } from 'src/shared/sse/sse.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('user')
@ApiTags('Users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly sseService: SseService,
  ) {}

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
  @Authentication()
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
  @Authentication()
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
  @Authentication()
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
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
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
  @Authentication()
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

  @Sse('notification')
  connectNotificationChannel() {
    return this.sseService.getSubject();
  }

  @Post('upload-profile')
  @Authentication()
  @HttpCode(HttpStatus.OK)
  @ApiExtraModels(ApiResponseDTO, UploadProfileFileResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Image Uploaded Successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDTO) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(UploadProfileFileResponseDTO),
            },
          },
        },
      ],
    },
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        image: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor('image'))
  uploadProfileImage(@UploadedFile() file: Express.Multer.File) {
    return this.userService.uploadProfileImage(file);
  }
}
