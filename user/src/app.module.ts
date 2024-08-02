import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfiguration from './config/database.config';
import { DatabaseModule } from './providers/database/database.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { GlobalExceptionFilter } from './common/exceptions/rpc-exception.filter';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot({
      load: [DatabaseConfiguration],
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
