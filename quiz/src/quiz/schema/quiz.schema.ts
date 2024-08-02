import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { QuestionStatus, Status } from 'src/common/enums/quiz.enum';

export type QuizDocument = Quiz & Document;

@Schema({ collection: 'quiz', timestamps: true })
export class Quiz {
  @Prop({ required: true })
  userId: number;

  @Prop({ required: true, default: Status.IDEAL })
  status: Status;

  @Prop({ required: true, default: 0 })
  winAmount: number;

  @Prop({ required: true, default: 0 })
  currentLevel: number;

  @Prop({
    required: true,
    type: [
      {
        questionId: { type: mongoose.Types.ObjectId, ref: 'Question' },
        questionStatus: { type: String, enum: Object.values(QuestionStatus) },
      },
    ],
    default: [],
  })
  questions: Questions[];
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);

export interface Questions {
  questionId: mongoose.Types.ObjectId;
  questionStatus: QuestionStatus;
}
