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

export interface menuResultModel {
  key: string;
  icon: any;
  label: string;
  children?: menuResultModel[];
}