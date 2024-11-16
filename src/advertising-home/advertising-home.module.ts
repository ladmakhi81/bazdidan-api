import { Module } from '@nestjs/common';
import { AdvertisingHomeController } from './advertising-home.controller';
import { AdvertisingHomeService } from './advertising-home.service';
import { CategoryModule } from 'src/category/category.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [CategoryModule, UserModule],
  controllers: [AdvertisingHomeController],
  providers: [AdvertisingHomeService],
})
export class AdvertisingHomeModule {}
