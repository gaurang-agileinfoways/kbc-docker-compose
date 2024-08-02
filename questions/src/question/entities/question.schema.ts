import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'questions', timestamps: true })
export class Question {
  @Prop({ required: true })
  question: string;

  @Prop({ type: [String], required: true })
  options: [string];

  @Prop({ required: true })
  answer: string;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
