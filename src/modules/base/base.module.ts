import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { AdvertisingHomeController } from './controllers/advertising-home.controller';
import { CategoryService } from './services/category.service';
import { AdvertisingHomeService } from './services/advertising-home.service';

@Module({
  controllers: [CategoryController, AdvertisingHomeController],
  providers: [CategoryService, AdvertisingHomeService],
})
export class BaseModule {}
