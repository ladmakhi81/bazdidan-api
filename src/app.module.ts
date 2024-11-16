import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { CategoryModule } from './category/category.module';
import { AdvertisingHomeModule } from './advertising-home/advertising-home.module';
import { ClientRequestModule } from './client-request/client-request.module';
import { PrismaModule } from './shared/prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { TokenModule } from './shared/token/token.module';

@Module({
  imports: [
    AuthModule,
    UserModule,
    CategoryModule,
    AdvertisingHomeModule,
    ClientRequestModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TokenModule,
  ],
})
export class AppModule {}
