import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import UsersService from './users.service';

@Controller('users')
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
}
