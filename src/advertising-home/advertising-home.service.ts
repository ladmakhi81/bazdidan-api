import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { CategoryService } from 'src/category/category.service';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateAdvertisingHomeDTO, UpdateAdvertisingHomeDTO } from './dtos';
import { I18nService } from 'nestjs-i18n';
import * as path from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class AdvertisingHomeService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly categoryService: CategoryService,
    private readonly i18n: I18nService,
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
      throw new ConflictException(
        this.i18n.t('messages.errors.advertising_homes.duplicate_title'),
      );
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

  uploadMedia(file: Express.Multer.File) {
    const fileName = `${new Date().getTime()}-${Math.floor(Math.random() * 100000)}${path.extname(file.originalname)}`;
    const stream = createWriteStream(
      path.join(__dirname, '..', '..', 'public', 'images', fileName),
    );
    stream.write(file.buffer);
    stream.end();
    return { fileName };
  }

  uploadMedias(files: Express.Multer.File[]) {
    return Promise.all(files.map(this.uploadMedia));
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

  async getAdvertisingHomeById(id: number, withDetails: boolean = true) {
    const advertisingHome = await this.prismaService.advertisingHome.findUnique(
      {
        where: { id },
        include: withDetails ? { category: true, creator: true } : {},
      },
    );
    if (!advertisingHome) {
      throw new NotFoundException(
        this.i18n.t('messages.errors.advertising_homes.not_found_id'),
      );
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
        throw new ConflictException(
          this.i18n.t('messages.errors.advertising_homes.duplicate_title'),
        );
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
      throw new NotFoundException(
        this.i18n.t(
          'messages.errors.advertising_homes.not_found_id_and_creator',
        ),
      );
    }
    return advertisingHome;
  }
}
