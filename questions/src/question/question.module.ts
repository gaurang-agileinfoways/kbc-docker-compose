import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Question, QuestionSchema } from './entities/question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Question.name, schema: QuestionSchema },
    ]),
  ],
  controllers: [QuestionController],
  providers: [QuestionService],
})
export class QuestionModule {}
