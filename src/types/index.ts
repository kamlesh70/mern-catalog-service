export interface AuthCookie {
  accessToken: string;
  refreshToken: string;
}

export interface UserFromRequest extends Request {
  auth: {
    sub: string;
    role: string;
    id?: string;
  };
}
