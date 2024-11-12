import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { AdvertisingHomeController } from './controllers/advertising-home.controller';
import { CategoryService } from './services/category.service';
import { AdvertisingHomeService } from './services/advertising-home.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';

@Module({
  controllers: [CategoryController, AdvertisingHomeController, UserController],
  providers: [CategoryService, AdvertisingHomeService, UserService],
})
export class BaseModule {}
