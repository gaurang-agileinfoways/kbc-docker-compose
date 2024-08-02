import { Module } from '@nestjs/common';
import { QuestionController } from './question.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'QUESTION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: `${process.env.REDIS_HOST}`,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  controllers: [QuestionController],
})
export class QuestionModule {}
