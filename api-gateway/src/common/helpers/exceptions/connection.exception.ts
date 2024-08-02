import { HttpException, HttpStatus } from '@nestjs/common';

export const ConnectionExceptions = {
  connectionException(): any {
    return new HttpException(
      {
        message: 'Microservice Communcation error',
        error: 'ConnectionError',
        statusCode: HttpStatus.BAD_GATEWAY,
      },
      HttpStatus.BAD_GATEWAY,
    );
  },
};
