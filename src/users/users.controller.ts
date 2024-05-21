import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import UsersService from './users.service';
import {
  Sanitize,
  SanitizerInterceptor,
} from 'src/util/sanitize/sanitize.incerceptor';
import { CreateUserDto } from './dto/user.dto';

@Controller('users')
@UseInterceptors(SanitizerInterceptor)
@Sanitize('password')
export default class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.service.find(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  async create(@Body() createUserDto: CreateUserDto) {
    return this.service.create(createUserDto);
  }
}
