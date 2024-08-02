import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Request } from 'express';
import { AuthExceptions } from 'src/common/helpers/exceptions';
import * as jwt from 'jsonwebtoken';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { GET_BY_ID } from '../serverPetterns/user-server.pettern';

@Injectable()
export class AppMiddleware implements NestMiddleware {
  constructor(
    @Inject('AUTH_SERVICE') private client: ClientProxy,
    private configService: ConfigService,
  ) {}
  async use(req: Request, res: Response, next: NextFunction) {
    if (
      req.headers.authorization &&
      req.headers.authorization.split(' ')[0] === 'Bearer'
    ) {
      const secretKey = this.configService.get('auth.secret');
      const accessToken = req.headers.authorization.split(' ')[1];
      try {
        const jwtData: any = jwt.verify(accessToken, secretKey);
        const findUser = await firstValueFrom(
          this.client.send(GET_BY_ID, jwtData.id),
        );
        this.verifyUser(findUser);
        req['user'] = jwtData;
        next();
      } catch (error) {
        switch (error?.name) {
          case 'TokenExpiredError':
            throw AuthExceptions.TokenExpired();
          case 'JsonWebTokenError':
            throw AuthExceptions.InvalidToken();
          default:
            throw AuthExceptions.ForbiddenException();
        }
      }
    } else {
      next();
    }
  }

  verifyUser(findUser) {
    if (!findUser) {
      throw AuthExceptions.ForbiddenException();
    }

    if (findUser && !findUser.isActive) {
      throw AuthExceptions.AccountNotActive();
    }

    if (findUser && !findUser.isVerified) {
      throw AuthExceptions.AccountNotVerified();
    }
  }
}
