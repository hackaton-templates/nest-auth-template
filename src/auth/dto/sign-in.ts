import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export default class SignInDto {
  @IsString()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsString()
  @ApiProperty({ example: '123123' })
  password: string;
}
