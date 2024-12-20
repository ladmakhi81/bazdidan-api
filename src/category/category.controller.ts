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
import { CategoryService } from './category.service';
import { ApiResponseDTO } from 'src/shared/dtos/api-response.dto';
import {
  CategoryResponseDTO,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from './dtos';
import { Authentication } from 'src/shared/decorators/auth.decorator';
import { PaginationResponseDTO } from 'src/shared/dtos/pagination-response.dto';
import { Pagination } from 'src/shared/decorators/pagination.decorator';
import { PaginationQuery } from 'src/shared/types/pagination.type';
import { FileInterceptor } from '@nestjs/platform-express';
import { CategoryFileUploadResponseDTO } from './dtos/response/category-file-upload-response.dto';

@Controller('/category')
@ApiTags('Categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiExtraModels(ApiResponseDTO, CategoryResponseDTO)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Category Created Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CategoryResponseDTO),
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Category Exist With This name',
  })
  @Authentication()
  createCategory(@Body() dto: CreateCategoryDTO) {
    return this.categoryService.createCategory(dto);
  }

  @Get('/page')
  @ApiExtraModels(ApiResponseDTO, PaginationResponseDTO, CategoryResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Return Lists of Categories Page',
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
                      items: { $ref: getSchemaPath(CategoryResponseDTO) },
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
  @HttpCode(HttpStatus.OK)
  getCategories(@Pagination() { limit, page }: PaginationQuery) {
    return this.categoryService.getCategories(page, limit);
  }

  @Delete(':id')
  @Authentication()
  @ApiExtraModels(ApiResponseDTO, CategoryResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Delete Category Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CategoryResponseDTO),
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No Category Found With this id',
  })
  @HttpCode(HttpStatus.OK)
  deleteCategoryById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.deleteCategoryById(id);
  }

  @Patch(':id')
  @Authentication()
  @ApiExtraModels(ApiResponseDTO, CategoryResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update Category Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CategoryResponseDTO),
            },
          },
        },
      ],
    },
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'No Category Found With this id',
  })
  @ApiResponse({
    status: HttpStatus.CONFLICT,
    description: 'Category Exist With this name',
  })
  @HttpCode(HttpStatus.OK)
  updateCategoryById(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateCategoryDTO,
  ) {
    return this.categoryService.updateCategoryById(id, dto);
  }

  @Post('upload-image')
  @UseInterceptors(FileInterceptor('image'))
  @ApiConsumes('multipart/form-data')
  @HttpCode(HttpStatus.OK)
  @ApiExtraModels(ApiResponseDTO, CategoryFileUploadResponseDTO)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Image Uploaded Successfully',
    schema: {
      allOf: [
        {
          $ref: getSchemaPath(ApiResponseDTO),
        },
        {
          properties: {
            data: {
              $ref: getSchemaPath(CategoryFileUploadResponseDTO),
            },
          },
        },
      ],
    },
  })
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
  uploadCategoryImage(@UploadedFile() file: Express.Multer.File) {
    return this.categoryService.uploadCategoryImage(file);
  }
}
