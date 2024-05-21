export type JwtToken = {
  sub: number;
  jti: string;
  type: TokenType;
  iat: number;
  exp: number;
};

export type TokenType = 'access' | 'refresh';
