import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import {
  CreateAdvertisingHomeDTO,
  UpdateAdvertisingHomeDTO,
} from '../dtos/advertising-home';
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
      hasBalcony,
      hasElevator,
      hasParking,
      hasStoreRoom,
      meterage,
      roomCount,
      type,
      price,
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
        hasBalcony,
        hasElevator,
        hasParking,
        hasStoreRoom,
        meterage,
        price,
        roomCount,
        type,
      },
      include: {
        creator: true,
        category: true,
      },
    });
  }

  async getAdvertisingHomesPage(page: number, limit: number) {
    const count = await this.prismaService.advertisingHome.count();
    const content = await this.prismaService.advertisingHome.findMany({
      skip: limit * page,
      take: limit,
      include: { category: true, creator: true },
      orderBy: { createdAt: 'desc' },
    });
    return { count, content };
  }

  async deleteAdvertisingHomeById(creator: User, id: number) {
    const advertisingHome = await this._findAdvertisingHomeByIdAndCreator(
      creator.id,
      id,
    );
    return this.prismaService.advertisingHome.delete({
      where: { id: advertisingHome.id },
      include: { category: true, creator: true },
    });
  }

  async getAdvertisingHomeById(id: number) {
    const advertisingHome = await this.prismaService.advertisingHome.findUnique(
      { where: { id }, include: { category: true, creator: true } },
    );
    if (!advertisingHome) {
      throw new NotFoundException('آگهی ملکی با این شناسه یافت نشد');
    }
    return advertisingHome;
  }

  async updateAdvertisingHomeById(
    creator: User,
    id: number,
    dto: UpdateAdvertisingHomeDTO,
  ) {
    const advertisingHome = await this._findAdvertisingHomeByIdAndCreator(
      creator.id,
      id,
    );

    if (dto.title) {
      const isDuplicateByTitle =
        await this.prismaService.advertisingHome.findFirst({
          where: { title: dto.title, NOT: { id } },
        });

      if (isDuplicateByTitle) {
        throw new ConflictException('عنوان آگهی ملکی تکراری میباشد');
      }
    }

    if (dto.categoryId) {
      const category = await this.categoryService.getCategoryById(
        dto.categoryId,
      );
      dto.categoryId = category.id;
    } else {
      dto.categoryId = advertisingHome.categoryId;
    }

    return this.prismaService.advertisingHome.update({
      where: { id: advertisingHome.id },
      data: { ...dto },
      include: { category: true, creator: true },
    });
  }

  private async _findAdvertisingHomeByIdAndCreator(
    creatorId: number,
    advertisingId: number,
  ) {
    const advertisingHome = await this.prismaService.advertisingHome.findFirst({
      where: {
        id: advertisingId,
        creatorId,
      },
    });

    if (!advertisingHome) {
      throw new NotFoundException('آگهی شغلی با این شناسه و سازنده یافت نشد');
    }
    return advertisingHome;
  }
}
