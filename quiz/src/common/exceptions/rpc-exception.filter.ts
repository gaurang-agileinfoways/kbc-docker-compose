import { Catch, RpcExceptionFilter, HttpException } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Catch(RpcException, HttpException)
export class GlobalExceptionFilter implements RpcExceptionFilter<RpcException> {
  catch(exception: any): Observable<any> {
    return throwError(() => exception.error);
  }
}
