import { Reflector } from '@nestjs/core';
import { TokenType } from './types/jwt';

export const Token = Reflector.createDecorator<TokenType>();
