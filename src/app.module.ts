import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { BaseModule } from './modules/base/base.module';
import { OperationalModule } from './modules/operational/operational.module';

@Module({
  imports: [CoreModule, BaseModule, OperationalModule],
})
export class AppModule {}
