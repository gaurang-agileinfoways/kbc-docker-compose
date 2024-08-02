import { Module } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { QuizController } from './quiz.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Quiz, QuizSchema } from './schema/quiz.schema';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    ClientsModule.register([
      {
        name: 'QUESTION_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: `${process.env.REDIS_HOST}`,
          port: Number(process.env.REDIS_PORT),
        },
      },
      {
        name: 'USER_SERVICE',
        transport: Transport.REDIS,
        options: {
          host: `${process.env.REDIS_HOST}`,
          port: Number(process.env.REDIS_PORT),
        },
      },
    ]),
  ],
  controllers: [QuizController],
  providers: [QuizService],
  exports: [QuizService],
})
export class QuizModule {}
