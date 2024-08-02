import { HttpException, HttpStatus } from '@nestjs/common';

export const AuthExceptions = {
  TokenExpired(): any {
    return new HttpException(
      {
        message: 'Token Expired use RefreshToken',
        error: 'TokenExpiredError',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  InvalidToken(): any {
    return new HttpException(
      {
        message: 'Invalid Token',
        error: 'InvalidToken',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  ForbiddenException(): any {
    return new HttpException(
      {
        message: 'This resource is forbidden from this user',
        error: 'UnAuthorizedResourceError',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  InvalidUserId(): any {
    return new HttpException(
      {
        message: 'Invalid User Id',
        error: 'InvalidUserId',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  InvalidIdPassword(): any {
    return new HttpException(
      {
        message: 'Invalid Username or Password',
        error: 'InvalidIdPassword',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  AccountNotexist(): any {
    return new HttpException(
      {
        message: 'Account does not exist!',
        error: 'accountNotexist',
        statusCode: HttpStatus.FORBIDDEN,
      },
      HttpStatus.FORBIDDEN,
    );
  },

  AccountNotActive(): any {
    return new HttpException(
      {
        message: 'Account not active!',
        error: 'accountNotActive',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  InvalidOldPassword(): any {
    return new HttpException(
      {
        message: 'Invalid Old password!',
        error: 'InvalidOldPassword',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },

  AccountNotVerified() {
    return new HttpException(
      {
        message: 'Your account is not verified, Please verify',
        error: 'AccountNotVerified',
        statusCode: HttpStatus.UNAUTHORIZED,
      },
      HttpStatus.UNAUTHORIZED,
    );
  },
};
