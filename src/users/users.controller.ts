import { Controller, Get, Param } from '@nestjs/common';
import UsersService from './users.service';

@Controller('users')
export default class UsersController {
  constructor(private service: UsersService) {}

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  find(@Param('id') id: number) {
    return this.service.find(id);
  }
}
