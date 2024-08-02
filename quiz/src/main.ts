import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.REDIS,
    options: {
      host: `${process.env.REDIS_HOST}`,
      port: Number(process.env.REDIS_PORT),
    },
  });
  await app.listen();
}
bootstrap();
