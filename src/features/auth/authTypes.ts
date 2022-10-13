export interface IinitialState {
  user?: any;
  isError?: boolean;
  isSuccess?: boolean;
  isLoading?: boolean;
  isRegistered?: boolean;
  isPassChanged?: boolean;
  message?: any;
}
export interface ILogin {
  username?: string;
  password?: string;
}
export interface IRegistration {
  full_name: string;
  email: string;
  phone_number?: string;
  dob?: string;
  gender?: string;
  password: string;
}
export interface IForgotPass {
  email: string;
}
export interface ICngPassData {
  reset_token: string;
  new_password: string;
  confirm_password: string;
}
