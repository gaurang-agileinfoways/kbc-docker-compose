import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export const TypeExceptions = {
  UserNotFound(): any {
    return new RpcException({
      message: 'User not found',
      error: 'Not Found',
      statusCode: HttpStatus.NOT_FOUND,
    });
  },

  UserAlreadyExists(): any {
    return new RpcException({
      message: 'User already exists',
      error: 'UserAlreadyExists',
      statusCode: HttpStatus.CONFLICT,
    });
  },

  InvalidFile(): any {
    return new RpcException({
      message: 'Uploaded file is invalid',
      error: 'InvalidFile',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  },

  InvalidResetToken() {
    return new RpcException({
      message: 'Reset password token is invalid',
      error: 'InvalidResetPasswordToken',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  },

  SamePassword() {
    return new RpcException({
      message: 'Given password is same as old password',
      error: 'SamePassword',
      statusCode: HttpStatus.CONFLICT,
    });
  },

  HistoryNotFound() {
    return new RpcException({
      message: 'History not found',
      error: 'HistoryNotFound',
      statusCode: HttpStatus.NOT_FOUND,
    });
  },

  CustomerIdNotFound() {
    return new RpcException({
      message: 'Customer id not found',
      error: 'CustomerIdNotFound',
      statusCode: HttpStatus.NOT_FOUND,
    });
  },

  SubscriptionAlreadyExist() {
    return new RpcException({
      message: 'Subscription already purchased',
      error: 'SubscriptionAlreadyExist',
      statusCode: HttpStatus.NOT_ACCEPTABLE,
    });
  },

  SubscriptionNotFound() {
    return new RpcException({
      message: 'Subscription not found',
      error: 'SubscriptionNotFound',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  },

  InvalidEmail() {
    return new RpcException({
      message: 'Invalid email',
      error: 'InvalidEmail',
      statusCode: HttpStatus.BAD_REQUEST,
    });
  },

  PaymentPending() {
    return new RpcException({
      message: 'For this resource payment is required',
      error: 'PaymentPending',
      statusCode: HttpStatus.PAYMENT_REQUIRED,
    });
  },

  ImageNotUploaded() {
    return new RpcException({
      message: 'Error while uploading image',
      error: 'ImageNotUploaded',
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    });
  },
};
