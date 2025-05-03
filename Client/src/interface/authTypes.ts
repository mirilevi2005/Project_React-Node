// בתוך: src/interface/authTypes.ts
// export interface userInfo {
//   userName: string;
//   roles: string;
// }

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
  _id: string;
  userName: string;
  email: string;
  roles: string;
}

export interface AuthResponse {
  accessToken: string;
  user: userInfo;
}
