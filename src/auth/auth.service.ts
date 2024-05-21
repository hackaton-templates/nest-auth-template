import { Injectable, UnauthorizedException } from '@nestjs/common';
import AuthResultDto from './dto/auth-result';
import UsersService from 'src/users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import UserDto from 'src/users/dto/user.dto';
import { ConfigService } from '@nestjs/config';
import { v4 as uuidv4 } from 'uuid';
import { TokenType } from './types/jwt';

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

  async me(user_id: number) {
    return this.userService.find(user_id);
  }

  async refresh(user_id: number) {
    const user = this.userService.find(user_id);
    return this._auth(user);
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
    const accessToken = this._generateTokenFor(user, 'access');
    const refreshToken = this._generateTokenFor(user, 'refresh');
    return {
      user_id: user.id,
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }

  private _generateTokenFor(user: UserDto, type: TokenType) {
    const configKey = `JWT_${type.toUpperCase()}`;
    const secret = this.configService.get<string>(`${configKey}_SECRET`);
    const expiresIn = +this.configService.get<number>(`${configKey}_EXPIRES`);

    const token = this.jwtService.sign(
      { sub: user.id, jti: uuidv4(), type },
      { secret, expiresIn },
    );
    return { token, expires: expiresIn };
  }
}
