import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/client-request')
@ApiTags('Client Request')
export class ClientRequestController {}
