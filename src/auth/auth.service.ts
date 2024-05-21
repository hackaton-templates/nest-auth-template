import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthResultDto from './dto/auth-result';
import UsersService from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}
}
