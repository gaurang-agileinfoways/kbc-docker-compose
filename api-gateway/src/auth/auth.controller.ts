import { Body, Controller, Inject, Post, UseGuards } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Public } from './auth.decorator';
import { firstValueFrom } from 'rxjs';
import {
  GET_ALL_USER,
  USER_LOGIN,
  USER_SIGNUP,
} from 'src/common/serverPetterns/user-server.pettern';
import { CommonListDto, LoginDto } from 'src/common/dto/common.dto';
import { CustomError } from 'src/common/helpers/exceptions';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/common/interfaces/jwt.interface';
import { RolesGuard } from './guards/role.guards';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/constants/role.enum';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private readonly jwtService: JwtService,
  ) {}

  @Public()
  @Post('signup')
  async signup(@Body() body: CreateUserDto) {
    try {
      return await firstValueFrom(this.client.send(USER_SIGNUP, body));
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }

  @Public()
  @Post('login')
  async login(@Body() body: LoginDto) {
    try {
      const data = await firstValueFrom(this.client.send(USER_LOGIN, body));
      const token = this.generateAuthToken(data.data);
      data.data.accessToken = token;
      return data;
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
  @Post('get-all')
  async getAll(@Body() body: CommonListDto) {
    try {
      return await firstValueFrom(this.client.send(GET_ALL_USER, body));
    } catch (error) {
      if (error) {
        throw error;
      } else {
        throw CustomError.UnknownError('something went wrong!!');
      }
    }
  }

  generateAuthToken(user: any) {
    const payload: JwtPayload = {
      id: user.id,
      role: user.role,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }
}
