

export interface SignInRequest {
  email: string;
  password: string;
}

export interface SignUpRequest {
  userName: string;
  email: string;
  password: string;
  adminCode?: string;
}

export interface userInfo {
  token: string;
  userName: string;
  email: string;
  roles: string;
  _id:string;
}
export interface AuthResponse {
  accessToken: string;
  newUser: userInfo;
  // previousLogin:any
  previousLogin:SignInRequest
}




