import UserService from "../../services/UserService";
import { IUpdateData, IPassData } from "./userTypes";

const logedInUser = async () => {
  const response = await UserService.logedInUserService();

  return response.data;
};
const updatelogedInUser = async (userData: IUpdateData) => {
  const response = await UserService.updateCurrentUserService(userData);

  return response.data;
};
const changeUserPassword = async (userPass: IPassData, userId: number) => {
  
  const response = await UserService.changeUserPasswordService(
    userPass,
    userId
  );
  return response.data;
};

const userService = {
  logedInUser,
  updatelogedInUser,
  changeUserPassword,
};

export default userService;
