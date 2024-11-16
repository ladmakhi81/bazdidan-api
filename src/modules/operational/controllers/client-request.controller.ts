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
import { ClientRequestService } from '../services/client-request.service';
import { Authentication } from 'src/core/decorators/auth.decorator';
import { ClientRequestResponseDTO, CreateClientRequestDTO } from '../dtos';
import { ApiResponseDTO } from 'src/shared/dtos/api-response.dto';

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
}
