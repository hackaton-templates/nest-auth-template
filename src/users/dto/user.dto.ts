import { OmitType } from '@nestjs/mapped-types';
import { IsNumberString, IsString } from 'class-validator';

export default class UserDto {
  @IsNumberString()
  id: number;

  @IsString()
  name: string;

  @IsString()
  password: string;

  @IsString()
  email: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}
