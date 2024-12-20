import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { CreateUserDTO, UpdateUserByIdDTO } from './dtos';
import { GetUsersQueryDTO } from './dtos/request/get-users-query.dto';
import * as bcrypt from 'bcrypt';
import { UserModel } from '@prisma/client';
import { I18n, I18nService } from 'nestjs-i18n';
import * as path from 'path';
import { createWriteStream } from 'fs';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    @I18n() private readonly i18n: I18nService,
  ) {}

  async createUser(dto: CreateUserDTO) {
    const {
      firstName,
      lastName,
      model,
      password,
      phone,
      address,
      bio,
      profileImage,
    } = dto;
    const isDuplicatedByPhone = await this._findByPhoneNumber(phone);
    if (isDuplicatedByPhone) {
      throw new ConflictException(
        this.i18n.t('messages.errors.users.duplicate_phone_number'),
      );
    }
    const passwordHashed = await this._hashPassword(password);
    const user = await this.prismaService.user.create({
      data: {
        firstName,
        lastName,
        model,
        password: passwordHashed,
        phone,
        address,
        bio,
        profileImage,
        isCompleteProfileAccount: this._checkProfileIsComplete(dto),
      },
    });
    return user;
  }

  async uploadProfileImage(file: Express.Multer.File) {
    const fileName = `${new Date().getTime()}-${Math.floor(Math.random() * 10000000)}${path.extname(file.originalname)}`;
    const stream = createWriteStream(
      path.join(__dirname, '..', '..', 'public', 'images', fileName),
    );
    stream.write(file.buffer);
    stream.end();
    return { fileName };
  }

  async updateUserById(id: number, dto: UpdateUserByIdDTO) {
    const user = await this._findUserById(id);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('messages.errors.users.not_found_id'),
      );
    }
    if (dto.password) {
      const isPasswordCorrect = await this._checkIsPasswordCorrect(
        dto.currentPassword,
        user.password,
      );
      if (isPasswordCorrect) {
        dto.password = await this._hashPassword(dto.password);
        delete dto.currentPassword;
      } else {
        throw new BadRequestException(
          this.i18n.t('messages.errors.users.password_invalid'),
        );
      }
    } else {
      delete dto.password;
      delete dto.currentPassword;
    }
    return this.prismaService.user.update({
      where: { id },
      data: {
        ...dto,
        isCompleteProfileAccount: this._checkProfileIsComplete({
          ...user,
          ...dto,
        }),
      },
    });
  }

  async deleteUserById(id: number) {
    const user = await this._findUserById(id);
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('messages.errors.users.not_found_id'),
      );
    }
    return this.prismaService.user.delete({ where: { id } });
  }

  async getUserProfileById(id: number, withDetails: boolean = true) {
    const user = await this.prismaService.user.findUnique({
      where: { id },
      include: withDetails
        ? {
            sendMessages: true,
            receivedMessages: true,
            advertisingHomes: true,
          }
        : {},
    });
    if (!user) {
      throw new NotFoundException(
        this.i18n.t('messages.errors.users.not_found_id'),
      );
    }
    return user;
  }

  async getUsersPage(page: number, limit: number, condition: GetUsersQueryDTO) {
    const count = await this.prismaService.user.count();
    const content = await this.prismaService.user.findMany({
      skip: page * limit,
      take: limit,
      orderBy: { createdAt: 'desc' },
      where: this._prepareQueryConditionGetUsersPage(condition),
    });
    return { content, count };
  }

  async findUserByPhoneAndPassword(phone: string, password: string) {
    const user = await this._findByPhoneNumber(phone);
    const isPasswordCorrect = await this._checkIsPasswordCorrect(
      password,
      user.password,
    );
    if (!isPasswordCorrect) {
      throw new NotFoundException(
        this.i18n.t('messages.errors.users.phone_password_invalid'),
      );
    }
    return user;
  }

  private async _hashPassword(password: string) {
    const salt = await bcrypt.genSalt();
    const passwordHashed = await bcrypt.hash(password, salt);
    return passwordHashed;
  }

  private _prepareQueryConditionGetUsersPage(condition: GetUsersQueryDTO) {
    const where: Record<string, any> = {};

    if (condition.firstName) {
      if (condition.firstName.equal) {
        where.firstName = { equals: condition.firstName.equal };
      } else if (condition.firstName.startsWith) {
        where.firstName = { startsWith: condition.firstName.startsWith };
      } else if (condition.firstName.endsWith) {
        where.firstName = { endsWith: condition.firstName.endsWith };
      }
    }

    if (condition.lastName) {
      if (condition.lastName.equal) {
        where.lastName = { equals: condition.lastName.equal };
      } else if (condition.lastName.startsWith) {
        where.lastName = { startsWith: condition.lastName.startsWith };
      } else if (condition.lastName.endsWith) {
        where.lastName = { endsWith: condition.lastName.endsWith };
      }
    }

    if (condition.phone) {
      where.phone = { equals: condition.phone };
    }

    if (condition.model) {
      where.model = { equals: condition.model };
    }

    if (typeof condition.isCompleteProfile !== typeof undefined) {
      where.isCompleteProfileAccount = {
        equals: `${condition.isCompleteProfile}` === 'true',
      };
    }

    return where;
  }

  private _checkProfileIsComplete(dto: CreateUserDTO) {
    if (dto.model === UserModel.EstateCompanyAgent) {
      return !!dto.address && !!dto.bio && !!dto.profileImage;
    }
    return true;
  }

  private _findByPhoneNumber(phone: string) {
    return this.prismaService.user.findFirst({
      where: {
        phone,
      },
    });
  }

  private _findUserById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  private _checkIsPasswordCorrect(password: string, hashedPassword: string) {
    return bcrypt.compare(password, hashedPassword);
  }
}
