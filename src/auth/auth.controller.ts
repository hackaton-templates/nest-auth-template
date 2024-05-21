import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignInDto from './dto/sign-in';
import { AuthGuard } from './auth.guard';
import { Token } from './auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @UsePipes(ValidationPipe)
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  async me(@Req() request: Request) {
    return this.authService.me(request.user.sub);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  @Token('refresh')
  async refresh(@Req() request: Request) {
    return this.authService.refresh(request.user.sub);
  }
}
