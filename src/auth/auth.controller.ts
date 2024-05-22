import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import SignInDto from './dto/sign-in';
import { AuthGuard } from './auth.guard';
import { Token } from './auth.decorator';
import {
  Sanitize,
  SanitizerInterceptor,
} from 'src/util/sanitize/sanitize.incerceptor';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import AuthResultDto from './dto/auth-result';
import { ErrorDto } from 'src/util/dto/error.dto';
import UserDto from 'src/users/dto/user.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  @HttpCode(200)
  @ApiOperation({ summary: 'Авторизация на сайте' })
  @ApiResponse({ type: AuthResultDto, status: 200 })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
  })
  async signIn(@Body() signInDto: SignInDto) {
    return await this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Get('me')
  @UseGuards(AuthGuard)
  @UseInterceptors(SanitizerInterceptor)
  @Sanitize('password')
  @ApiBearerAuth('Access Token')
  @ApiOperation({ summary: 'Профиль авторизованного пользователя' })
  @ApiResponse({ type: UserDto, status: 200 })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
  })
  async me(@Req() request: Request) {
    return this.authService.me(request.user.sub);
  }

  @Post('refresh')
  @UseGuards(AuthGuard)
  @Token('refresh')
  @ApiBearerAuth('Refresh Token')
  @ApiOperation({ summary: 'Обновление токена' })
  @ApiResponse({ type: AuthResultDto, status: 200 })
  @ApiUnauthorizedResponse({
    type: ErrorDto,
  })
  async refresh(@Req() request: Request) {
    return this.authService.refresh(request.user.sub);
  }
}
