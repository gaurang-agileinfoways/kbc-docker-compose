import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { RolesGuard } from 'src/auth/guards/role.guards';
import { Role } from 'src/common/constants/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { CommonListDto } from 'src/common/dto/common.dto';
import { CustomError } from 'src/common/helpers/exceptions';
import {
  ADD_QUESTION,
  GET_ALL_QUESTION,
} from 'src/common/serverPetterns/question-server.pettern';
import { AddQustionDto } from './dto/create-question.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('question')
export class QuestionController {
  constructor(
    @Inject('QUESTION_SERVICE') private readonly queClient: ClientProxy,
  ) {}

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('get-all')
  async getAllQustion(@Body() body: CommonListDto) {
    try {
      return await firstValueFrom(this.queClient.send(GET_ALL_QUESTION, body));
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }

  @ApiBearerAuth()
  @UseGuards(RolesGuard)
  @Roles(Role.ADMIN)
  @Post('add-question')
  async addQustion(@Body() body: AddQustionDto) {
    try {
      return await firstValueFrom(this.queClient.send(ADD_QUESTION, body));
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }
}
