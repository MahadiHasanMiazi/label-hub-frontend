export interface IformData {
  username: string;
  password: string;
}
export interface IError {
  username?: string;
  password?: string;
  email?: string;
}
export interface IInput {
  label: string;
  type: string;
  placeholder: string;
  value?: string;
  name: string;
}
