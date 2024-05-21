import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsNumberString, IsString } from 'class-validator';

export default class UserDto {
  @IsNumberString()
  @ApiProperty({ example: 1 })
  id: number;

  @IsString()
  @ApiProperty({ example: 'StarPanda' })
  name: string;

  @IsString()
  password: string;

  @IsString()
  @ApiProperty({ example: 'user@example.com' })
  email: string;
}

export class CreateUserDto extends OmitType(UserDto, ['id']) {
  @ApiProperty({ example: '123123' })
  password: string;
}
