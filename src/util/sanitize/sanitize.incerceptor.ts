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
    const classSanitizeValues = this.toArray(
      this.reflector.get(Sanitize, context.getClass()),
    );
    const handlerSanitizeValues = this.toArray(
      this.reflector.get(Sanitize, context.getHandler()),
    );

    const sanitizeValues = [...classSanitizeValues, ...handlerSanitizeValues];
    return next.handle().pipe(tap((data) => sanitize(data, sanitizeValues)));
  }

  private toArray(s: string | string[] | undefined) {
    if (!s) return [];
    if (Array.isArray(s)) return s;
    return [s];
  }
}
