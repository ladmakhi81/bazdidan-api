import { Injectable } from '@nestjs/common';
import { CreateClientRequestDTO } from '../dtos';
import { User } from '@prisma/client';
import { PrismaService } from 'src/core/prisma/prisma.service';

@Injectable()
export class ClientRequestService {
  constructor(private readonly prismaService: PrismaService) {}

  async createRequest(dto: CreateClientRequestDTO, user: User) {
    const results = await this._findAdvertisingHomeBySearchOptions(dto);
    const request = await this.prismaService.clientRequest.create({
      data: { searchOption: { ...dto }, creatorId: user.id },
      include: { creator: true },
    });
    if (results.length > 0) {
      const response = await Promise.all(
        results.map((result) =>
          this.prismaService.clientRequestResult.create({
            data: {
              advertisingHomeId: result.id,
              requestId: request.id,
            },
          }),
        ),
      );
      console.log({ response });
    }
    return request;
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
