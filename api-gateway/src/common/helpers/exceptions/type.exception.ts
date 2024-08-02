import { HttpException, HttpStatus } from '@nestjs/common';

export const TypeExceptions = {
  UserNotFound(): any {
    return new HttpException(
      {
        message: 'User not found',
        error: 'Not Found',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  },

  UserAlreadyExists(): any {
    return new HttpException(
      {
        message: 'User already exists',
        error: 'UserAlreadyExists',
        statusCode: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT,
    );
  },

  InvalidFile(): any {
    return new HttpException(
      {
        message: 'Uploaded file is invalid',
        error: 'InvalidFile',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },

  InvalidResetToken() {
    return new HttpException(
      {
        message: 'Reset password token is invalid',
        error: 'InvalidResetPasswordToken',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },

  SamePassword() {
    return new HttpException(
      {
        message: 'Given password is same as old password',
        error: 'SamePassword',
        statusCode: HttpStatus.CONFLICT,
      },
      HttpStatus.CONFLICT,
    );
  },

  HistoryNotFound() {
    return new HttpException(
      {
        message: 'History not found',
        error: 'HistoryNotFound',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  },

  CustomerIdNotFound() {
    return new HttpException(
      {
        message: 'Customer id not found',
        error: 'CustomerIdNotFound',
        statusCode: HttpStatus.NOT_FOUND,
      },
      HttpStatus.NOT_FOUND,
    );
  },

  SubscriptionAlreadyExist() {
    return new HttpException(
      {
        message: 'Subscription already purchased',
        error: 'SubscriptionAlreadyExist',
        statusCode: HttpStatus.NOT_ACCEPTABLE,
      },
      HttpStatus.NOT_ACCEPTABLE,
    );
  },

  SubscriptionNotFound() {
    return new HttpException(
      {
        message: 'Subscription not found',
        error: 'SubscriptionNotFound',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },

  InvalidEmail() {
    return new HttpException(
      {
        message: 'Invalid email',
        error: 'InvalidEmail',
        statusCode: HttpStatus.BAD_REQUEST,
      },
      HttpStatus.BAD_REQUEST,
    );
  },

  PaymentPending() {
    return new HttpException(
      {
        message: 'For this resource payment is required',
        error: 'PaymentPending',
        statusCode: HttpStatus.PAYMENT_REQUIRED,
      },
      HttpStatus.PAYMENT_REQUIRED,
    );
  },

  ImageNotUploaded() {
    return new HttpException(
      {
        message: 'Error while uploading image',
        error: 'ImageNotUploaded',
        statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  },
};
