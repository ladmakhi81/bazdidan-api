import { ConflictException, Injectable } from '@nestjs/common';
import { CreateAdvertisingHomeDTO } from '../dtos/advertising-home';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CategoryService } from './category.service';

@Injectable()
export class AdvertisingHomeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
  ) {}

  async createAdvertisingHome(
    creator: User,
    {
      address,
      categoryId,
      description,
      isPublished,
      latitude,
      longtitude,
      title,
      media,
      meta,
      tags,
    }: CreateAdvertisingHomeDTO,
  ) {
    const isDuplicateByTitle =
      await this.prismaService.advertisingHome.findFirst({
        where: { title },
      });
    if (isDuplicateByTitle) {
      throw new ConflictException('عنوان آگهی ملکی تکراری میباشد');
    }
    const category = await this.categoryService.getCategoryById(categoryId);
    return this.prismaService.advertisingHome.create({
      data: {
        title,
        description,
        address,
        longtitude,
        latitude,
        meta,
        media,
        tags,
        isPublished,
        categoryId: category.id,
        creatorId: creator.id,
      },
      include: {
        creator: true,
        category: true,
      },
    });
  }
}
