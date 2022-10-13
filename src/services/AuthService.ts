import axios, { customFetch } from "../utils/http-common";
const LOGIN_API_URL = "api/v1/login/access-token";
const FORGETPASS_API_URL = "api/v1/forgot-password";
const LOGOUT_API_URL = "api/v1/logout";
const REGISTER_API_URL = "api/v1/users/register";
const RESET_PASS_API_URL = "api/v1/reset-password";

const loginService = (data: any) => {
  return axios.post(LOGIN_API_URL, data);
};

const logoutService = (data: any) => {
  return customFetch.post(LOGOUT_API_URL, data);
};

const registerService = (data: any) => {
  return axios.post(REGISTER_API_URL, data);
};
const passwordForgetService = (data: any) => {
  return axios.post(FORGETPASS_API_URL, data);
};
const passwordResetService = (data: any) => {
  return axios.put(RESET_PASS_API_URL, data);
};
const AuthService = {
  loginService,
  registerService,
  passwordForgetService,
  logoutService,
  passwordResetService,
};

export default AuthService;
