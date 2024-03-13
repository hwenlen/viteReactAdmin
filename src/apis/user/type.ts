export interface LoginParams {
  username: string;
  password: string;
}

export interface LoginResultModel {
  userName: string,
  roleName: string,
  userId: number,
  token: string
}