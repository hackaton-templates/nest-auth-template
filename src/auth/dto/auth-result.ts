import { ApiProperty } from '@nestjs/swagger';

export class TokenDto {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsImp0aSI6ImFiODJlZmRmLTI3MmMtNDUxMS1hZDQ2LTU0YmYyYjBiMDdiNiIsInR5cGUiOiJhY2Nlc3MiLCJpYXQiOjE3MTYzMTg3ODcsImV4cCI6MTcxNjMyMjM4N30.Ga53V-05Mh39KtAz2HSFE56K0YimBGeOoSmAmU3_H5A',
  })
  token: string;

  @ApiProperty({ example: 1716318809 })
  expires: number;
}

export default class AuthResultDto {
  @ApiProperty({ example: 1 })
  user_id: number;

  @ApiProperty()
  access_token: TokenDto;

  @ApiProperty()
  refresh_token: TokenDto;
}
