export interface BaseResponse {
  message: string;
}

export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName?: string;
  email: string;
}
