import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('/category')
@ApiTags('Categories')
export class CategoryController {}
