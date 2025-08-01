import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, map, Observable, throwError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class RpcInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      map((data) => {
        const resp = {
          status: 'success',
          data,
        };
        console.log(resp);

        return resp;
      }),
      catchError((err) => {
        const resp = {
          status: 'error',
          error: err,
        };
        console.log(resp);

        return throwError(() => new RpcException(err));
      }),
    );
  }
}
