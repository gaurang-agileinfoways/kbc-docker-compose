import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const TypeExceptions = {
  ImageNotUploaded() {
    return new RpcException({
      message: 'Error while uploading image',
      error: 'ImageNotUploaded',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  },
};
