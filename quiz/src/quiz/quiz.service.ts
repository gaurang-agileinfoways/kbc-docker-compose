import { Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CustomError, TypeExceptions } from 'src/common/exceptions';
import { Questions, Quiz } from './schema/quiz.schema';
import mongoose, { Model } from 'mongoose';
import { QuestionStatus, Status } from 'src/common/enums/quiz.enum';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import {
  GET_BY_ID,
  GET_RANDOM_QUESTION,
  GET_SELECTED_USER_BY_ID,
  GET_SINGLE_QUESTION,
} from 'src/common/constants/success-response.constant';
import { WsException } from '@nestjs/websockets';
import { endOfDay, startOfDay } from 'date-fns';
import { randomInt } from 'crypto';

@Injectable()
export class QuizService {
  constructor(
    @InjectModel(Quiz.name) private readonly quizModel: Model<Quiz>,
    @Inject('QUESTION_SERVICE') private readonly queClient: ClientProxy,
    @Inject('USER_SERVICE') private readonly userClient: ClientProxy,
  ) {}

  async startQuiz(userId: number) {
    try {
      const dbuser = await this.verifyUser(userId);

      if (!dbuser) {
        throw new WsException('user not found');
      }

      const validate = await this.quizModel.findOne({
        userId: dbuser.id,
        status: Status.ACTIVE,
      });

      if (validate) {
        throw TypeExceptions.OnlyOneQuizCanStart();
      }

      const data: Quiz = {
        userId: userId,
        status: Status.ACTIVE,
        winAmount: 0,
        questions: [],
        currentLevel: 0,
      };
      return await this.quizModel.create(data);
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async generateQuestion(user: any) {
    try {
      const dbuser = await this.verifyUser(user.id);

      if (!dbuser) {
        throw new WsException('User not found.');
      }

      const validate = await this.quizModel.findOne({
        userId: dbuser.id,
        status: Status.ACTIVE,
      });

      if (!validate) {
        throw new WsException('No any active quiz found.');
      }

      const questions = validate.questions.map((que) => que.questionId);

      const resp = await firstValueFrom(
        this.queClient.send(GET_RANDOM_QUESTION, { questions }),
      );

      return {
        _id: resp.data._id,
        question: resp.data.question,
        options: resp.data.options,
        time: 60,
      };
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async checkAnswer(body: any, user: any) {
    try {
      if (typeof body === 'string') body = JSON.parse(body);

      const dbuser = await this.verifyUser(user.id);
      if (!dbuser) {
        throw new WsException('user not found');
      }

      const data = await this.quizModel.findOne({
        userId: dbuser.id,
        status: Status.ACTIVE,
      });

      if (!data) {
        throw new WsException('No any active quiz found.');
      }

      const resp = await firstValueFrom(
        this.queClient.send(GET_SINGLE_QUESTION, { _id: body.question }),
      );

      const queData: Questions = {
        questionId: new mongoose.Types.ObjectId(resp.data._id as string),
        questionStatus:
          resp.data.answer === body.answer.trim()
            ? QuestionStatus.CORRECT
            : QuestionStatus.WRONG,
      };
      const storeData = {
        currentLevel: data.currentLevel + 1,
        $push: { questions: queData },
      };

      if (storeData.currentLevel === 4) {
        storeData['winAmount'] = 1000;
      } else if (storeData.currentLevel === 7) {
        storeData['winAmount'] = 1000000;
      } else if (storeData.currentLevel >= 8) {
        storeData['winAmount'] = data.winAmount * 10;
      }

      if (
        queData.questionStatus === QuestionStatus.WRONG ||
        storeData.currentLevel >= 10
      ) {
        storeData['status'] = Status.COMPLETED;
      }

      const quizData = await this.quizModel.findOneAndUpdate(
        {
          _id: data._id,
          userId: dbuser.id,
          status: Status.ACTIVE,
        },
        storeData,
      );

      return {
        currentLevel: quizData.currentLevel + 1,
        winAmount: quizData.winAmount,
        answer: resp.data.answer,
        isCorrect: resp.data.answer === body.answer.trim(),
      };
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async updateQuizStatus(body: any) {
    try {
      await this.quizModel.findOneAndUpdate(
        {
          userId: body.data.user.id,
          status: Status.ACTIVE,
        },
        {
          status: Status.TIME_OUT,
        },
      );
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async verifyUser(id: number) {
    try {
      const resp = await firstValueFrom(this.userClient.send(GET_BY_ID, id));

      if (!resp) {
        throw new WsException('User not found.');
      }

      return resp.data;
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async getRankedUser() {
    try {
      const todayStart = startOfDay(new Date());
      const todayEnd = endOfDay(new Date());

      const pipeline = [];
      pipeline.push({
        $match: {
          createdAt: { $gte: todayStart, $lt: todayEnd },
          status: Status.COMPLETED,
        },
      });

      pipeline.push({
        $addFields: {
          timeGap: {
            $subtract: ['$updatedAt', '$createdAt'],
          },
        },
      });

      pipeline.push({
        $sort: {
          timeGap: 1,
          winAmount: -1,
        },
      });

      pipeline.push({
        $sort: {
          currentLevel: -1,
        },
      });

      pipeline.push({
        $limit: 10,
      });

      const users = await this.quizModel.aggregate(pipeline);

      const id = users.map((u) => u.userId);
      const resp = await firstValueFrom(
        this.userClient.send(GET_SELECTED_USER_BY_ID, { id }),
      );

      const data = [];
      users.forEach((user) => {
        data.push({
          name: resp.data.find((usr) => usr.id === user.userId).firstName,
          winAmount: user.winAmount,
          currentLevel: user.currentLevel,
          timeGap: user.timeGap,
        });
      });
      return data;
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async myQuiz(
    body: {
      page: number;
      limit: number;
      search: string;
      skip: number;
    },
    user: any,
  ) {
    try {
      const limit = body.limit ? Number(body.limit) : 10;
      const page = body.page ? Number(body.page) : 1;
      const skip = (page - 1) * limit;

      const query = [];

      query.push({
        $match: {
          userId: user.id,
        },
      });

      query.push({
        $sort: {
          createdAt: -1,
        },
      });

      query.push({
        $facet: {
          data: [{ $skip: skip }, { $limit: limit }],
          total_records: [{ $count: 'count' }],
        },
      });

      const data = await this.quizModel.aggregate(query);
      if (data.length) {
        data[0].total_records =
          data[0].total_records.length > 0 ? data[0].total_records[0].count : 0;
      }
      return data[0];
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async quitQuiz(user: any) {
    try {
      const dbuser = await this.verifyUser(user.id);
      if (!dbuser) {
        throw new WsException('user not found');
      }

      const data = await this.quizModel.findOne({
        userId: dbuser.id,
        status: Status.ACTIVE,
      });

      if (!data) {
        throw new WsException('No any active quiz found.');
      }

      const quizData = await this.quizModel.findOneAndUpdate(
        {
          _id: data._id,
          userId: dbuser.id,
          status: Status.ACTIVE,
        },
        {
          status: Status.COMPLETED,
        },
      );

      return {
        currentLevel: quizData.currentLevel + 1,
        winAmount: quizData.winAmount,
      };
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async lifeline(user: any, body: any) {
    try {
      const dbuser = await this.verifyUser(user.id);
      if (!dbuser) {
        throw new WsException('user not found');
      }

      const resp = await firstValueFrom(
        this.queClient.send(GET_SINGLE_QUESTION, { _id: body.questionId }),
      );

      const int = randomInt(0, 3);

      const answer: string[] = [];
      if (body.lifeline === 'askToAi') {
        answer.push(resp.data.options[int]);
      }

      if (body.lifeline === '50-50') {
        const index = int + 1 >= 4 ? int - 1 : int + 1;
        resp.data.options[int] !== resp.data.answer
          ? answer.push(resp.data.options[int])
          : answer.push(resp.data.options[index]);
        answer.push(resp.data.answer);
      }

      return { answer, lifeline: body.lifeline };
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async leaderboard(body: {
    page: number;
    limit: number;
    search: string;
    skip: number;
  }) {
    try {
      const limit = body.limit ? Number(body.limit) : 10;
      const page = body.page ? Number(body.page) : 1;
      const skip = (page - 1) * limit;

      const pipeline = [];

      pipeline.push({
        $addFields: {
          timeGap: {
            $subtract: ['$updatedAt', '$createdAt'],
          },
        },
      });

      pipeline.push({
        $sort: {
          timeGap: 1,
          updatedAt: -1,
          winAmount: -1,
        },
      });

      pipeline.push({
        $sort: {
          currentLevel: -1,
        },
      });

      pipeline.push({
        $facet: {
          quiz: [{ $skip: skip }, { $limit: limit }],
          total_records: [{ $count: 'count' }],
        },
      });

      const data = await this.quizModel.aggregate(pipeline);

      const id = data[0].quiz.map((u) => u.userId);
      const resp = await firstValueFrom(
        this.userClient.send(GET_SELECTED_USER_BY_ID, { id }),
      );

      const response = {
        data: [],
        total_records: data[0]?.total_records[0]?.count || 0,
      };
      data[0].quiz.forEach((user) => {
        response.data.push({
          name: resp.data.find((usr) => usr.id === user.userId).firstName,
          winAmount: user.winAmount,
          currentLevel: user.currentLevel,
          timeGap: user.timeGap,
          status: user.status,
        });
      });
      return response;
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }
}
