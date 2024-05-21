import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { Token } from './auth.decorator';
import { ConfigService } from '@nestjs/config';
import { JwtToken } from './types/jwt';

declare global {
  interface Request {
    user?: JwtToken;
  }
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }

    const type = this.reflector.get(Token, context.getHandler()) || 'access';
    const configKey = `JWT_${type.toUpperCase()}`;
    const secret = this.configService.get<string>(`${configKey}_SECRET`);

    const jwtPayload = await this.validateJwt(token, secret);
    request['user'] = jwtPayload;

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async validateJwt(token: string, secret: string) {
    try {
      return await this.jwtService.verifyAsync(token, { secret });
    } catch {
      throw new UnauthorizedException();
    }
  }
}
