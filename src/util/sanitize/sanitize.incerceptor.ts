import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { tap } from 'rxjs';
import { sanitize } from '.';

export const Sanitize = Reflector.createDecorator<string | string[]>();

@Injectable()
export class SanitizerInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<any>) {
    const sanitizeValues =
      this.reflector.get(Sanitize, context.getHandler()) || [];
    return next.handle().pipe(tap((data) => sanitize(data, sanitizeValues)));
  }
}
