import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { AdvertisingHomeController } from './controllers/advertising-home.controller';
import { CategoryService } from './services/category.service';
import { AdvertisingHomeService } from './services/advertising-home.service';
import { UserController } from './controllers/user.controller';
import { UserService } from './services/user.service';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  controllers: [
    CategoryController,
    AdvertisingHomeController,
    UserController,
    AuthController,
  ],
  providers: [
    CategoryService,
    AdvertisingHomeService,
    UserService,
    AuthService,
    TokenService,
    JwtService,
  ],
})
export class BaseModule {}
