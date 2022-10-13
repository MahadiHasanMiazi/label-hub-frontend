import AuthService from "../../services/AuthService";
import {
  addUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserFromLocalStorage,
} from "./../../utils/localStorage";

import { IRegistration } from "./authTypes";
// Register user
const register = async (userData: IRegistration) => {
  const response = await AuthService.registerService(userData);
  return response.data;
};

// Login user

const login = async (userData: any) => {
  const formData = new FormData();
  formData.append("username", userData.username);
  formData.append("password", userData.password);
  const response = await AuthService.loginService(formData);

  if (response.data) {
    addUserToLocalStorage(response.data);
  }

  return response.data;
};

// Logout user
const logout = async () => {
  const userData = getUserFromLocalStorage();
  const userToken = {
    access_token: userData.access_token,
    refresh_token: userData.refresh_token,
  };
  const response = await AuthService.logoutService(userToken);

  if (response.status === 200) {
    removeUserFromLocalStorage();
  }

  return response.data;
};
// Forget password
const passwordForgot = async (data: any) => {
  const response = await AuthService.passwordForgetService(data);
  return response.data;
};
// Reset password
const passwordReset = async (data: any) => {
  const response = await AuthService.passwordResetService(data);
  return response.data;
};

const authService = {
  register,
  logout,
  login,
  passwordForgot,
  passwordReset,
};

export default authService;
