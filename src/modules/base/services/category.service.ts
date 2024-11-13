import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDTO, UpdateCategoryDTO } from '../dtos/category';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { Jimp } from 'jimp';
import * as path from 'path';

@Injectable()
export class CategoryService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCategory({ image, name }: CreateCategoryDTO) {
    const isDuplicateByName = await this.prismaService.category.findUnique({
      where: { name },
    });
    if (isDuplicateByName) {
      throw new ConflictException('نام دسته بندی تکراری میباشد');
    }
    return this.prismaService.category.create({
      data: {
        image,
        name,
      },
    });
  }

  async getCategories(page: number, limit: number) {
    const count = await this.prismaService.category.count();
    const content = await this.prismaService.category.findMany({
      skip: page * limit,
      take: limit,
    });
    return { count, content };
  }

  async deleteCategoryById(id: number) {
    const category = await this.getCategoryById(id);
    return this.prismaService.category.delete({ where: { id: category.id } });
  }

  async updateCategoryById(id: number, dto: UpdateCategoryDTO) {
    const category = await this.getCategoryById(id);
    if (dto.name) {
      const isDuplicateName = await this.prismaService.category.findFirst({
        where: {
          name: dto.name,
          NOT: { id },
        },
      });
      if (isDuplicateName) {
        throw new ConflictException('نام دسته بندی تکراری میباشد');
      }
    }
    return this.prismaService.category.update({
      where: { id: category.id },
      data: dto,
    });
  }

  async uploadCategoryImage(file: Express.Multer.File) {
    const filename = `/images/${new Date().getTime()}-${Math.floor(Math.random() * 100000000)}${file.originalname}`;
    const filePathURL = path.join(
      __dirname,
      '..',
      '..',
      '..',
      '..',
      'public',
      filename,
    );
    const loadedFile = await Jimp.read(file.buffer);
    await loadedFile.resize({ h: 200, w: 200 }).write(filePathURL as any);
    return { filename };
  }

  async getCategoryById(id: number) {
    const category = await this.prismaService.category.findUnique({
      where: { id },
    });
    if (!category) {
      throw new NotFoundException('دسته بندی با این شناسه یافت نشد');
    }
    return category;
  }
}
