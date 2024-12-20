import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiParam,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { ClientRequestService } from './client-request.service';
import { Authentication } from 'src/shared/decorators/auth.decorator';
import { ApiResponseDTO } from 'src/shared/dtos/api-response.dto';
import {
  ClientRequestResponseDTO,
  CreateClientRequestDTO,
  GetAllRequestsConditionDTO,
} from './dtos';
import { ClientRequestDetailResponseDTO } from './dtos/response/client-request-detail-response.dto';
import { UserModel } from '@prisma/client';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { PaginationQuery } from 'src/shared/types/pagination.type';

@Controller('/client-request')
@ApiTags('Client Request')
export class ClientRequestController {
  constructor(private readonly clientRequestService: ClientRequestService) {}

  @Post()
  @Authentication()
  @HttpCode(HttpStatus.CREATED)
  @ApiExtraModels(ApiResponseDTO, ClientRequestResponseDTO)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Search Advertising Home Done Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ClientRequestResponseDTO),
            },
          },
        },
      ],
    },
  })
  createClientRequest(
    @Body() dto: CreateClientRequestDTO,
    @Req() { user }: Express.Request,
  ) {
    return this.clientRequestService.createRequest(dto, user);
  }

  @Get('/:model')
  @Authentication()
  @ApiExtraModels(ApiResponse, ClientRequestDetailResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return Lists Of Requests',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponse) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(ClientRequestDetailResponseDTO),
            },
          },
        },
      ],
    },
  })
  @ApiParam({ required: true, name: 'model', enum: UserModel })
  getRequests(
    @Req() { user }: Express.Request,
    @Pagination() { limit, page }: PaginationQuery,
    @Query() query: GetAllRequestsConditionDTO,
    @Param('model') model: UserModel,
  ) {
    return this.clientRequestService.getAllRequests(page, limit, {
      userType: model,
      id: user.id,
      ...query,
    });
  }
}
