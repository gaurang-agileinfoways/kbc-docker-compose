import { Body, Controller } from '@nestjs/common';
import { UsersService } from './users.service';
import { ResponseMessage } from 'src/common/decorators/response.decorator';
import {
  RESPONSE_SUCCESS,
  USER_LISTED,
  USER_LOGIN,
  USER_SIGNUP,
} from 'src/common/constants/response.constant';
import { MessagePattern } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import {
  GET_ALL_USER,
  GET_BY_ID,
  GET_SELECTED_USER_BY_ID,
  LOGIN,
  SIGNUP,
} from 'src/common/constants/message-pattern.constant';
import { CommonListDto, LoginDto } from 'src/common/dto/common.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ResponseMessage(USER_LISTED)
  @MessagePattern(GET_ALL_USER)
  async getAllUsers(@Body() body: CommonListDto) {
    return await this.usersService.getAllUsers(body);
  }

  @ResponseMessage(USER_LOGIN)
  @MessagePattern(LOGIN)
  async login(@Body() params: LoginDto): Promise<any> {
    return await this.usersService.login(params);
  }

  @ResponseMessage(USER_SIGNUP)
  @MessagePattern(SIGNUP)
  async signup(@Body() params: CreateUserDto) {
    return await this.usersService.create(params);
  }

  @ResponseMessage(RESPONSE_SUCCESS)
  @MessagePattern(GET_SELECTED_USER_BY_ID)
  async getSelectedUsers(@Body() body: any) {
    return await this.usersService.getSelectedUsers(body.id);
  }

  @ResponseMessage(RESPONSE_SUCCESS)
  @MessagePattern(GET_BY_ID)
  async getUserById(@Body() body: any) {
    return await this.usersService.getUserById(+body);
  }
}
