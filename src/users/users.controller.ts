import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseInterceptors,
} from '@nestjs/common';
import UsersService from './users.service';
import {
  Sanitize,
  SanitizerInterceptor,
} from 'src/util/sanitize/sanitize.incerceptor';

@Controller('users')
export default class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  @UseInterceptors(SanitizerInterceptor)
  @Sanitize('password')
  async findAll() {
    return await this.service.findAll();
  }

  @Get(':id')
  @UseInterceptors(SanitizerInterceptor)
  @Sanitize('password')
  async find(@Param('id', ParseIntPipe) id: number) {
    return await this.service.find(id);
  }
}
