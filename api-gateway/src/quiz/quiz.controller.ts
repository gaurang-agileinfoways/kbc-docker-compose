import { Body, Controller, Inject, Post, Req } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { firstValueFrom } from 'rxjs';
import { Public } from 'src/auth/auth.decorator';
import { CommonListDto } from 'src/common/dto/common.dto';
import { CustomError } from 'src/common/helpers/exceptions';
import {
  GET_RANKED_USER,
  LEADERBOARD,
  MY_QUIZ,
  START_QUIZ,
} from 'src/common/serverPetterns/quiz-server.pettern';

@ApiTags('Quiz')
@Controller()
export class QuizController {
  constructor(
    @Inject('QUIZ_SERVICE') private readonly quizClient: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @Post('start-quiz')
  async startQuiz(@Req() request) {
    try {
      return await firstValueFrom(
        this.quizClient.send(START_QUIZ, request.user),
      );
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }

  @Public()
  @Post('get-ranked-user')
  async getRankedUser() {
    try {
      return this.quizClient.send(GET_RANKED_USER, {});
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }

  @ApiBearerAuth()
  @Post('my-quiz')
  async myQuiz(@Body() body: CommonListDto, @Req() request) {
    try {
      return await firstValueFrom(
        this.quizClient.send(MY_QUIZ, { body, user: request.user }),
      );
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }

  @Public()
  @Post('leaderboard')
  async leaderboard(@Body() body: CommonListDto) {
    try {
      return await firstValueFrom(this.quizClient.send(LEADERBOARD, body));
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }
}
