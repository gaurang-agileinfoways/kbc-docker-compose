import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { QuizModule } from './quiz/quiz.module';
import DatabaseConfiguration from './common/config/database.config';
import { DatabaseModule } from './providers/database/database.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { GlobalExceptionFilter } from './common/exceptions/rpc-exception.filter';
import { TransformInterceptor } from './common/interceptor/transform.interceptor';
import { GatewayModule } from './gateway/gateway.module';
import { WebsocketExceptionsFilter } from './common/exceptions/ws-exception.filter';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [DatabaseConfiguration],
      ignoreEnvFile: false,
      isGlobal: true,
    }),
    QuizModule,
    DatabaseModule,
    GatewayModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
    {
      provide: APP_FILTER,
      useClass: WebsocketExceptionsFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
  ],
})
export class AppModule {}
