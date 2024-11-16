import { Injectable } from '@nestjs/common';
import { CreateClientRequestDTO, GetAllRequestsConditionDTO } from './dtos';
import { User, UserModel } from '@prisma/client';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { CreateClientRequestEvent } from './events';
import { CREATE_CLIENT_REQUEST_EVENT_KEY } from './event-keys.constant';

@Injectable()
export class ClientRequestService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly eventEmitter: EventEmitter2,
  ) {}

  async createRequest(dto: CreateClientRequestDTO, user: User) {
    const results = await this._findAdvertisingHomeBySearchOptions(dto);
    const request = await this.prismaService.clientRequest.create({
      data: { searchOption: { ...dto }, creatorId: user.id },
      include: { creator: true },
    });
    if (results.length > 0) {
      results.map((result) => {
        this.eventEmitter.emit(
          CREATE_CLIENT_REQUEST_EVENT_KEY,
          new CreateClientRequestEvent(result.id, request.id),
        );
      });
    }
    return request;
  }

  async getAllRequests(
    page: number,
    limit: number,
    searchDto: GetAllRequestsConditionDTO,
  ) {
    const rowCondition = this._prepareGetAllRequestsCondition(searchDto);
    const content = await this.prismaService.clientRequest.findMany({
      where: rowCondition,
      include: {
        creator: true,
        result: {
          include: {
            advertisingHome: { include: { creator: true, category: true } },
          },
        },
      },
      skip: page * limit,
      take: limit,
    });
    const count = await this.prismaService.clientRequest.count({
      where: rowCondition,
    });
    return { content, count };
  }

  private _prepareGetAllRequestsCondition({
    id,
    userType,
    advertisingHomeType,
    categoryId,
    hasBalcony,
    hasElevator,
    hasParking,
    latitude,
    longtitude,
    meterage,
    price,
    roomCount,
  }: GetAllRequestsConditionDTO) {
    const condition: Record<string, any> = {};
    const advertisingHomeCondition: Record<string, any> = {};

    switch (userType) {
      case UserModel.Admin:
        break;
      case UserModel.Client:
        condition.creatorId = id;
        break;
      case UserModel.EstateCompanyAgent:
        advertisingHomeCondition.creatorId = id;
        break;
    }

    if (advertisingHomeType) {
      advertisingHomeCondition.type = advertisingHomeType;
    }

    if (categoryId) {
      advertisingHomeCondition.categoryId = categoryId;
    }

    if (latitude) {
      advertisingHomeCondition.latitude = latitude;
    }

    if (longtitude) {
      advertisingHomeCondition.longtitude = longtitude;
    }

    if (meterage) {
      advertisingHomeCondition.meterage = meterage;
    }

    if (price) {
      advertisingHomeCondition.price = price;
    }

    if (roomCount) {
      advertisingHomeCondition.roomCount = roomCount;
    }

    if (typeof hasBalcony !== typeof undefined) {
      advertisingHomeCondition.hasBalcony = hasBalcony;
    }

    if (typeof hasElevator !== typeof undefined) {
      advertisingHomeCondition.hasElevator = hasElevator;
    }

    if (typeof hasParking !== typeof undefined) {
      advertisingHomeCondition.hasParking = hasParking;
    }

    condition.result = {
      ...condition.result,
      some: { advertisingHome: advertisingHomeCondition },
    };

    return condition;
  }

  private _findAdvertisingHomeBySearchOptions({
    type,
    categoryId,
    hasBalcony,
    hasElevator,
    hasParking,
    hasStoreRoom,
    latitude,
    longtitude,
    meterage,
    price,
    roomCount,
  }: CreateClientRequestDTO) {
    return this.prismaService.advertisingHome.findMany({
      where: {
        type,
        categoryId,
        hasBalcony,
        hasElevator,
        hasParking,
        hasStoreRoom,
        isPublished: true,
        latitude,
        longtitude,
        meterage,
        price,
        roomCount,
      },
    });
  }
}
