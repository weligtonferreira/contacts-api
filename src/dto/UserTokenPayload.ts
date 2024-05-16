export interface UserTokenPayload {
  userId: string;
  email: string;
  iat: number;
  exp: number | string;
}
