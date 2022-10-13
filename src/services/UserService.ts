import { customFetch } from "../utils/http-common";
const LOGEDING_USER_API_URL = "api/v1/users/me";

const logedInUserService = () => {
  return customFetch.get(LOGEDING_USER_API_URL);
};
const updateCurrentUserService = (data: any) => {
  return customFetch.put(LOGEDING_USER_API_URL, data);
};
const changeUserPasswordService = (data: any, userID: number) => {
  return customFetch.put(`/api/v1/users/${userID}/change-password`, data);
};

const UserService = {
  logedInUserService,
  updateCurrentUserService,
  changeUserPasswordService,
};

export default UserService;
