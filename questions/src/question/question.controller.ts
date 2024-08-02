import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { QuestionService } from './question.service';
import {
  ADD_QUESTION,
  GET_ALL_QUESTION,
  GET_RANDOM_QUESTION,
  GET_SINGLE_QUESTION,
} from 'src/common/constants/message-pattern.constant';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import { QUESTION_ADDED } from 'src/common/constants/success-response.constant';

@Controller()
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @ResponseMessage(QUESTION_ADDED)
  @MessagePattern(ADD_QUESTION)
  async create(@Payload() body: any) {
    return await this.questionService.create(body);
  }

  @MessagePattern(GET_RANDOM_QUESTION)
  async getRendomQuestion(@Payload() body: any) {
    return await this.questionService.getRendomQuestion(body);
  }

  @MessagePattern(GET_ALL_QUESTION)
  findAll(@Payload() body: any) {
    return this.questionService.findAll(body);
  }

  @MessagePattern(GET_SINGLE_QUESTION)
  findOne(@Payload() body: any) {
    return this.questionService.findOne(body._id);
  }
}
