import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: `${process.env.REDIS_HOST}`,
      port: Number(process.env.REDIS_PORT),
    },
  });

  //Enable API Params ValidationPipe for all endpoint.
  app.useGlobalPipes(new ValidationPipe());
  await app.listen();
}
bootstrap();
