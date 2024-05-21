export default class AuthResultDto {
  user_id: number;
  access_token: TokenDto;
  refresh_token: TokenDto;
}

export class TokenDto {
  token: string;
  expires: number;
}
