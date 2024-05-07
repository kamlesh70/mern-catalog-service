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

export interface fileData {
  fileName: string;
  fileData: ArrayBuffer;
}

export interface fileStorage {
  uploadFile(fileData: fileData): Promise<any>;
}
