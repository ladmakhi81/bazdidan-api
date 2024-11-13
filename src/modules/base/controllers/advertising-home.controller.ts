import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiQuery,
  ApiResponse,
  ApiTags,
  getSchemaPath,
} from '@nestjs/swagger';
import { Authentication } from 'src/core/decorators/auth.decorator';
import {
  AdvertisingHomeResponseDTO,
  CreateAdvertisingHomeDTO,
} from '../dtos/advertising-home';
import { AdvertisingHomeService } from '../services/advertising-home.service';
import { ApiResponseDTO } from 'src/shared/dtos/api-response.dto';
import { Pagination } from 'src/core/decorators/pagination.decorator';
import { PaginationQuery } from 'src/shared/types/pagination.type';
import { PaginationResponseDTO } from 'src/shared/dtos/pagination-response.dto';

@Controller('/advertising-home')
@ApiTags('Advertising Home')
export class AdvertisingHomeController {
  constructor(
    private readonly advertisingHomeService: AdvertisingHomeService,
  ) {}

  @Post()
  @Authentication()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'The Title Of Advertising Home Is Duplicated',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No Category Found With This Category Id',
  })
  @ApiExtraModels(ApiResponseDTO, AdvertisingHomeResponseDTO)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The Advertising Home Is Created',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDTO) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(AdvertisingHomeResponseDTO),
            },
          },
        },
      ],
    },
  })
  createAdvertisingHome(
    @Body() dto: CreateAdvertisingHomeDTO,
    @Req() request: Express.Request,
  ) {
    return this.advertisingHomeService.createAdvertisingHome(request.user, dto);
  }

  @Get('/page')
  @HttpCode(HttpStatus.OK)
  @ApiExtraModels(
    ApiResponseDTO,
    PaginationResponseDTO,
    AdvertisingHomeResponseDTO,
  )
  @ApiQuery({ name: 'limit', type: 'number', required: false })
  @ApiQuery({ name: 'page', type: 'number', required: false })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return All Advertising Homes as Page',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              allOf: [
                {
                  $ref: getSchemaPath(PaginationResponseDTO),
                },
                {
                  properties: {
                    content: {
                      type: 'array',
                      items: {
                        $ref: getSchemaPath(AdvertisingHomeResponseDTO),
                      },
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
  getAdvertisingHomesPage(@Pagination() { limit, page }: PaginationQuery) {
    return this.advertisingHomeService.getAdvertisingHomesPage(page, limit);
  }

  @Delete(':id')
  @ApiExtraModels(ApiResponseDTO)
  @Authentication()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Advertising Home Successfully',
    schema: {
      allOf: [
        { $ref: getSchemaPath(ApiResponseDTO) },
        {
          properties: {
            data: {
              $ref: getSchemaPath(AdvertisingHomeResponseDTO),
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No Advertising Home Exist With This Id And Creator',
  })
  deleteAdvertisingHomeById(
    @Param('id', ParseIntPipe) id: number,
    @Req() request: Express.Request,
  ) {
    return this.advertisingHomeService.deleteAdvertisingHomeById(
      request.user,
      id,
    );
  }
}
