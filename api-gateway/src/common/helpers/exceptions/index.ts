import { HttpException, HttpStatus } from '@nestjs/common';

export * from './auth.exception';
export * from './type.exception';
export * from './connection.exception';

export const CustomError = {
  UnknownError(message): any {
    return new HttpException(
      {
        message: message || 'Something went wrong, please try again later!',
        error: 'UnknownError',
        statusCode: HttpStatus.BAD_GATEWAY,
      },
      HttpStatus.BAD_GATEWAY,
    );
  },
};
