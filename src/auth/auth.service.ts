import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthResultDto from './dto/auth-result';
import UsersService from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from 'src/users/dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signIn(email: string, password: string): Promise<any> {
    const user = await this._getUserAndCheckPassword(email, password);
    return await this._auth(user);
  }

  private async _getUserAndCheckPassword(email: string, password: string) {
    let user: UserDto;
    try {
      user = this.userService.findByName(email);
    } catch (e) {
      throw new UnauthorizedException();
    }

    const passwordsSame = await bcrypt.compare(password, user.password);
    if (!passwordsSame) {
      throw new UnauthorizedException();
    }
    return user;
  }

  private async _auth(user: UserDto): Promise<AuthResultDto> {
    const accessToken = this._generateAccessTokenFor(user);
    const accessTokenExpires =
      +this.configService.get<number>('JWT_ACCESS_EXPIRES');

    return {
      user_id: user.id,
      access_token: {
        token: accessToken,
        expires: accessTokenExpires,
      },
      refresh_token: {
        token: '',
        expires: 0,
      },
    };
  }

  private _generateAccessTokenFor(user: UserDto): string {
    return this.jwtService.sign({ sub: user.id, jti: uuidv4() });
  }
}
