import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiExtraModels,
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
}
