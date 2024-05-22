import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
} from '@nestjs/common';
import UsersService from './users.service';
import {
  Sanitize,
  SanitizerInterceptor,
} from 'src/util/sanitize/sanitize.incerceptor';
import UserDto, { CreateUserDto } from './dto/user.dto';
import {
  ApiConflictResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ErrorDto } from 'src/util/dto/error.dto';

@Controller('users')
@ApiTags('users')
@UseInterceptors(SanitizerInterceptor)
@Sanitize('password')
export default class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Список всех пользователей' })
  @ApiResponse({ type: UserDto, status: 200, isArray: true })
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Получить пользователя' })
  @ApiParam({ name: 'id', type: Number, description: 'ID пользователя' })
  @ApiResponse({ type: UserDto, status: 200 })
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.service.find(id);
  }

  @Post()
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiConflictResponse({
    type: ErrorDto,
    description: 'Электронный адрес не уникален',
  })
  @ApiResponse({ type: UserDto, status: 201 })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }
}
