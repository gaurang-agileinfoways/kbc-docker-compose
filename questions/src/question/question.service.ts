import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Question } from './entities/question.schema';
import mongoose, { Model } from 'mongoose';
import { CustomError } from 'src/common/exceptions';

@Injectable()
export class QuestionService {
  constructor(
    @InjectModel(Question.name) private readonly questionModel: Model<Question>,
  ) {}

  async create(body) {
    try {
      const data = await this.questionModel.create(body);
      return {
        question: data.question,
        options: data.options,
        answer: data.answer,
      };
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async getRendomQuestion(questions: any) {
    try {
      const query = [];

      if (questions?.questions?.length) {
        query.push({
          $match: {
            _id: {
              $nin: questions.questions.map(
                (id: string) => new mongoose.Types.ObjectId(id),
              ),
            },
          },
        });
      }

      query.push(
        {
          $sample: { size: 1 },
        },
        {
          $limit: 1,
        },
      );

      const data = await this.questionModel.aggregate(query);
      return data.length > 0 ? data[0] : [];
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async findOne(body: string) {
    try {
      return await this.questionModel.findOne({
        _id: new mongoose.Types.ObjectId(body),
      });
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }

  async findAll(body: any) {
    try {
      const limit = body.limit ? Number(body.limit) : 10;
      const page = body.page ? Number(body.page) : 1;
      const skip = (page - 1) * limit;
      const { search, sortOrder, sortBy } = body;

      const query = [];

      if (search) {
        query.push({
          $match: {
            $or: [
              { question: { $regex: search, $options: 'i' } },
              { answer: { $regex: search, $options: 'i' } },
              {
                option: {
                  $elemMatch: {
                    $regex: search,
                    $options: 'i',
                  },
                },
              },
            ],
          },
        });
      }

      const sortStage = {};
      sortStage[sortBy?.trim() || 'createdAt'] =
        sortOrder?.trim() === 'asc' ? 1 : -1;
      query.push({ $sort: sortStage });

      query.push({
        $project: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0,
        },
      });

      query.push({
        $facet: {
          questions: [{ $skip: skip }, { $limit: limit }],
          total_records: [{ $count: 'count' }],
        },
      });
      const resp = await this.questionModel.aggregate(query);
      if (resp) {
        resp[0].total_records =
          resp[0].total_records.length > 0 ? resp[0].total_records[0].count : 0;
      }
      return resp[0];
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError(error?.message);
      }
    }
  }
}
