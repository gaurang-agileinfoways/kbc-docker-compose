import { Module } from '@nestjs/common';
import { QuestionModule } from './question/question.module';
import { DatabaseModule } from './providers/database/database.module';
import { ConfigModule } from '@nestjs/config';
import DatabaseConfiguration from './common/config/database.config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { GlobalExceptionFilter } from './common/exceptions/rpc-exception.filter';
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfiguration],
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    QuestionModule,
    DatabaseModule,
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
