import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const AuthExceptions = {
  TokenExpired(): any {
    return new RpcException({
      message: 'Token Expired use RefreshToken',
      error: 'TokenExpiredError',
      statusCode: HttpStatus.FORBIDDEN,
    });
  },

  InvalidToken(): any {
    return new RpcException({
      message: 'Invalid Token',
      error: 'InvalidToken',
      statusCode: HttpStatus.FORBIDDEN,
    });
  },

  ForbiddenException(): any {
    return new RpcException({
      message: 'This resource is forbidden from this user',
      error: 'UnAuthorizedResourceError',
      statusCode: HttpStatus.FORBIDDEN,
    });
  },

  InvalidUserId(): any {
    return new RpcException({
      message: 'Invalid User Id',
      error: 'InvalidUserId',
      statusCode: HttpStatus.FORBIDDEN,
    });
  },

  InvalidIdPassword(): any {
    return new RpcException({
      message: 'Invalid Username or password',
      error: 'InvalidIdPassword',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  },

  AccountNotexist(): any {
    return new RpcException({
      message: 'Account does not exist!',
      error: 'AccountNotexist',
      statusCode: HttpStatus.FORBIDDEN,
    });
  },

  AccountNotActive(): any {
    return new RpcException({
      message: 'Account not active!',
      error: 'accountNotActive',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  },

  InvalidOldPassword(): any {
    return new RpcException({
      message: 'Invalid Old password!',
      error: 'InvalidOldPassword',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  },

  AccountNotVerified() {
    return new RpcException({
      message: 'Your account is not verified, Please verify',
      error: 'AccountNotVerified',
      statusCode: HttpStatus.UNAUTHORIZED,
    });
  },
};
