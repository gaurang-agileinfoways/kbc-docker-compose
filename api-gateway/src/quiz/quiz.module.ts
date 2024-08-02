import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { QuizController } from './quiz.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUIZ_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: `${process.env.REDIS_HOST}`,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  controllers: [QuizController],
})
export class QuizModule {}
