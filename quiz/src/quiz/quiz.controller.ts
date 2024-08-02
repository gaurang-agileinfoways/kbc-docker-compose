import { Controller } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import {
  GET_RANKED_USER,
  LEADERBOARD,
  MY_QUIZ,
  START_QUIZ,
} from 'src/common/constants/message-pattern.constant';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import {
  QUIZ_STARTED,
  RESPONSE_SUCCESS,
} from 'src/common/constants/success-response.constant';

@Controller('quiz')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @MessagePattern(START_QUIZ)
  @ResponseMessage(QUIZ_STARTED)
  async startQuiz(body) {
    return await this.quizService.startQuiz(body.id);
  }

  @MessagePattern(GET_RANKED_USER)
  @ResponseMessage(RESPONSE_SUCCESS)
  async getRankedUser() {
    return await this.quizService.getRankedUser();
  }

  @MessagePattern(MY_QUIZ)
  @ResponseMessage(RESPONSE_SUCCESS)
  async myQuiz(@Payload() body) {
    return await this.quizService.myQuiz(body.body, body.user);
  }

  @MessagePattern(LEADERBOARD)
  @ResponseMessage(RESPONSE_SUCCESS)
  async leaderboard(@Payload() body) {
    return await this.quizService.leaderboard(body);
  }
}
