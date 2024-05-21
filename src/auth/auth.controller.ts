import {
  Body,
  Controller,
  HttpCode,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignInDto from './dto/sign-in';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
}
